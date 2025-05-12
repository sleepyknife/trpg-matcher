import { getSheetData } from '../utils/sheets.js';

export default async function handler(req, res) {
  try {
    const data = await getSheetData();
	
	console.log('[✅ 成功讀取 Google Sheet 資料]');
    console.log(JSON.stringify(data, null, 2));  // 👈 這裡印出來

	
    res.status(200).json(data);
  } catch (err) {
	console.log("Fail");
    res.status(500).json({ error: 'Failed to fetch sheet' });
  }
}
