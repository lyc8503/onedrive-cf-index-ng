import axios from 'redaxios'
import CryptoJS from 'crypto-js'

import apiConfig from '../../config/api.config'

// Just a disguise to obfuscate required tokens (including but not limited to client secret,
// access tokens, and refresh tokens), used along with the following two functions
// Leave this for compatibility with the old version
const AES_SECRET_KEY = 'onedrive-vercel-index'

export function revealObfuscatedToken(obfuscated: string): string {
  // Decrypt SHA256 obfuscated token
  const decrypted = CryptoJS.AES.decrypt(obfuscated, AES_SECRET_KEY)
  return decrypted.toString(CryptoJS.enc.Utf8)
}

export function hasClientCertificateAuth(): boolean {
  return apiConfig.oauthClientCertificate.trim() !== ''
}

function normalizePem(pem: string): string {
  return pem.replace(/\\n/g, '\n').trim()
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function stringToBase64Url(value: string): string {
  return bytesToBase64Url(new TextEncoder().encode(value))
}

function base64ToBytes(value: string): Uint8Array {
  const normalized = value.replace(/\s+/g, '')
  const binary = atob(normalized)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export async function buildClientAssertionJwt(tokenEndpoint: string): Promise<string> {
  const certificatePem = normalizePem(apiConfig.oauthClientCertificate)
  const privateKeyMatch = certificatePem.match(
    /-----BEGIN (?:EC|RSA )?PRIVATE KEY-----[\s\S]+?-----END (?:EC|RSA )?PRIVATE KEY-----/
  )
  const certMatch = certificatePem.match(
    /-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/
  )

  if (!privateKeyMatch || !certMatch) {
    throw new Error('OAUTH_CLIENT_CERTIFICATE must include both private key and certificate in PEM format.')
  }

  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    base64ToBytes(privateKeyMatch[0].replace(/-----[^-]+-----/g, '')),
    { name: 'ECDSA', namedCurve: 'P-384' },
    false,
    ['sign']
  )

  const certDer = base64ToBytes(certMatch[0].replace(/-----[^-]+-----/g, ''))
  const certSha1 = await crypto.subtle.digest('SHA-1', certDer)
  const certSha256 = await crypto.subtle.digest('SHA-256', certDer)
  const header = {
    alg: 'ES384',
    typ: 'JWT',
    x5t: bytesToBase64Url(new Uint8Array(certSha1)),
    'x5t#S256': bytesToBase64Url(new Uint8Array(certSha256)),
  }

  const now = Math.floor(Date.now() / 1000)
  const payload = {
    aud: tokenEndpoint,
    iss: apiConfig.clientId,
    sub: apiConfig.clientId,
    jti: crypto.randomUUID(),
    nbf: now - 10,
    iat: now,
    exp: now + 600,
  }

  const encodedHeader = stringToBase64Url(JSON.stringify(header))
  const encodedPayload = stringToBase64Url(JSON.stringify(payload))
  const signingInput = `${encodedHeader}.${encodedPayload}`
  const signature = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-384' },
    privateKey,
    new TextEncoder().encode(signingInput)
  )
  return `${signingInput}.${bytesToBase64Url(new Uint8Array(signature))}`
}

export async function appendOAuthClientAuthentication(
  params: URLSearchParams,
  tokenEndpoint: string
): Promise<void> {
  if (hasClientCertificateAuth()) {
    const assertion = await buildClientAssertionJwt(tokenEndpoint)
    params.append(
      'client_assertion_type',
      'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
    )
    params.append('client_assertion', assertion)
    return
  }

  const clientSecret = revealObfuscatedToken(apiConfig.obfuscatedClientSecret)
  params.append('client_secret', clientSecret)
}

// Generate the Microsoft OAuth 2.0 authorization URL, used for requesting the authorisation code
export function generateAuthorisationUrl(): string {
  const { clientId, redirectUri, authApi, scope } = apiConfig
  const authUrl = authApi.replace('/token', '/authorize')

  // Construct URL parameters for OAuth2
  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('redirect_uri', redirectUri)
  params.append('response_type', 'code')
  params.append('scope', scope)
  params.append('response_mode', 'query')

  return `${authUrl}?${params.toString()}`
}

// The code returned from the Microsoft OAuth 2.0 authorization URL is a request URL with hostname
// http://localhost and URL parameter code. This function extracts the code from the request URL
export function extractAuthCodeFromRedirected(url: string): string {
  // Return empty string if the url is not the defined redirect uri
  if (!url.startsWith(apiConfig.redirectUri)) {
    return ''
  }

  // New URL search parameter
  const params = new URLSearchParams(url.split('?')[1])
  return params.get('code') ?? ''
}

// After a successful authorisation, the code returned from the Microsoft OAuth 2.0 authorization URL
// will be used to request an access token. This function requests the access token with the authorisation code
// and returns the access token and refresh token on success.
export async function requestTokenWithAuthCode(
  code: string
): Promise<
  | { expiryTime: string; accessToken: string; refreshToken: string }
  | { error: string; errorDescription: string; errorUri: string }
> {
  const { clientId, redirectUri, authApi } = apiConfig
  // Construct URL parameters for OAuth2
  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('redirect_uri', redirectUri)
  params.append('code', code)
  params.append('grant_type', 'authorization_code')
  await appendOAuthClientAuthentication(params, authApi)

  // Request access token
  return axios
    .post(authApi, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(resp => {
      const { expires_in, access_token, refresh_token } = resp.data
      return { expiryTime: expires_in, accessToken: access_token, refreshToken: refresh_token }
    })
    .catch(err => {
      const { error, error_description, error_uri } = err.response.data
      return { error, errorDescription: error_description, errorUri: error_uri }
    })
}

// Verify the identity of the user with the access token and compare it with the userPrincipalName
// in the Microsoft Graph API. If the userPrincipalName matches, proceed with token storing.
export async function getAuthPersonInfo(accessToken: string) {
  const profileApi = apiConfig.driveApi.replace('/drive', '')
  return axios.get(profileApi, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export async function sendTokenToServer(accessToken: string, refreshToken: string, expiryTime: string) {
  return await axios.post(
    '/api',
    {
      accessToken: accessToken,
      accessTokenExpiry: parseInt(expiryTime),
      refreshToken: refreshToken,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
