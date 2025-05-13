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
		<card-futuristic
			v-for="item, i in list"
			:key="i"
			v-on-click-outside="() => item.selected = false"
			v-bind="item"
			class="font-orbitron"
			@click="item.selected = true"
		  >
			<div class="flex flex-col">
			  <div
				v-if="item.title"
				:class="item.titleClass"
			  >
				{{ item.title }}
			  </div>

			  <div
				v-if="item.text"
				:class="item.textClass"
			  >
				{{ item.text }}
			  </div>
			</div>
		  </card-futuristic>
	</div>
	<hr/>

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
import { map, pipe } from 'remeda'
import CardFuturistic from './card-futuristic.vue'

type CardProp = Writable<ExtractComponentProps<typeof CardFuturistic>> & {
  title?: string;
  titleClass?: string;
  text?: string;
  textClass?: string;
}

const list = ref(pipe(
  [
    {
      title: 'COD-00',
      titleClass: 'text-xl font-bold',
      text: 'FUTURISTIC CARD',
      bg: { type: 'halftone' },
      border: {
        type: 'specific',
        selectedColor: '#FFF',
        strokeWidth: 1,
        side: {
          t: {},
          l: {},
          b: {},
          r: {},
        },
      },
      animeSequence: {
        visible: {
          border: { duration: 400 },
        },
      },
    },
    {
      title: 'CARD-01',
      titleClass: 'text-xl font-bold',
      text: 'QUOTE CORNER',
      corner: { type: 'quote' },
      content: {
        type: 'scale',
        class: 'p-4',
      },
      bg: { type: 'halftone' },
      border: null,
      animeSequence: {
        visible: {
          content: { delay: 200 },
          bg: { delay: 400 },
        },
      },
    },
    {
      title: 'CARD-02',
      titleClass: 'text-xl font-bold ',
      text: 'SIDE BORDER CLIP',
      textClass: '',
      corner: null,
      content: {
        type: 'clip',
        class: 'p-4',
      },
      bg: {
        type: 'typical',
        margin: '0',
      },
      border: { type: 'side' },
      animeSequence: {
        normal: {
          border: { delay: 0 },
        },
        visible: {
          border: { delay: 0 },
          bg: { delay: 200 },
          content: { delay: 300 },
        },
        hidden: {
          border: { delay: 300 },
          bg: { delay: 0 },
          content: { delay: 0 },
        },
      },
    },
    {
      title: 'CARD-03',
      titleClass: 'text-xl font-bold text-white',
      text: 'SOLID BACKGROUND',
      textClass: 'text-white',
      corner: null,
      bg: {
        type: 'solid',
        selectedColor: '#444',
      },
      content: {
        type: 'typical',
        class: 'p-4 pl-6',
      },
      border: { type: 'specific' },
      animeSequence: {
        visible: {
          border: { delay: 400 },
        },
      },
    },
    {
      title: 'ERROR',
      titleClass: 'text-2xl font-bold text-[#ba2507] ',
      text: 'FISH OVERWEIGHT',
      textClass: 'text-[#ba2507]',
      corner: null,
      bg: {
        type: 'typical',
        margin: '4px 0px',
        color: '#ffe8e8',
      },
      content: {
        type: 'typical',
        class: 'py-4 px-8',
      },
      border: {
        type: 'specific',
        color: '#ba2507',
        selectedColor: '#f07860',
        strokeWidth: 2,
        side: {
          t: {},
          b: {},
        },
      },
      animeSequence: {
        normal: {
          border: { delay: 0 },
        },
        visible: {
          border: { delay: 0 },
          bg: { delay: 400 },
          content: { delay: 500 },
        },
        hidden: {
          border: { delay: 300 },
          bg: { delay: 0 },
          content: { delay: 0 },
        },
        // null 表示停用動畫
        selected: { content: null },
        hover: { content: null },
      },
    },
    {
      title: 'COD',
      corner: {
        type: 'square',
        size: 2,
      },
      bg: null,
      content: {
        type: 'typical',
        class: 'p-1 px-2',
      },
      border: {
        type: 'typical',
        color: '#BBB',
      },
      animeSequence: {
        visible: {
          corner: { delay: 0 },
          border: { delay: 400 },
          content: { delay: 500 },
        },
        hidden: {
          corner: { delay: 400 },
          border: { delay: 0 },
          content: { delay: 0 },
        },
      },
    },
  ] as CardProp[],
  map((data) => ({
    ...data,
    visible: false,
    selected: false,
  })),
))

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
