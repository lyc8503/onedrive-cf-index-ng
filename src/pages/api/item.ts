import axios from 'redaxios'

import { getAccessToken } from '.'
import apiConfig from '../../../config/api.config'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export default async function handler(req: NextRequest): Promise<Response> {
  // Get access token from storage
  const accessToken = await getAccessToken()

  // Get item details (specifically, its path) by its unique ID in OneDrive
  const { id = '' } = Object.fromEntries(req.nextUrl.searchParams)

  // TODO: Set edge function caching for faster load times

  if (typeof id === 'string') {
    const idPattern = /^[a-zA-Z0-9]+$/
    if (!idPattern.test(id)) {
      // ID contains characters other than letters and numbers
      return new Response(JSON.stringify({ error: 'Invalid driveItem ID.' }), { status: 400 })
    }

    const itemApi = `${apiConfig.driveApi}/items/${id}`
    try {
      const { data } = await axios.get(itemApi, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          select: 'id,name,parentReference',
        },
      })
      return NextResponse.json(data)
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error?.response?.data ?? 'Internal server error.' }), { status: error?.response?.status ?? 500 })
    }
  } else {
    return new Response(JSON.stringify({ error: 'Invalid driveItem ID.' }), { status: 400 })
  }
}
