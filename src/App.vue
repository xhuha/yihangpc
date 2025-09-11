<script setup>
import { ref, onMounted } from 'vue'

// 节流函数
const throttle = (func, delay) => {
  let timeoutId = null
  let lastExecTime = 0
  
  return function (...args) {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func.apply(this, args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

// 性能监控变量
const performanceStats = ref({
  fps: 0,
  resizeCount: 0,
  lastResizeTime: 0
})

// 性能监控
let frameCount = 0
let lastTime = performance.now()

const monitorPerformance = () => {
  frameCount++
  const currentTime = performance.now()
  
  if (currentTime - lastTime >= 1000) {
    performanceStats.value.fps = Math.round(frameCount * 1000 / (currentTime - lastTime))
    frameCount = 0
    lastTime = currentTime
    
    // 如果FPS过低，可以触发性能优化措施
    if (performanceStats.value.fps < 30) {
      console.warn('性能警告: FPS过低', performanceStats.value.fps)
      // 可以在这里添加降级措施
    }
  }
  
  requestAnimationFrame(monitorPerformance)
}

// 使用节流的性能监控（可选，针对高频更新场景）
const throttledPerformanceUpdate = throttle(() => {
  // 额外的性能统计更新逻辑
  if (performanceStats.value.fps < 20) {
    document.body.classList.add('performance-mode')
  } else {
    document.body.classList.remove('performance-mode')
  }
}, 200)

// 缩放频率限制
let resizeThreshold = 5 // 每秒最多5次缩放
let resizeCount = 0
let resizeWindow = 1000 // 1秒窗口

const limitResizeFrequency = () => {
  const now = Date.now()
  
  if (now - performanceStats.value.lastResizeTime > resizeWindow) {
    resizeCount = 0
    performanceStats.value.lastResizeTime = now
  }
  
  resizeCount++
  performanceStats.value.resizeCount = resizeCount
  
  if (resizeCount > resizeThreshold) {
    console.warn('缩放频率过高，已启用性能保护模式')
    document.body.style.pointerEvents = 'none'
    setTimeout(() => {
      document.body.style.pointerEvents = 'auto'
    }, 500)
  }
  
  // 触发节流的性能更新
  throttledPerformanceUpdate()
}

// 创建节流版本的resize处理函数
const throttledResizeHandler = throttle(limitResizeFrequency, 100)

onMounted(() => {
  // 启动性能监控
  requestAnimationFrame(monitorPerformance)
  
  // 监听缩放事件（使用节流版本）
  window.addEventListener('resize', throttledResizeHandler, { passive: true })
  
  // 监听滚动事件（使用节流）
  const throttledScrollHandler = throttle(() => {
    // 可以在这里添加滚动相关的性能优化逻辑
    throttledPerformanceUpdate()
  }, 50)
  
  window.addEventListener('scroll', throttledScrollHandler, { passive: true })
})
</script>

<template>
<router-view />
</template>

<style>
/* 页面放大2倍时隐藏整个页面 */
@media (min-resolution: 2dppx) {
  html, body {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
}

/* WebKit浏览器的高DPI检测 */
@media (-webkit-min-device-pixel-ratio: 2) {
  html, body {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
}

/* 检测高分辨率显示 */
@media (min-resolution: 192dpi) {
  html, body {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
}

/* 检测设备像素比 */
@media (min-device-pixel-ratio: 2) {
  html, body {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
}

/* 使用视口宽度检测缩放 */
@media (max-width: 50vw) {
  html, body {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
}

/* 全局性能优化 */
* {
  box-sizing: border-box;
}

html {
  overflow-x: hidden;
  /* 性能优化 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeSpeed;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;
  /* 移除全局硬件加速避免缩放时的渲染问题 */
  /* transform: translateZ(0); */
  /* backface-visibility: hidden; */
}

/* 减少重绘和回流 */
img {
  user-select: none;
  -webkit-user-drag: none;
}

/* 性能保护模式样式 */
body.performance-mode {
  pointer-events: none !important;
}

body.performance-mode * {
  animation-play-state: paused !important;
  transition: none !important;
}

/* 缩放时的全局优化 */
@media (min-resolution: 1.1dppx) and (max-resolution: 1.9dppx) {
  * {
    will-change: auto;
  }
  
  .panel, .hero, .focus-hero {
    contain: layout style paint;
  }
}

/* 为低性能设备优化 */
@media (max-width: 768px) {
  * {
    will-change: auto !important;
    contain: none !important;
  }
}

/* 减少动画对于偏好减少动画的用户 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
@media screen and (max-width: 980px) {
  html, body, #app {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
}
</style>
