<template>
  <div class="card">
    <div class="card-title">
      <span>{{ type === 'gm' ? '🎲 主持人' : '🙋 玩家' }}</span>
      <strong>{{ data[1] || '（未提供暱稱）' }}</strong>
    </div>

    <div class="card-content">
      <template v-if="type === 'gm'">
        📞 聯絡方式：{{ data[3] }}<br />
        🎮 開團系統：{{ data[5] }}<br />
        🕒 團務長度：{{ data[6] }}<br />
        📍 收費狀態：{{ data[7] }}<br />
        🧭 開團方式：{{ data[8] }}<br />
        👥 開團地點：{{ data[9] }}<br />
        🎭 補充說明：{{ data[10] }}
      </template>
      <template v-else>
        📞 聯絡方式：{{ data[3] }}<br />
        🎮 想跑系統：{{ data[12] }}<br />
        🕒 內容偏好：{{ data[13] }}<br />
        🎭 跑團方式：{{ data[14] }}<br />
        🧝 可以的時間：{{ data[15] }}<br />
        🧑‍🏫 玩家補充：{{ data[16] }}
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
	defineProps<{ data: string[]; type: 'gm' | 'player' }>()
</script>

<style scoped>
.card {
  background: #ffffff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-4px);
}
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}
.card-content {
  font-size: 0.95rem;
  color: #444;
  line-height: 1.5;
}
</style>
