<script setup>
import { ref } from 'vue'

// 主要产品服务数据 - 按截图设计
const mainServices = [
  {
    icon: 'fa-solid fa-chart-line',
    title: '投资理财',
    subtitle: '时时打理财对的配置理财上线',
    description: '自动理财，让网银资金稳健增值',
    buttonText: '理财理财',
    buttonColor: '#ffa502',
    iconColor: '#4FC3F7',
    features: ['基金', '贵金属', '外汇', '保险']
  },
  {
    icon: 'fa-solid fa-credit-card',
    title: '信用卡',
    subtitle: '全国一一推出主力客户消费级...',
    description: '全国一一推出信用卡境外消费退15%',
    buttonText: '理财办理',
    buttonColor: '#ffa502',
    iconColor: '#4FC3F7',
    features: ['我要办卡', '积分换礼', '特卡服务', '刷卡优惠']
  },
  {
    icon: 'fa-solid fa-university',
    title: '贷款',
    subtitle: '个人一手住房贷款',
    description: '个人自用车贷款',
    buttonText: '理财贷款方案',
    buttonColor: '#ffa502',
    iconColor: '#4FC3F7',
    features: ['安居好时贷', '网提贷', '大额存单', '自动转账']
  },
  {
    icon: 'fa-solid fa-user-tie',
    title: '账户服务',
    subtitle: '掌上银行',
    description: '个人金会归集',
    buttonText: '理财账户服务',
    buttonColor: '#ffa502',
    iconColor: '#4FC3F7',
    features: ['助业好时贷', '房抵贷', '资金托管', '跨境电汇']
  }
]


</script>

<template>
  <section class="product-services">
    <div class="container">
      <h2 class="section-title">产品·服务</h2>
      
      <!-- 主要服务卡片 -->
      <div class="services-grid">
        <div 
          v-for="(service, index) in mainServices" 
          :key="index"
          class="service-card"
        >
                     <div class="card-header">
             <div class="service-icon" :style="{ backgroundColor: service.iconColor }">
               <i :class="service.icon"></i>
             </div>
             <h3 class="service-title">{{ service.title }}</h3>
           </div>
          
          <div class="card-content">
            <p class="service-subtitle">{{ service.subtitle }}</p>
            <p class="service-description">{{ service.description }}</p>
            
            <button class="service-button" :style="{ backgroundColor: service.buttonColor }">
              {{ service.buttonText }}
            </button>
          </div>
          
          <div class="card-footer">
            <ul class="feature-list">
              <li v-for="(feature, idx) in service.features" :key="idx" class="feature-item">
                • {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      

    </div>
  </section>
</template>

<style scoped>
.product-services {
  background: white;
  padding: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-size: 24px;
  color: #999;
  margin-bottom: 40px;
  font-weight: 300;
  letter-spacing: 2px;
}

/* 服务卡片网格 */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  margin-bottom: 50px;
}

.service-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #eee;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #ddd;
}

/* 卡片头部 */
.card-header {
  padding: 20px 20px 15px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.service-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.service-icon i {
  font-size: 22px;
}

.service-title {
  font-size: 18px;
  color: #333;
  margin: 0;
  font-weight: 600;
}

/* 卡片内容 */
.card-content {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.service-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  line-height: 1.4;
}

.service-description {
  font-size: 13px;
  color: #888;
  margin-bottom: 20px;
  line-height: 1.4;
  flex-grow: 1;
}

.service-button {
  background: #ffa502;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
}

.service-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* 卡片底部 */
.card-footer {
  padding: 15px 20px 20px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}

.feature-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.feature-item {
  font-size: 12px;
  color: #666;
  line-height: 1.3;
  padding: 2px 0;
}



/* 响应式设计 */
@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .product-services {
    padding: 30px 0 40px;
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
    max-width: 400px;
    margin: 0 auto;
  }
  
  .card-header {
    padding: 15px 15px 12px;
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
  
  .card-content {
    padding: 15px;
  }
  
  .card-footer {
    padding: 12px 15px 15px;
  }
  
  .feature-list {
    grid-template-columns: 1fr;
  }
  
  .features-section {
    padding: 20px;
  }
  
  .feature-tag {
    font-size: 12px;
    padding: 6px 12px;
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
    max-width: none;
  }
  
  .features-container {
    gap: 8px;
  }
  
  .feature-tag {
    font-size: 11px;
    padding: 5px 10px;
  }
}
</style> 