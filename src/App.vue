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
			<template v-if="currentTab === 'all'">
		    <div
			  v-for="(entry, i) in gms"
			  :key="i"
			  class="entry"
			>
				暱稱：{{ entry[1] }}<br />
				聯絡方式：{{ entry[3] }}<br />
				🎮 開團系統：{{ entry[5] }}<br />
				🕒 團務長度：{{ entry[6] }}<br />
				📍 收費狀態：{{ entry[7] }}<br />
				🧭 開團方式：{{ entry[8] }}<br />
				👥 開團地點：{{ entry[9] }}<br />
				🎭 補充說明：{{ entry[10] }}
			</div>
			
			<div
			  v-for="(entry, i) in players"
			  :key="i"
			  class="entry"
			>
				暱稱：{{ entry[1] }}<br />
				聯絡方式：{{ entry[3] }}<br />
				🎮 想跑系統：{{ entry[12] }}<br />
				🕒 內容偏好：{{ entry[13] }}<br />
				🎭 跑團方式：{{ entry[14] }}<br />
				🧝 可以的時間：{{ entry[15] }}<br />
				🧑‍🏫 玩家補充：{{ entry[16] }}
			</div>
          </template>
          <template v-if="currentTab === 'gms'">
		    <div
			  v-for="(entry, i) in gms"
			  :key="i"
			  class="entry"
			>
				暱稱：{{ entry[1] }}<br />
				聯絡方式：{{ entry[3] }}<br />
				🎮 開團系統：{{ entry[5] }}<br />
				🕒 團務長度：{{ entry[6] }}<br />
				📍 收費狀態：{{ entry[7] }}<br />
				🧭 開團方式：{{ entry[8] }}<br />
				👥 開團地點：{{ entry[9] }}<br />
				🎭 補充說明：{{ entry[10] }}
			</div>
          </template>
          <template v-else>
			<div
			  v-for="(entry, i) in players"
			  :key="i"
			  class="entry"
			>
				暱稱：{{ entry[1] }}<br />
				聯絡方式：{{ entry[3] }}<br />
				🎮 想跑系統：{{ entry[12] }}<br />
				🕒 內容偏好：{{ entry[13] }}<br />
				🎭 跑團方式：{{ entry[14] }}<br />
				🧝 可以的時間：{{ entry[15] }}<br />
				🧑‍🏫 玩家補充：{{ entry[16] }}
			</div>
          </template>
        </div>
    </div>

    <hr />
	
	<div class="flex flex-wrap items-center justify-center gap-10">
      asdaaldhalskdj
	  adasd
    </div>


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

const currentTab = ref<'all' | 'gms' | 'players'>('gms')
const tabs: { key: 'gms' | 'players' | 'all' ; label: string }[] = [
	{ key: 'all', label: '顯示全部'},
	{ key: 'gms', label: '主持人' },
	{ key: 'players', label: '玩家' }
]

const gms = ref<any[]>([])
const players = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('/api/fetch')
    const data = await res.json()
	const values = data.values.slice(1)

    gms.value = values.filter((row: string[]) => row[4]?.includes('主持人'))
    players.value = values.filter((row: string[]) => row[4]?.includes('玩家'))
	console.log(gms)
	console.log(players)
  } catch (e) {
    console.error('❌ 載入資料失敗', e)
  } finally {
    loading.value = false
  }
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
