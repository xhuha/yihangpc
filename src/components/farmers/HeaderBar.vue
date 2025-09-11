<script setup>
import { ref, onMounted } from 'vue'
import MegaMenu from './MegaMenu.vue'

const menus = [
  { label: '个人服务', path: '/' },
  { label: '企业服务', path: '/corp' },
  { label: '三农服务', path: '/farmers' },
  { label: '小微企业服务', path: '/sme' },
  { label: '关于农行', path: '/about' }
]

// 定义变量控制当前悬停的菜单
const currentMenuIndex = ref(0)

const showMega = ref(false)
const megaStyle = ref({})
const tabsRef = ref(null)
const wrapRef = ref(null)
const brandRef = ref(null)

function openMega(menuIndex) {
  currentMenuIndex.value = menuIndex
  if (!tabsRef.value || !wrapRef.value) {
    showMega.value = true
    return
  }
  const tabsRect = tabsRef.value.getBoundingClientRect()
  const wrapRect = wrapRef.value.getBoundingClientRect()
  const extra = 32 // 比 ul 稍宽一些（左右各 16px）
  const left = Math.max(0, tabsRect.left - wrapRect.left - extra / 2)
  const width = Math.min(wrapRect.width, tabsRect.width + extra)
  megaStyle.value = { left: left + 'px', width: width + 'px' }
  showMega.value = true
}

function syncBrandWidth() {
  const el = brandRef.value
  if (!el) return
  const w = Math.round(el.getBoundingClientRect().width)
  document.documentElement.style.setProperty('--brand-width-px', w + 'px')
}

onMounted(() => {
  syncBrandWidth()
  const ro = new ResizeObserver(() => syncBrandWidth())
  if (brandRef.value) ro.observe(brandRef.value)
  window.addEventListener('resize', syncBrandWidth)
})
</script>

<template>
  <header class="header">
    <div class="util">
      <div class="util-inner">
        <span>本网站已支持IPv6</span>
        <nav class="util-links">
          <a href="javascript:void(0)">无障碍浏览</a>
          <a href="javascript:void(0)">关怀版</a>
          <a href="javascript:void(0)">农行ESG</a>
          <a href="javascript:void(0)">网点查询</a>
          <a href="javascript:void(0)">在线客服</a>
          <a href="javascript:void(0)">繁体</a>
          <a href="javascript:void(0)">English</a>
        </nav>
      </div>
    </div>

    <div class="nav-wrap" ref="wrapRef" @mouseleave="showMega = false">
      <div class="nav">
        <div class="nav-inner">
          <div class="logo">
            <div class="brand" ref="brandRef">
              <div class="cn">中国农业银行</div>
              <div class="en">AGRICULTURAL BANK OF CHINA</div>
            </div>
          </div>
          <ul class="tabs" ref="tabsRef">
            <li v-for="(m, idx) in menus" :key="m.path">
              <router-link
                class="tab-link"
                :to="m.path"
                @mouseenter="openMega(idx)"
              >
                {{ m.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <MegaMenu v-show="showMega" class="mega-pop" :style="megaStyle" :currentMenuIndex="currentMenuIndex" />
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  background: #fff;
  position: relative;
  z-index: 20;
}
.util {
  background: #21b69b;
  color: #fff;
  font-size: 12px;
}
.util-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 28px;
}
.util-links a {
  color: #fff;
  text-decoration: none;
  margin-left: 14px;
  opacity: 0.95;
}
.util-links a + a { position: relative; }
.util-links a + a::before {
  content: '|';
  color: rgba(255,255,255,.6);
  margin-right: 14px;
}

.nav { border-bottom: 1px solid #eee; }
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 76px;
}
.logo img { height: 36px; width: auto; }
.logo { display: flex; align-items: center; gap: 12px; }
.brand { line-height: 1; }
.brand .cn { font-size: 28px; font-weight: 700; color: #333; }
.brand .en { font-size: 12px; color: #666; margin-top: 4px; letter-spacing: .5px; }

.tabs {
  margin-left: 32px;
  display: flex;
  list-style: none;
  padding: 0;
}
/* 方案A：li 仅负责排列 */
.tabs li { margin-right: 12px; }

.tab-link {
  display: inline-flex;
  align-items: center;
  height: 76px;
  padding: 0 16px;
  color: #555;
  text-decoration: none;
  font-size: 18px;
  border-top: 6px solid transparent; /* 固定厚度，默认透明 */
  padding-top: 10px; /* 与上方留距，所有项一致 */
  position: relative; /* 供 ::before 定位 */
  overflow: hidden;   /* 裁剪内部竖线，防止外溢 */
  transition: color .2s ease, border-color .2s ease;
}
/* 内部左右1px竖线，顶部从6px开始，底部提前1px结束，默认隐藏 */
.tab-link::before {
  content: "";
  position: absolute;
  left: 0; right: 0; top: 6px; bottom: 1px;
  background:
    linear-gradient(#e6e6e6, #e6e6e6) left/1px 100% no-repeat,
    linear-gradient(#e6e6e6, #e6e6e6) right/1px 100% no-repeat;
  opacity: 0;
  pointer-events: none;
}
/* 悬停：只改颜色，并显示内部竖线 */
.tabs li:hover .tab-link {
  color: #21b69b;
  border-top-color: #21b69b;
}
.tabs li:hover .tab-link::before { opacity: 1; }

/* 箭头：默认为灰色向右的折线箭头（chevron） */
.tab-link::after {
  content: "";
  display: inline-block;
  margin-left: 8px;
  width: 6px;
  height: 6px;
  border-right: 2px solid #c7c7c7;
  border-bottom: 2px solid #c7c7c7;
  transform: rotate(-45deg); /* 形如 › */
  transition: transform .16s ease, border-color .16s ease;
}
/* 悬停：箭头变绿并旋转为向下（形如 ˅） */
.tabs li:hover .tab-link::after {
  border-right-color: #21b69b;
  border-bottom-color: #21b69b;
  transform: rotate(45deg);
}

/* 当前页：只变文字颜色为绿，不带任何边框与箭头变化 */
.tabs :deep(a.router-link-exact-active) {
  color: #21b69b;
}

/* 下拉层定位：宽度与 ul 接近并略宽（由 JS 计算） */
.mega-pop {
  position: absolute;
  left: 0;
  right: 0;
  top: 104px; /* 28(util) + 76(nav) */
}
</style> 