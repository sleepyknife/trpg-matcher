document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', event => {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const tab = event.target.getAttribute('data-tab');
    switchTab(tab);
  });
});

function switchTab(tab) {
  const content = document.getElementById('content-area');
  // TODO: 這裡可以改成 fetch API 實際資料
  content.innerHTML = `<p>正在載入 <strong>${tab}</strong> 的資料...</p>`;
}
