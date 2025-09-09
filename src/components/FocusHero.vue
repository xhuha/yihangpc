<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  bannerSrc: { type: String, default: '/hero.jpg' },
  items: {
    type: Array,
    default: () => ([
      { icon: 'fa-solid fa-user', label: '个人网银登录', bg: '#ffffff', color: '#333' },
      { icon: 'fa-solid fa-lock', label: '企业网银登录', bg: '#ffffff', color: '#333' },
      { icon: 'fa-solid fa-circle-nodes', label: '在线办理及费率', bg: '#ffa51e', color: '#fff' }
    ])
  }
})

const safeBanner = computed(() => props.bannerSrc || '/vite.svg')

// 性能优化相关变量
const isResizing = ref(false)
const resizeTimeout = ref(null)
const rafId = ref(null)

// 防抖函数
const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 节流函数
const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// 处理缩放事件的优化函数
const handleResize = () => {
  isResizing.value = true
  
  // 使用requestAnimationFrame优化渲染
  if (rafId.value) {
    cancelAnimationFrame(rafId.value)
  }
  
  rafId.value = requestAnimationFrame(() => {
    // 这里可以添加需要在缩放时执行的逻辑
    console.log('页面缩放中...', { width: window.innerWidth, height: window.innerHeight })
    
    // 延迟结束缩放状态
    clearTimeout(resizeTimeout.value)
    resizeTimeout.value = setTimeout(() => {
      isResizing.value = false
      console.log('页面缩放结束')
    }, 150)
  })
}

// 创建优化后的事件监听器
const debouncedResize = debounce(handleResize, 16) // 约60fps
const throttledResize = throttle(handleResize, 16) // 约60fps

onMounted(() => {
  // 使用passive监听器提高性能
  window.addEventListener('resize', throttledResize, { passive: true })
  window.addEventListener('orientationchange', debouncedResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', throttledResize)
  window.removeEventListener('orientationchange', debouncedResize)
  
  // 清理定时器和动画帧
  if (resizeTimeout.value) {
    clearTimeout(resizeTimeout.value)
  }
  if (rafId.value) {
    cancelAnimationFrame(rafId.value)
  }
})
</script>

<template>
  <section class="focus-hero" :class="{ 'is-resizing': isResizing }">
    <div class="hero">
      <img class="hero-img" :src="safeBanner" alt="banner" loading="lazy" />
      <!-- 使用1200px居中容器来控制panel位置 -->
      <div class="panel-container">
        <div class="panel" role="group" aria-label="登录入口">
          <a v-for="(it, idx) in items" :key="idx" class="row" :style="{ background: it.bg, color: it.color }" href="javascript:void(0)">
            <i :class="it.icon"></i>
            <span class="label">{{ it.label }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

/* 英雄区：全屏宽度背景，响应式高度 */
.hero {
  position: relative;
  max-width: 1600px;
  margin: 0 auto;
  /* 使用固定高度避免vh单位在缩放时的计算问题 */
  height: 350px; /* 固定高度，避免vh单位问题 */
  min-height: 300px; /* 最小高度保证可用性 */
  max-height: 400px; /* 最大高度避免过高 */
  border-radius: 0;
  overflow: hidden;
  /* 性能优化 */
  will-change: auto;
  contain: layout style paint;
}

/* 主图还原为不偏移，铺满容器 */
.hero-img { 
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
  display: block;
  /* 移除硬件加速避免缩放时的渲染问题 */
  /* transform: translateZ(0); 注释掉避免3D变换问题 */
  /* backface-visibility: hidden; 注释掉避免背面隐藏问题 */
  will-change: auto;
}

/* 1200px居中容器控制panel位置 */
.panel-container {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  /* 移除translateZ避免缩放时的3D变换问题 */
  width: 1200px;
  height: 100%;
  pointer-events: none; /* 允许点击穿透到背景 */
  /* 性能优化 */
  will-change: transform;
  contain: layout;
}

/* 叠加面板：相对于1200px容器定位 */
.panel {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 320px;
  background: rgba(255,255,255,.45);
  box-shadow: 0 8px 24px rgba(0,0,0,.08);
  border-radius: 0;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  pointer-events: auto; /* 恢复panel的点击事件 */
  /* 移除硬件加速避免缩放时的渲染问题 */
  /* transform: translateZ(0); 注释掉避免3D变换问题 */
  /* backface-visibility: hidden; 注释掉避免背面隐藏问题 */
  will-change: auto;
  /* contain: layout style; 注释掉避免过度隔离 */
  /* 保持基本的过渡效果，避免突然变化 */
}

/* 缩放时的性能优化 - 避免过度优化 */
.focus-hero.is-resizing .panel {
  will-change: auto; /* 改为auto避免过度优化 */
  /* 移除pointer-events避免内容消失 */
}

.focus-hero.is-resizing .hero-img {
  will-change: transform;
}

.row {
  display: flex;
  align-items: center;
  height: 66px;
  margin: 0 0 10px 0;
  border-radius: 6px;
  padding: 0 18px;
  font-size: 20px;
  text-decoration: none;
  transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
  /* 性能优化 */
  will-change: auto;
  contain: layout style;
}

/* 缩放时禁用过渡动画 */
.focus-hero.is-resizing .row {
  transition: none;
  will-change: auto;
}

.row i { 
  font-size: 28px; 
  margin-right: 12px; 
}

.row:last-child { 
  margin-bottom: 0; 
}

/* hover 只改背景色为绿色 */
.row:hover { 
  background-color: #21b69b !important; 
  color: #fff !important;
}

/* 缩放时禁用hover效果 */
.focus-hero.is-resizing .row:hover {
  background-color: inherit !important;
  color: inherit !important;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .panel-container {
    width: 100%;
    padding: 0 20px;
  }
  
  .panel {
    left: 100px;
    width: 280px;
  }
}

@media (max-width: 768px) {
  .panel {
    left: 50px;
    width: 250px;
  }
}

@media (max-width: 480px) {
  .panel-container {
    position: relative;
    transform: none; /* 移除transform避免小屏幕上的问题 */
    width: 100%;
    left: auto;
  }
  
  .panel {
    position: relative;
    left: 0;
    width: 100%;
    margin-top: 20px;
  }
  
  .hero {
    height: 300px; /* 固定高度避免auto导致的问题 */
    min-height: 250px;
  }
}

/* 减少不必要的重绘 */
@media (prefers-reduced-motion: reduce) {
  .row {
    transition: none;
  }
}
</style>