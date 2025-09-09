<script setup>
import { ref } from "vue";

// 主要产品服务数据 - 按截图设计
const mainServices = [
  {
    icon: "fa-solid fa-credit-card",
    title: "三农个人产品",
    subtitle: "金穗惠农卡",
    description: "以诚惠农 以信立农",
    backgroundImage: "/public/yh1.png", // 麦田背景
    buttonText: "了解更多",
    buttonColor: "#ffa502",
    iconColor: "#4FC3F7",
    features: [
      { text: "惠农卡", href: "#huinong-card" },
      { text: "金穗惠农卡", href: "#jinsui-card" },
      { text: "惠农信用卡", href: "#huinong-credit-card" },
      { text: "农户小额贷款", href: "#farmer-loan" },
      { text: "农村个人生产经营贷款", href: "#rural-business-loan" },
      { text: "富民贷", href: "#fumin-loan" },
    ],
    hotLabel: "HOT",
  },
  {
    icon: "fa-solid fa-university",
    title: "三农对公产品",
    subtitle: "园区贷",
    description: "助力乡村振兴 支持实体经济",
    backgroundImage: "/public/yh2.png", // 城市建筑背景
    buttonText: "了解更多",
    buttonColor: "#ffa502",
    iconColor: "#4FC3F7",
    features: [
      { text: "园区贷", href: "#yuanqu-loan" },
      { text: "工业贷", href: "#industrial-loan" },
      { text: "农村城镇化贷款", href: "#rural-urbanization-loan" },
      { text: "养老机构贷款", href: "#elderly-care-loan" },
      { text: "养老机构投资", href: "#elderly-care-investment" },
      { text: "县域商品流通市场建设贷款", href: "#county-market-loan" },
    ],
    hotLabel: "HOT",
  },
];

// 处理feature链接点击
const handleFeatureClick = (href) => {
  if (href && href !== "#") {
    // 这里可以根据需要处理不同的链接
    // 如果是外部链接，可以用 window.open(href, '_blank')
    // 如果是内部路由，可以用 router.push(href)
    console.log("点击了feature链接:", href);
    // 暂时使用页面滚动或其他处理方式
    // window.location.hash = href;
  }
};
</script>

<template>
  <section class="product-services">
    <div class="container">
      <h1 class="section-title">三农产品</h1>

      <!-- 主要服务卡片 - 左右两栏布局 -->
      <div class="services-grid">
        <!-- 左侧：三农个人产品 -->
        <div class="service-card personal-card">
          <div class="card-header">
            <div class="service-icon">
              <i class="fa-solid fa-credit-card"></i>
            </div>
            <h3 class="service-title">{{ mainServices[0].title }}</h3>
          </div>

          <div class="card-main">
            <div
              class="card-background"
              :style="{
                backgroundImage: `url(${mainServices[0].backgroundImage})`,
              }"
            >
              <div class="card-overlay">
                <h4 class="product-name">{{ mainServices[0].subtitle }}</h4>
                <p class="product-slogan">{{ mainServices[0].description }}</p>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="features-grid">
              <a
                v-for="(feature, idx) in mainServices[0].features"
                :key="idx"
                :href="feature.href"
                class="feature-item feature-link"
                @click.prevent="handleFeatureClick(feature.href)"
              >
                <span class="feature-bullet">•</span>
                <span class="feature-text">{{ feature.text }}</span>
                <span v-if="feature.text === '惠农卡'" class="hot-badge">{{
                  mainServices[0].hotLabel
                }}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- 右侧：三农对公产品 -->
        <div class="service-card corporate-card">
          <div class="card-header">
            <div class="service-icon">
              <i class="fa-solid fa-university"></i>
            </div>
            <h3 class="service-title">{{ mainServices[1].title }}</h3>
          </div>

          <div class="card-main">
            <div
              class="card-background"
              :style="{
                backgroundImage: `url(${mainServices[1].backgroundImage})`,
              }"
            >
              <div class="card-overlay">
                <h4 class="product-name">{{ mainServices[1].subtitle }}</h4>
                <p class="product-slogan">{{ mainServices[1].description }}</p>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="features-grid">
              <a
                v-for="(feature, idx) in mainServices[1].features"
                :key="idx"
                :href="feature.href"
                class="feature-item feature-link"
                @click.prevent="handleFeatureClick(feature.href)"
              >
                <span class="feature-bullet">•</span>
                <span class="feature-text">{{ feature.text }}</span>
                <span v-if="feature.text === '园区贷'" class="hot-badge">{{
                  mainServices[1].hotLabel
                }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-services {
  background: white;
  padding: 40px 0;
  margin: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 40px;
  font-weight: 500;
  letter-spacing: 1px;
}

/* 服务卡片网格 - 左右两栏 */
.services-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.service-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  min-height: 400px;
}

.service-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* 卡片头部 */
.card-header {
  padding: 20px 25px 15px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 15px;
  background: #fafafa;
}

.service-icon {
  width: 45px;
  height: 45px;
  background: #4fc3f7;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.service-icon i {
  font-size: 20px;
}

.service-title {
  font-size: 18px;
  color: #333;
  margin: 0;
  font-weight: 600;
}

/* 卡片主要内容区域 */
.card-main {
  flex: 1;
  position: relative;
  min-height: 200px;
}

.card-background {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-overlay {
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 30px;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.product-name {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: white;
}

.product-slogan {
  font-size: 16px;
  margin: 0;
  font-weight: 300;
  letter-spacing: 1px;
  color: #f0f0f0;
}

/* 卡片底部 */
.card-footer {
  padding: 20px 25px;
  background: white;
  border-top: 1px solid #f0f0f0;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 15px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #666;
  line-height: 1.4;
  padding: 3px 0;
  position: relative;
}

/* 链接样式 */
.feature-link {
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border-radius: 4px;
  padding: 5px 8px;
  margin: -2px -8px;
}

.feature-link:hover {
  background-color: #f0f8ff;
  color: #2c5aa0;
  transform: translateX(3px);
}

.feature-link:hover .feature-bullet {
  color: #2c5aa0;
}

.feature-link:hover .feature-text {
  color: #2c5aa0;
}

.feature-bullet {
  color: #4fc3f7;
  font-weight: bold;
  flex-shrink: 0;
}

.feature-text {
  flex: 1;
}

.hot-badge {
  background: #ff4757;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-left: 5px;
}

/* 个人产品卡片特殊样式 */
.personal-card .card-background {
  background-image: url("/public/yh1.png");
}

.personal-card .service-icon {
  background: #4fc3f7;
}

/* 对公产品卡片特殊样式 */
.corporate-card .card-background {
  background-image: url("/public/yh2.png");
}

.corporate-card .service-icon {
  background: #4fc3f7;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .services-grid {
    gap: 25px;
  }

  .card-header {
    padding: 18px 20px 12px;
  }

  .card-footer {
    padding: 18px 20px;
  }
}

@media (max-width: 768px) {
  .product-services {
    padding: 30px 0;
    margin: 15px 0;
  }

  .section-title {
    font-size: 20px;
    margin-bottom: 30px;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }

  .service-card {
    min-height: 350px;
  }

  .card-header {
    padding: 15px 18px 12px;
  }

  .service-icon {
    width: 40px;
    height: 40px;
  }

  .service-icon i {
    font-size: 18px;
  }

  .service-title {
    font-size: 16px;
  }

  .card-overlay {
    padding: 25px;
  }

  .product-name {
    font-size: 20px;
  }

  .product-slogan {
    font-size: 14px;
  }

  .card-footer {
    padding: 15px 18px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }

  .services-grid {
    gap: 15px;
  }

  .service-card {
    min-height: 320px;
  }

  .card-header {
    padding: 12px 15px 10px;
  }

  .card-overlay {
    padding: 20px;
  }

  .product-name {
    font-size: 18px;
  }

  .product-slogan {
    font-size: 13px;
  }

  .card-footer {
    padding: 12px 15px;
  }

  .feature-item {
    font-size: 12px;
  }
}
</style> 