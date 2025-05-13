<template>
  <div class="container">
    <h1>TRPG大平台</h1>

    <a
      class="button"
      href="https://docs.google.com/forms/d/e/1FAIpQLSdtOjtWEwbNllQvVoKw2_XJVZsAa3Eig6tGE-zsF4vuZSeFzQ/viewform"
      target="_blank"
    >
      ➕ 我要登記
    </a>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-button"
        :class="{ active: currentTab === tab.key }"
        @click="currentTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <hr />

    <div class="content">
      <p v-if="loading">資料載入中...</p>
      <div v-else>
        <div
          v-for="(entry, i) in filteredEntries"
          :key="i"
          class="entry"
        >
          <strong>{{ entry.name }}</strong>（{{ entry.role }}）<br />
          <p>{{ entry.desc }}</p>
          <small>{{ entry.time }}</small>
        </div>
        <p v-if="filteredEntries.length === 0">目前沒有符合條件的資料。</p>
      </div>
    </div>

    <hr />

    <div class="disclaimer">
      <strong>免責聲明：</strong><br />
      本平台僅提供 TRPG 玩家與主持人的媒合服務。<br />
      所有配對後的互動、聯繫、團務安排、金錢往來皆由使用者自行負責。<br />
      如有任何糾紛、失聯、暴雷、睡死、戀愛問題，請勿聯絡本站管理員，謝謝配合。
    </div>

    <div class="footer">
      🔗 本站為開源專案，原始碼公開於
      <a href="https://github.com/sleepyknife/trpg-matcher" target="_blank">
        GitHub Repository
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

type Entry = {
  name: string
  role: string
  desc: string
  time: string
}

const currentTab = ref('all')
const tabs = [
  { key: 'all', label: '全部' },
  { key: 'players', label: '找玩家' },
  { key: 'gms', label: '找主持人' },
]

const entries = ref<Entry[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('/api/fetch')
    const data = await res.json()
	console.log(data)
    const header = data.values[0]
    const idx = (name: string) => header.indexOf(name)

    entries.value = data.values.slice(1).map((row: string[]) => ({
      name: row[idx('名稱')] || '',
      role: row[idx('角色')] || '',
      desc: row[idx('介紹')] || '',
      time: row[idx('時間戳記')] || '',
    }))
  } catch (e) {
    console.error('❌ 載入資料失敗', e)
  } finally {
    loading.value = false
  }
})

const filteredEntries = computed(() => {
  if (currentTab.value === 'all') return entries.value
  if (currentTab.value === 'players')
    return entries.value.filter(e => e.role.toLowerCase().includes('pl'))
  if (currentTab.value === 'gms')
    return entries.value.filter(e => e.role.toLowerCase().includes('gm'))
  return []
})
</script>

<style scoped>
body {
  font-family: sans-serif;
  background: #f8f8f8;
  margin: 0;
}
.container {
  padding: 2rem;
  max-width: 800px;
  margin: auto;
}
h1 {
  text-align: center;
  color: #333;
}
.button {
  display: inline-block;
  margin: 0.5rem 0;
  padding: 0.6rem 1rem;
  background-color: #4a90e2;
  color: white;
  text-decoration: none;
  border-radius: 6px;
}
.tabs {
  margin-top: 1.5rem;
}
.tab-button {
  margin-right: 1rem;
  padding: 0.4rem 1rem;
  border: none;
  border-bottom: 3px solid transparent;
  background: none;
  cursor: pointer;
  font-weight: bold;
}
.tab-button.active {
  border-color: #4a90e2;
  color: #4a90e2;
}
.content {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.entry {
  margin-bottom: 1rem;
}
.disclaimer {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
}
.footer {
  margin-top: 2rem;
  font-size: 0.85rem;
  text-align: center;
  color: #999;
}
</style>
