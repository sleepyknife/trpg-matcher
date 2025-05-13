const SHEET_ID = process.env.SHEET_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
const SHEET_NAME = 'Reponse';

export async function getSheetData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_NAME)}?key=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Google Sheets API 錯誤：${res.status}`);
  }

  const data = await res.json();
  return data;
}
