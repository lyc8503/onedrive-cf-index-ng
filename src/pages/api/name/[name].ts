import { default as rawFileHandler } from '../raw'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export default async function handler(req: NextRequest): Promise<Response> {
  return rawFileHandler(req)
}
