import { KVNamespace } from '@cloudflare/workers-types'

export async function getOdAuthTokens(): Promise<{ accessToken: unknown; refreshToken: unknown }> {
  const { ONEDRIVE_CF_INDEX_KV } = process.env as unknown as { ONEDRIVE_CF_INDEX_KV: KVNamespace }

  const accessToken = ONEDRIVE_CF_INDEX_KV.get('access_token')
  const refreshToken = ONEDRIVE_CF_INDEX_KV.get('refresh_token')

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
  const { ONEDRIVE_CF_INDEX_KV } = process.env as unknown as { ONEDRIVE_CF_INDEX_KV: KVNamespace }

  ONEDRIVE_CF_INDEX_KV.put('access_token', accessToken, { expirationTtl: accessTokenExpiry })
  ONEDRIVE_CF_INDEX_KV.put('refresh_token', refreshToken)
}
