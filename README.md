# 🎲 TRPG 大平台｜找玩家・找主持人

一個簡單的靜態網站，幫助 TRPG 玩家與主持人彼此媒合。  
使用 Google 表單登記，透過 GitHub Pages + Google Sheets API 公開顯示，方便快速找人配對開團！

> 🙌 完全開源、完全免費、不負責任（是真的不負責）

---

## 🚀 功能特色

- 登記表單（Google Form）
- 自動同步 Google 試算表資料
- 提供篩選分頁：全部 / 找玩家 / 找主持人
- 使用 Vercel API 安全轉接 Google Sheets，不暴露金鑰
- 開源、可 fork、自架！

---

## 📦 使用技術

- GitHub Pages + 靜態 HTML / JS
- Google 表單 + Google Sheets
- Vercel Serverless Functions (Node.js)
- Google Sheets API v4

---

## 🛠️ 如何架設自己的版本

1. **Fork 本倉庫**
2. 新增 `.env.local`（僅本地開發用，不要上傳），或在 Vercel 後台設：

- GOOGLE_API_KEY=你的Google API金鑰
- SHEET_ID=你的Spreadsheet ID

3. 修改 `index.html` 裡的 Google 表單連結
4. 部署到 GitHub Pages 或使用 Vercel + 自訂網域

---

## ⚠️ 免責聲明

本平台**僅供媒合使用**，任何配對後的聯繫、開團、糾紛、社交互動、金錢往來等皆由使用者自行負責。  
如發生任何爭議、睡死、斷團、戀愛糾葛、團內火拼等，本站及開發者概不負責。

請自行評估風險，謹慎交友，理性開團 🙏

---

## 📜 License

[MIT License](LICENSE)  
你可以自由使用、修改、部署，但請保留授權聲明與免責條款。
