<template>
  <div class="login-wrap">
    <header class="topbar">
    <div class="topbar-inner">
      <div class="right-links">
        <a href="#">本系统已支持IPv6</a>
        <a href="#">无障碍浏览</a>
        <a href="#">English</a>
      </div>
    </div>
  </header>
  <div class="page-header">
    <div class="page-header-inner">
      <div class="brand-txt">
        <div class="cn">中国农业银行</div>
        <div class="en">AGRICULTURAL BANK OF CHINA</div>
      </div>
      <span class="vline" aria-hidden="true"></span>
      <h2 class="page-title">个人网上银行</h2>
    </div>
  </div>
  <div class="banner"></div>

    <aside class="panel">
      <div class="card">
        <div class="tabs">
          <button class="tab active" type="button">用户名登录</button>
          <button class="tab" type="button">K宝登录</button>
        </div>

        <form class="form" @submit.prevent="handleLogin">
        <label class="field">
          <i class="ico user" aria-hidden="true"></i>
          <input v-model="form.username" type="text" placeholder="用户名/卡号/身份证号/手机号" required>
        </label>

        <label class="field">
          <i class="ico lock" aria-hidden="true"></i>
          <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="请输入登录密码" required>
        </label>

        <div class="field captcha-row">
          <label class="field flex">
            <i class="ico key" aria-hidden="true"></i>
            <input v-model="form.captcha" type="text" placeholder="验证码" maxlength="4" required>
          </label>
          <div class="captcha" @click="refreshCaptcha" title="点击刷新">
            <canvas ref="captchaCanvas" width="90" height="36"></canvas>
          </div>
        </div>

        <button class="submit" type="submit" :disabled="isLoading">
          <span v-if="!isLoading">登 录</span>
          <span v-else>登录中...</span>
        </button>

        <div class="helper">
          <a href="#">首次登录指南</a>
        </div>

        <div class="links">
          <a href="#">客户注册</a>
          <a href="#">忘记密码</a>
          <a href="#" class="mobile">
            <i class="ico phone" aria-hidden="true"></i>
            掌银扫码登录
          </a>
        </div>
        </form>
      </div>
    </aside>

    <!-- 服务中心 -->
    <div class="m-servicecentre-center">
      <div class="m-servicecentre-title">
        <div class="m-leftspot"></div>
        <div class="m-core">服务中心</div>
        <div class="m-rightspot"></div>
      </div>
      <div class="m-important-link">
        <dl class="m-certificate-download">
          <dt>
            <a target="_blank" href="https://www.abchina.com/cn/wydl/grwydl/zsgx/ckzsyxq/"></a>
          </dt>
          <dd>
            <a target="_blank" href="https://www.abchina.com/cn/wydl/grwydl/zsgx/ckzsyxq/">证书下载</a>
          </dd>
        </dl>
        <dl class="m-toopen">
          <dt>
            <a target="_blank" href="https://www.abchina.com/cn/EBanking/Personal/Personalonlinebanking/"></a>
          </dt>
          <dd>
            <a target="_blank" href="https://www.abchina.com/cn/EBanking/Personal/Personalonlinebanking/">如何开通网银</a>
          </dd>
        </dl>
        <dl class="m-kbfirst-landing">
          <dt>
            <a target="_blank" href="https://www.abchina.com/cn/wydl/grwydl/kbzs/kbdlzsdyb/#step1"></a>
          </dt>
          <dd>
            <a target="_blank" href="https://www.abchina.com/cn/wydl/grwydl/kbzs/kbdlzsdyb/#step1">K宝首次登录</a>
          </dd>
        </dl>
        <dl class="m-klfirst-landing">
          <dt>
            <a target="_blank" href="https://www.abchina.com/cn/wydl/grwydl/klzs/klzsdyb/"></a>
          </dt>
          <dd>
            <a target="_blank" href="https://www.abchina.com/cn/wydl/grwydl/klzs/klzsdyb/">K令首次登录</a>
          </dd>
        </dl>
        
        <dl class="m-problem">
          <dt>
            <a href="frequentlyQuestions"></a>
          </dt>
          <dd>
            <a href="frequentlyQuestions">常见问题</a>
          </dd>
        </dl>
      </div>
    </div>

    <!-- 页脚精简版（登录页） -->
    <div class="login-footer-lite">
      <div class="lf-inner">
        <div class="lf-links">
          <a href="#">网站声明</a>
          <span class="sep">|</span>
          <a href="#">网站地图</a>
          <span class="sep">|</span>
          <a href="#">联系我们</a>
          <span class="sep">|</span>
          <span>客服电话：<em class="hotline">95599</em></span>
        </div>
        <div class="lf-copy">
          <span>中国农业银行版权所有</span>
          <span class="sep">|</span>
          <a href="#" class="icp">京ICP备05049539</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { api, setAuth } from '../api'

const form = reactive({
  username: '',
  password: '',
  captcha: ''
})

const showPassword = ref(false)
const isLoading = ref(false)
const captchaCanvas = ref(null)

const generateCaptcha = () => {
  const canvas = captchaCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  // 背景
  ctx.fillStyle = '#f2f2f2'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  // 字符
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  ctx.textBaseline = 'middle'
  for (let i = 0; i < 4; i++) {
    const ch = chars[Math.floor(Math.random() * chars.length)]
    ctx.fillStyle = '#333'
    ctx.font = 'bold 18px Arial'
    ctx.save()
    ctx.translate(14 + i * 20, 18)
    ctx.rotate((Math.random() - 0.5) * 0.3)
    ctx.fillText(ch, 0, 0)
    ctx.restore()
  }
  // 干扰线
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = '#c9c9c9'
    ctx.beginPath()
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.stroke()
  }
}

const refreshCaptcha = () => {
  generateCaptcha()
  form.captcha = ''
}

const handleLogin = async () => {
  if (!form.username || !form.password || !form.captcha) return
  isLoading.value = true
  try {
    const r = await api.post('/api/login', { username: form.username, password: form.password })
    setAuth({ user: r.data.user, accessToken: r.data.accessToken })
    window.location.href = '/'
  } catch (e) {
    console.error('login error:', e?.response?.status, e?.response?.data)
    // 登录失败时自动刷新验证码
    refreshCaptcha()
    // 避免刷新看不到错误：仅提示，不刷新
    alert('登录失败，请检查账号或密码')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  generateCaptcha()
})
</script>

<style scoped>
.login-wrap {
  position: relative;
  background: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 顶部简洁条 */
.topbar {
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
}
.topbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px 20px;
}
.right-links { text-align: right; }
.right-links a { color:#666; font-size:12px; text-decoration:none; margin-left:20px; }
.right-links a:hover { color:#00a854; }

/* 页面标题条 */
.page-header { background:#fff; border-bottom:1px solid #e5e5e5; }
.page-header-inner { max-width:1200px; margin:0 auto; padding: 16px 20px; display:flex; align-items:flex-end; gap:18px; }
.brand-txt { line-height: 1; }
.brand-txt .cn { font-size: 28px; font-weight: 700; color: #333; font-family: inherit; }
.brand-txt .en { font-size: 12px; color: #666; margin-top: 4px; letter-spacing: .5px; font-family: "Times New Roman", Times, Georgia, serif; }
.vline { width: 1px; height: 28px; background: #e0e0e0; align-self: center; }
.page-title { font-size:18px; color:#3c3c3c; font-weight: 600; margin-bottom: 2px; letter-spacing: .4px; font-family: "SimSun", "Songti SC", "STSong", "Noto Serif SC", serif; }

.banner {
  background: url('/登录.png') center center/cover no-repeat;
  min-height: 60vh;
  flex: 1;
  position: relative;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

.badge {
  position: absolute;
  top: 22px;
  left: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.badge .tag {
  background: #00a854;
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
}

.badge .txt {
  color: #2b2b2b;
  font-size: 14px;
}

.slogan {
  position: absolute;
  top: 80px;
  left: 90px;
  color: #2b2b2b;
}

.slogan h1 {
  font-size: 44px;
  font-weight: 700;
  letter-spacing: 1px;
}

.slogan p {
  margin-top: 8px;
  font-size: 20px;
  color: #5c5c5c;
}

.panel {
  width: 440px;
  position: absolute;
  right: 110px;
  top: 50%;
  transform: translateY(-50%);
}

/* 卡片容器 */
.panel .card {
  background: #fff;
  border-radius: 6px;
  border: 1px solid #eaeaea;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  padding: 20px 20px 16px;
}

/* 面板内部间距微调 */
.panel .form { padding-top: 6px; }

.tabs {
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 18px;
  padding: 0 4px;
}

.tab {
  flex: 1;
  background: transparent;
  border: 0;
  padding: 12px 8px;
  font-size: 16px;
  color: #666;
  cursor: default;
  position: relative;
}

.tab.active {
  color: #00a854;
}

.tab.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: #00a854;
}

.form {
  width: 100%;
}

.field {
  position: relative;
  display: block;
  margin-bottom: 14px;
}

.field.flex {
  margin: 0;
}

.field input {
  width: 100%;
  height: 46px;
  padding: 0 12px 0 42px;
  border: 1px solid #D9D9D9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color .2s ease;
  background: #fff;
}

.field input:focus {
  border-color: #00a854;
}

.captcha-row {
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 10px;
  align-items: center;
  margin-bottom: 16px;
}

.captcha {
  height: 46px;
  border: 1px solid #D9D9D9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #f7f7f7;
}

.captcha canvas { width: 120px; height: 46px; }

.submit {
  width: 100%;
  height: 48px;
  background: #00a854;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.submit:disabled {
  opacity: .7;
  cursor: not-allowed;
}

.helper {
  margin: 12px 0 10px;
}

.helper a {
  color: #00a854;
  text-decoration: none;
  font-size: 14px;
}

.links {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.links a {
  color: #00a854;
  text-decoration: none;
  font-size: 14px;
}

.ico {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  opacity: .7;
}

.user { background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23999"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.33 0-8 1.67-8 5v1h16v-1c0-3.33-4.67-5-8-5Z"/></svg>') center/18px 18px no-repeat; }
.lock { background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23999"><path d="M17 8h-1V6a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Zm-5 8a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 12 16Z"/></svg>') center/18px 18px no-repeat; }
.key  { background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23999"><path d="M15.5 3A5.5 5.5 0 1 0 20 8.5h-4l-2 2v2H12l-2 2H8v2H6v2H4v2h4l2-2v-2h2l2-2v-2l2-2h4A5.5 5.5 0 0 0 15.5 3Zm0 8A2.5 2.5 0 1 1 18 8.5 2.5 2.5 0 0 1 15.5 11Z"/></svg>') center/18px 18px no-repeat; }
.phone{ background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2300a854"><path d="M16 1H8a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-4 20a1 1 0 1 1 1-1 1 1 0 0 1-1 1Zm3-3H9V4h6Z"/></svg>') center/16px 16px no-repeat; position: static; transform: none; width: 16px; height: 16px; }
</style>

<style scoped>
@media (max-width: 768px) {
  .panel {
    position: static;
    transform: none;
    width: 100%;
    padding: 16px;
  }
  .banner {
    min-height: 50vh;
  }
  
  .m-servicecentre-center {
    padding: 15px 0;
  }
  
  .m-important-link {
    gap: 20px;
    padding: 0 15px;
  }
  
  .m-important-link dt {
    width: 45px;
    height: 45px;
  }
  
  .m-important-link dd a {
    font-size: 11px;
  }
}

/* 服务中心样式 */
.m-servicecentre-center {
  background: #f5f5f5;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  margin-top: auto;
}

.m-servicecentre-title {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.m-leftspot, .m-rightspot {
  flex: 1;
  height: 1px;
  background: #ccc;
  max-width: 200px;
}

.m-core {
  background: #f5f5f5;
  padding: 0 20px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
}

.m-important-link {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.m-important-link dl {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 10px;
}

.m-important-link dl:hover {
  transform: translateY(-2px);
}

.m-important-link dt {
  width: 50px;
  height: 50px;
  background: #4ecdc4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.m-important-link dl:hover dt {
  background: #45b7b8;
  transform: scale(1.05);
}

.m-important-link dt a {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.m-certificate-download dt a::before {
  content: "🔄";
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.m-toopen dt a::before {
  content: "🔑";
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.m-kbfirst-landing dt a::before {
  content: "💳";
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.m-klfirst-landing dt a::before {
  content: "📄";
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.m-problem dt a::before {
  content: "❓";
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.m-important-link dd {
  margin: 0;
}

.m-important-link dd a {
  font-size: 12px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  line-height: 1.2;
}

.m-important-link dd a:hover {
  color: #4ecdc4;
}

/* 登录页简洁底部 */
.login-footer-lite { 
  border-top: 1px solid #eee; 
  background: #fff; 
  width: 100%;
  margin-top: 0;
}
.lf-inner { max-width: 1200px; margin: 0 auto; padding: 18px 20px 26px; text-align: center; color:#666; font-size: 12px; }
.lf-links a { color:#666; text-decoration: none; }
.lf-links a:hover { text-decoration: underline; }
.lf-links .sep, .lf-copy .sep { margin: 0 10px; color:#d0d0d0; }
.hotline { color: #f39c12; font-style: normal; }
.icp { color: #f39c12; text-decoration: none; }
.icp:hover { text-decoration: underline; }
.lf-copy { margin-top: 6px; }
</style> 