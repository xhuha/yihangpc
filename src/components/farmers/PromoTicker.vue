<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  interval: { type: Number, default: 3000 },
  rowHeight: { type: Number, default: 54 }
})

const wrapRef = ref(null)
const idx = ref(0)
let timer = null

function start() {
  stop()
  timer = setInterval(() => {
    idx.value = (idx.value + 1) % Math.max(props.items.length, 1)
  }, props.interval)
}
function stop() { if (timer) { clearInterval(timer); timer = null } }

onMounted(start)
onBeforeUnmount(stop)
watch(() => props.items, () => { idx.value = 0; start() })
</script>

<template>
  <div class="ticker" :style="{ height: rowHeight + 'px' }" ref="wrapRef" @mouseenter="stop" @mouseleave="start">
    <div class="track" :style="{ transform: `translateY(-${idx * rowHeight}px)` }">
      <div v-for="(it, i) in items" :key="i" class="row" :title="it.title">
        <span class="title">{{ it.title }}</span>
        <span class="date">{{ it.date }}</span>
      </div>
      <!-- 克隆第一条以实现无缝回滚 -->
      <div v-if="items.length" class="row clone" :title="items[0].title">
        <span class="title">{{ items[0].title }}</span>
        <span class="date">{{ items[0].date }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticker { 
  overflow: hidden; 
  position: relative;
  box-sizing: border-box;
  /* 强制裁剪所有超出内容 */
  clip-path: inset(0);
  height: v-bind('props.rowHeight + "px"'); /* 明确设置高度 */
  max-height: v-bind('props.rowHeight + "px"'); /* 最大高度限制 */
}
.track { 
  transition: transform .5s ease;
  position: relative;
  /* 移除height和overflow限制，让内容自然展开 */
}
.row { 
  display: flex; 
  justify-content: space-between;
  align-items: center;
  height: v-bind('props.rowHeight + "px"');
  background: #f5f5f5;
  box-sizing: border-box;
  margin: 0;
  border: 0;
  /* 移除之前的padding调整 */
  position: relative;
  top: 0;
  left: 0;
}
.title { 
  flex: 1;
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis; 
  color: #333;
  font-size: 14px;
  line-height: 54px;
  padding-left: 8px;
  padding-right: 24px;
  max-width: 230px; /* 限制最大宽度，超出显示省略号 */
  margin: 0;
}
.date { 
  color: #999;
  font-size: 12px; 
  line-height: 54px;
  flex-shrink: 0;
  padding-right: 8px;
  margin: 0;
}
.row:hover { background: #eeeeee; }
</style> 