<script setup>
import PromoTicker from './PromoTicker.vue'

const props = defineProps({
  promoItems: { type: Array, default: () => ([
    { title: '邀约专享，消费有礼（9月）', date: '2025-08-27' },
    { title: '积分五倍赠（9月）', date: '2025-08-20' }
  ]) },
  serviceItems: { type: Array, default: () => ([
    { title: '关于发行2025年记账式国债（四期）公告', date: '2025-08-20' },
    { title: '系统维护通知', date: '2025-08-18' }
  ]) },
  rowHeight: { type: Number, default: 54 },
  interval: { type: Number, default: 3500 }
})
</script>

<template>
  <section class="promo-wrap">
    <div class="promo-row">
      <div class="col">
        <div class="label promo">优惠活动</div>
        <PromoTicker :items="promoItems" :rowHeight="rowHeight" :interval="interval" />
      </div>
      <div class="col">
        <div class="label service">服务公告</div>
        <PromoTicker :items="serviceItems" :rowHeight="rowHeight" :interval="interval" />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 紧贴上方，无背景 */
.promo-wrap { 
  margin-top: 0;
  padding-top: 0;
}
.promo-row { 
  max-width: 1200px; 
  margin: 0 auto; 
  display: flex;
  height: 54px;
  align-items: stretch; /* 改为stretch确保子元素填满 */
  position: relative;
  overflow: hidden; /* 在最外层也加上裁剪 */
}
.col { 
  flex: 1;
  display: flex; 
  align-items: center;
  height: 54px; /* 明确设置为54px而不是100% */
  background: #f5f5f5;
  overflow: hidden; /* 强制裁剪超出内容 */
  position: relative;
}
.col:first-child { margin-right: 1px; }
.label { 
  flex-shrink: 0;
  margin-right: 16px;
  margin-left: 20px; /* 左边距移到标签 */
  font-size: 16px;
  font-weight: 700; 
  color: #ff5a2f; 
  white-space: nowrap;
}
</style> 