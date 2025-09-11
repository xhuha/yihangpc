<script setup>
import { ref } from "vue";

// 关于农行链接数据
const aboutLinks = ref([
  { text: "农行风貌", href: "#" },
  { text: "公司公告", href: "#" },
  { text: "人才招聘", href: "#" },
  { text: "新闻中心", href: "#" },
  { text: "投资者关系", href: "#" },
  { text: "联系我们", href: "#" },
]);

// 服务快捷入口
const services = ref([
  { icon: "fas fa-desktop", text: "网上银行", href: "#" },
  { icon: "fas fa-mobile-alt", text: "掌上银行", href: "#" },
  { icon: "fas fa-phone", text: "电话银行", href: "#" },
  { icon: "fas fa-university", text: "网点", href: "#" },
  { icon: "fas fa-credit-card", text: "ATM", href: "#" },
  { icon: "fas fa-shield-alt", text: "自助终端", href: "#" },
]);

// 二维码数据
const qrCodes = ref([
  {
    id: "mobile-bank",
    title: "下载手机上银行",
    image: "/public/二维码1.png", // 替换为实际二维码图片
    alt: "手机银行下载二维码",
  },
  {
    id: "wechat",
    title: "关注官方微信",
    image: "/public/二维码2.jpg", // 替换为实际二维码图片
    alt: "官方微信二维码",
  },
]);

// 底部链接导航
const footerLinks = ref([
  { text: "网站声明", href: "#" },
  { text: "网站地图", href: "#" },
  { text: "联系我们", href: "#" },
  { text: "隐私与安全", href: "#" },
]);

// 交互功能
const showQRModal = ref(false);
const currentQR = ref(null);

const openQRModal = (qr) => {
  currentQR.value = qr;
  showQRModal.value = true;
};

const closeQRModal = () => {
  showQRModal.value = false;
  currentQR.value = null;
};

// 链接点击处理
const handleLinkClick = (href) => {
  if (href && href !== "#") {
    window.open(href, "_blank");
  }
};
</script>

<template>
  <footer class="footer">
    <div class="container">
      <!-- 主要内容区域 -->
      <div class="main-section">
        <!-- 左侧：关于农行 -->
        <div class="left-content">
          <h3 class="section-title">关于农行</h3>
          <p class="section-subtitle">> 农业银行为员工"花"起变心一夏</p>
          <p class="section-description">
            以前面值的消费，从了客人们，心里感觉很贴心！您在享受共同条件的支持下，上线写感。
            安静公司目标，上网专线。
            <span class="read-more">[详细]</span>
          </p>

          <!-- 关于农行链接 -->
          <div class="about-links">
            <a
              v-for="link in aboutLinks"
              :key="link.text"
              :href="link.href"
              class="about-link"
              @click.prevent="handleLinkClick(link.href)"
            >
              • {{ link.text }}
            </a>
          </div>
        </div>

        <!-- 右侧：我们无处不在 -->
        <div class="right-content">
          <h3 class="section-title">我们无处不在</h3>
          <p class="section-subtitle">任何一个事情您都可以享受金融便利！</p>

          <!-- 服务快捷入口和二维码区域 -->
          <div class="services-qr-container">
            <!-- 服务快捷入口 -->
            <div class="services-grid">
              <a
                v-for="service in services"
                :key="service.text"
                :href="service.href"
                class="service-item"
                @click.prevent="handleLinkClick(service.href)"
              >
                <div class="service-icon">
                  <i :class="service.icon"></i>
                </div>
                <span class="service-text">{{ service.text }}</span>
              </a>
            </div>

            <!-- 二维码区域 -->
            <div class="qr-section">
              <div
                v-for="qr in qrCodes"
                :key="qr.id"
                class="qr-item"
                @click="openQRModal(qr)"
              >
                <div class="qr-code">
                  <img :src="qr.image" :alt="qr.alt" />
                </div>
                <span class="qr-title">{{ qr.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部导航链接 -->
      <div class="bottom-section">
        <div class="bottom-content">
          <!-- 底部布局：按截图精确还原 -->
          <div class="footer-layout">
            <!-- 第一行：导航链接、客服热线、友情链接 -->
            <div class="top-row">
              <!-- 导航链接 -->
              <a
                v-for="(link, index) in footerLinks"
                :key="link.text"
                :href="link.href"
                class="footer-link"
                @click.prevent="handleLinkClick(link.href)"
              >
                {{ link.text
                }}<span v-if="index < footerLinks.length - 1" class="separator">
                  |
                </span>
              </a>

              <span class="separator"> | </span>

              <!-- 客服热线 -->
              <span class="hotline-text"
                >客服热线：<span class="hotline-number">95599</span></span
              >

              <span class="separator"> | </span>

              <!-- 友情链接 -->
              <select class="links-selector">
                <option value="">友情链接</option>
                <option value="link1">友情链接1</option>
                <option value="link2">友情链接2</option>
              </select>
            </div>

            <!-- 第二行：版权信息 -->
            <div class="bottom-row">
              <span class="copyright-text">中国农业银行版权所有</span>
              <span class="separator"> | </span>
              <span class="copyright-text">京ICP备05049539号-1</span>
              <span class="separator"> | </span>
              <span class="copyright-text">京ICP备05049539号-5</span>
              <span class="separator"> | </span>
            </div>
            <div class="bottom-row">
              <span class="copyright-text">京公网安备11040102700189号</span>
              <span class="separator"> | </span>
              <span class="copyright-text">京公网安备11040102700190号</span>
            </div>

            <!-- 右下角：官方认证标识 -->
            <div class="official-badge">
              <img
                src="/public/yh3.png"
                alt="中国反洗钱监测分析中心备案系统"
                class="badge-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 二维码弹窗 -->
    <div v-if="showQRModal" class="qr-modal" @click="closeQRModal">
      <div class="qr-modal-content" @click.stop>
        <button class="qr-close" @click="closeQRModal">×</button>
        <h4>{{ currentQR?.title }}</h4>
        <div class="qr-modal-image">
          <img :src="currentQR?.image" :alt="currentQR?.alt" />
        </div>
        <p>请使用手机扫描二维码</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #4ecdc4;
  color: white;
  font-size: 14px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 主要内容区域 */
.main-section {
  display: flex;
  gap: 60px;
  padding: 40px 0 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.left-content {
  flex: 1;
}

.right-content {
  flex: 1.2;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 15px;
  color: white;
}

.section-subtitle {
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 500;
  opacity: 0.95;
}

.section-description {
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 25px;
  opacity: 0.9;
}

.read-more {
  color: #ffeb3b;
  cursor: pointer;
  text-decoration: underline;
}

/* 关于农行链接 */
.about-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px 15px;
}

.about-link {
  font-size: 13px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 3px 0;
}

.about-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

/* 服务和二维码容器 */
.services-qr-container {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

/* 服务快捷入口 */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  flex: 1;
}

.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 10px;
}

.service-item:hover {
  transform: translateY(-3px);
}

.service-icon {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  font-size: 20px;
  transition: all 0.3s ease;
}

.service-item:hover .service-icon {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.6);
}

.service-text {
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
}

/* 二维码区域 */
.qr-section {
  display: flex;
  flex-direction: column;
  gap: 25px;
  flex-shrink: 0;
}

.qr-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.qr-item:hover {
  transform: translateY(-3px);
}

.qr-code {
  width: 90px;
  height: 90px;
  background: white;
  border-radius: 6px;
  padding: 6px;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.qr-code img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px;
}

.qr-title {
  font-size: 12px;
  color: white;
  text-align: center;
  font-weight: 500;
  line-height: 1.2;
  max-width: 90px;
}

/* 底部区域 */
.bottom-section {
  background: #f5f5f5;
  border-top: 1px solid #e0e0e0;
  padding: 10px 0;
  width: 100%;
}

/* 底部内容容器 */
.bottom-content {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0 20px;
  box-sizing: border-box;
}

/* 底部布局：两行结构 */
.footer-layout {
  position: relative;
  width: 100%;
}

/* 第一行：导航链接和服务信息 */
.top-row {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 4px;
  margin-bottom: 5px;
  font-size: 12px;
  line-height: 1.4;
}

/* 第二行：版权信息 */
.bottom-row {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 4px;
  font-size: 12px;
  line-height: 1.4;
}

.footer-link {
  color: #666;
  text-decoration: none;
  font-size: 12px;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.footer-link:hover {
  color: #333;
  text-decoration: underline;
}

.separator {
  color: #999;
  font-size: 12px;
  margin: 0 4px;
}

.copyright-text {
  color: #999;
  font-size: 12px;
  white-space: nowrap;
}

.hotline-text {
  color: #666;
  font-size: 12px;
  white-space: nowrap;
}

.hotline-number {
  color: #ff9800;
  font-weight: 600;
}

/* 友情链接选择器 */
.links-selector {
  background: #fff;
  border: 1px solid #ddd;
  color: #666;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  min-width: 80px;
  white-space: nowrap;
  margin: 0 4px;
}

.links-selector:focus {
  outline: none;
  border-color: #999;
}

.links-selector option {
  background: #fff;
  color: #666;
}

/* 官方认证标识 - 右下角固定定位 */
.official-badge {
  position: absolute;
  right: 0;
  bottom: -5px;
  width: 100px;
  height: auto;
}

.badge-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* 二维码弹窗 */
.qr-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.qr-modal-content {
  background: white;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  position: relative;
  max-width: 300px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.qr-close {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-close:hover {
  color: #333;
}

.qr-modal-content h4 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
}

.qr-modal-image {
  margin: 20px 0;
}

.qr-modal-image img {
  width: 200px;
  height: 200px;
  border-radius: 8px;
}

.qr-modal-content p {
  margin: 15px 0 0 0;
  color: #666;
  font-size: 14px;
}

/* 大屏幕优化 */
@media (min-width: 1400px) {
  .bottom-content {
    padding: 0 40px;
  }

  .footer-links {
    gap: 12px;
  }

  .official-badge {
    width: 100px;
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-section {
    flex-direction: column;
    gap: 40px;
  }

  .services-qr-container {
    flex-direction: column;
    gap: 30px;
    align-items: center;
  }

  .services-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;
    justify-content: center;
  }

  .about-links {
    grid-template-columns: repeat(2, 1fr);
  }

  .qr-section {
    flex-direction: row;
    justify-content: center;
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .main-section {
    padding: 30px 0 20px;
  }

  .container {
    padding: 0 16px;
  }

  .services-qr-container {
    flex-direction: column;
    gap: 25px;
  }

  .services-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 15px;
  }

  .service-icon {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }

  .service-text {
    font-size: 12px;
  }

  .about-links {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .qr-section {
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }

  .qr-code {
    width: 75px;
    height: 75px;
  }

  .qr-title {
    font-size: 11px;
    max-width: 75px;
  }

  .bottom-content {
    padding: 0 15px;
    position: relative;
  }

  .top-row,
  .bottom-row {
    flex-wrap: wrap;
    justify-content: center;
    gap: 3px;
    line-height: 1.6;
  }

  .footer-link,
  .copyright-text,
  .hotline-text {
    font-size: 11px;
  }

  .separator {
    margin: 0 2px;
  }

  .official-badge {
    width: 80px;
    right: 10px;
    bottom: -3px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 20px;
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 12px;
  }

  .service-icon {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }

  .service-text {
    font-size: 11px;
  }

  .qr-code {
    width: 65px;
    height: 65px;
  }

  .qr-title {
    font-size: 10px;
    max-width: 65px;
  }

  .qr-modal-content {
    max-width: 280px;
    padding: 20px;
  }

  .qr-modal-image img {
    width: 180px;
    height: 180px;
  }

  .footer-link {
    font-size: 12px;
  }

  .copyright-text,
  .license-info {
    font-size: 11px;
  }

  .bottom-content {
    padding: 8px 10px;
    position: relative;
  }

  .top-row,
  .bottom-row {
    flex-direction: column;
    gap: 3px;
    align-items: center;
    margin-bottom: 3px;
  }

  .footer-link,
  .copyright-text,
  .hotline-text {
    font-size: 10px;
  }

  .separator {
    display: none;
  }

  .links-selector {
    font-size: 10px;
    min-width: 60px;
    padding: 1px 4px;
    margin: 2px 0;
  }

  .official-badge {
    width: 60px;
    right: 5px;
    bottom: 0;
  }
}
</style> 