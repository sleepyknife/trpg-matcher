import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getSheetData } from '../utils/sheets'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const data = await getSheetData()
    res.status(200).json(data)
  } catch (err: any) {
    console.error('[❌ Google Sheet 讀取失敗]', err)
    res.status(500).json({ error: 'Failed to fetch sheet' })
  }
}

