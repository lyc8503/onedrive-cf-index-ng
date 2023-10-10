import siteConfig from '../../config/site.config'

let tempAccessToken = ''
let tempRefreshToken = ''


export async function getOdAuthTokens(): Promise<{ accessToken: unknown; refreshToken: unknown }> {
  // const accessToken = await kv.get(`${siteConfig.kvPrefix}access_token`)
  // const refreshToken = await kv.get(`${siteConfig.kvPrefix}refresh_token`)

  const accessToken = tempAccessToken;
  const refreshToken = tempRefreshToken;

  console.log("Token: " + accessToken + " / " + refreshToken)

  return {
    accessToken,
    refreshToken,
  }
}

export async function storeOdAuthTokens({
  accessToken,
  accessTokenExpiry,
  refreshToken,
}: {
  accessToken: string
  accessTokenExpiry: number
  refreshToken: string
}): Promise<void> {

  tempAccessToken = accessToken;
  tempRefreshToken = refreshToken;
  // await kv.set(`${siteConfig.kvPrefix}access_token`, accessToken, 'EX', accessTokenExpiry)
  // await kv.set(`${siteConfig.kvPrefix}refresh_token`, refreshToken)
}
