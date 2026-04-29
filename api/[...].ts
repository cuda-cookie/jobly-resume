import { VercelRequest, VercelResponse } from '@vercel/node'

let serverHandler: any

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Load server handler on first request
    if (!serverHandler) {
      const module = await import('../dist/server/server.js')
      serverHandler = module.default || module.handler || module
    }

    // Convert Vercel Request/Response to Web standard Request/Response
    const url = new URL(req.url || '', `http://${req.headers.host}`)
    const webRequest = new Request(url, {
      method: req.method,
      headers: new Headers(req.headers as Record<string, string>),
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req : undefined
    })

    const response = await serverHandler(webRequest)

    // Set response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value)
    })

    // Set status code
    res.status(response.status)

    // Send response body
    const body = await response.text()
    res.send(body)
  } catch (error) {
    console.error('Server handler error:', error)
    res.status(500).json({ error: 'Internal Server Error', details: String(error) })
  }
}
