import type { IncomingMessage, ServerResponse } from 'http'
import { getSheetData } from '../utils/sheets'

export default async function handler(
	req: IncomingMessage,
	res: ServerResponse) {
  try {
	  if (req.method !== 'GET') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Method Not Allowed' }))
      return
    }

    const data = await getSheetData()
	
	
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))

  } catch (err: any) {
    console.error('[❌ Google Sheet 讀取失敗]', err)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Failed to fetch sheet', detail: error.message }))
  }
}

