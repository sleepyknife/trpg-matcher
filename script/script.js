let currentTab = 'all';
let currentMode = 'grid';
let allEntries = []; // ← 存放從 API 抓回來的資料

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/fetch');
    const data = await res.json();
    allEntries = parseData(data); // optional: 處理欄位名稱
	console.log(data);
    renderContent();
  } catch (err) {
    document.getElementById('content-area').innerHTML = '<p>❌ 無法載入資料</p>';
  }
});

document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTab = btn.dataset.tab;
    renderContent();
  });
});

document.querySelectorAll('.mode-button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMode = btn.dataset.mode;
    renderContent();
  });
});

function renderContent() {
  const content = document.getElementById('content-area');
  content.className = `content ${currentMode}`;

  const filtered = currentTab === 'all'
    ? allEntries
    : allEntries.filter(e => e.role.toLowerCase() === currentTab.toLowerCase());

  if (filtered.length === 0) {
    content.innerHTML = '<p>目前沒有符合條件的登記資料。</p>';
    return;
  }

  content.innerHTML = filtered.map(entry => {
    if (currentMode === 'grid') {
      return `<div class="item"><strong>${entry.name}</strong><br><em>${entry.role}</em><p>${entry.desc}</p></div>`;
    } else if (currentMode === 'list') {
      return `<div class="item"><strong>${entry.name}</strong> (${entry.role}) - ${entry.desc}</div>`;
    } else {
      return `<div class="item">[${entry.role}] ${entry.name}：${entry.desc}</div>`;
    }
  }).join('');
}

// 將 API 原始資料轉換為統一格式（依你的欄位調整）
function parseData(raw) {
  const rows = raw.values;
  const header = rows[0];
  const index = name => header.indexOf(name);
  return rows.slice(1).map(row => ({
    id: row[index('ID')] || '',
    role: row[index('角色')] || '',
    name: row[index('名稱')] || '',
    desc: row[index('介紹')] || '',
  }));
}
