import { VercelRequest, VercelResponse } from '@vercel/node'
import fs from 'fs'
import path from 'path'

let server: any

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Load server on first request
    if (!server) {
      const serverModule = await import('../dist/server/server.js')
      server = serverModule.default || serverModule
    }

    // Handle the request with server
    if (typeof server === 'function') {
      return server(req, res)
    }

    res.status(500).json({ error: 'Server not properly configured' })
  } catch (error) {
    console.error('Handler error:', error)
    res.status(500).json({ error: String(error) })
  }
}
