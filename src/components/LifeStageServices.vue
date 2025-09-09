<script setup>
import { ref, computed } from 'vue'

const activeTab = ref(2) // 默认激活"品质家庭"

const tabs = [
  { id: 0, name: '学生时代' },
  { id: 1, name: '职场生涯' },
  { id: 2, name: '品质家庭' },
  { id: 3, name: '养老保障' }
]

// 不同标签对应的服务卡片数据
const serviceCardsData = {
  0: [ // 学生时代
    {
      title: '留学贷款',
      desc: '最高5年150万 留学更无忧！',
      buttonText: '立即查看',
      buttonColor: '#ffa502'
    },
    {
      title: '个人结售汇',
      desc: '线上结汇，方便快捷',
      buttonText: '立即申请',
      buttonColor: '#ffa502'
    }
  ],
  1: [ // 职场生涯
    {
      title: '贵宾服务',
      desc: '机场贵宾专享增值服务',
      buttonText: '立即查看',
      buttonColor: '#ffa502'
    },
    {
      title: '助业贷款',
      desc: '最高额1000万元贷款，为您的事业加油助力！',
      buttonText: '立即申请',
      buttonColor: '#ffa502'
    }
  ],
  2: [ // 品质家庭
    {
      title: '一键缴费',
      desc: '0手续费 在线缴费更方便！',
      buttonText: '立即办理',
      buttonColor: '#ffa502'
    },
    {
      title: '网上理财',
      desc: '一站式在线理财服务平台',
      buttonText: '立即购买',
      buttonColor: '#ffa502'
    },
    {
      title: '保险保障',
      desc: '守护您和您温暖的家',
      buttonText: '立即查看',
      buttonColor: '#ffa502'
    }
  ],
  3: [ // 养老保障
    {
      title: '储蓄国债',
      desc: '稳健投资，从国债做起',
      buttonText: '立即查看',
      buttonColor: '#ffa502'
    },
    {
      title: '基金定投',
      desc: '点滴聚财，成就梦想',
      buttonText: '立即查看',
      buttonColor: '#ffa502'
    },
    {
      title: '健康保险',
      desc: '品质养老，无忧生活',
      buttonText: '立即查看',
      buttonColor: '#ffa502'
    }
  ]
}

// 计算当前激活标签对应的服务卡片
const currentServiceCards = computed(() => {
  return serviceCardsData[activeTab.value] || serviceCardsData[2]
})

const setActiveTab = (tabId) => {
  activeTab.value = tabId
}
</script>

<template>
  <section class="life-stage-services">
    <!-- 标语区域 -->
    <div class="slogan-section">
      <h2 class="slogan">您的每段旅程，我们全心陪伴</h2>
    </div>
    
    <!-- 标签页导航 -->
    <div class="tabs-section">
      <div class="tabs-container">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['tab-button', { active: activeTab === tab.id }]"
          :style="{ backgroundColor: activeTab === tab.id ? '#ffa502' : '#1dd1a1' }"
          @click="setActiveTab(tab.id)"
        >
          {{ tab.name }}
          <!-- 三角箭头 -->
          <div v-if="activeTab === tab.id" class="arrow-down"></div>
        </button>
      </div>
    </div>
    
    <!-- 背景图片和服务卡片区域 -->
    <div class="background-section">
      <div class="service-container">
        <div class="service-cards-grid">
          <div v-for="(card, index) in currentServiceCards" :key="index" class="service-card">
            <h3 class="card-title">{{ card.title }}</h3>
            <p class="card-desc">{{ card.desc }}</p>
            <button class="card-button" :style="{ backgroundColor: card.buttonColor }">
              {{ card.buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.life-stage-services {
  position: relative;
}

/* 标语区域 */
.slogan-section {
  text-align: center;
  padding: 40px 0 20px;
  background: #f8f9fa;
}

.slogan {
  font-size: 24px;
  color: #999;
  font-weight: 300;
  margin: 0;
  letter-spacing: 2px;
}

/* 标签页导航 */
.tabs-section {
  background: #fff;
  position: relative;
  z-index: 2;
}

.tabs-container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.tab-button {
  flex: 1;
  padding: 18px 20px;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  transition: opacity 0.3s ease;
}

.tab-button:not(.active) {
  opacity: 0.8;
}

.tab-button:hover {
  opacity: 1;
}

/* 三角箭头 */
.arrow-down {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid #ffa502;
  z-index: 3;
}

/* 背景图片区域 */
.background-section {
  background-image: url('/yh1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 350px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 服务卡片区域 */
.service-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

.service-cards-grid {
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: nowrap;
}

.service-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  padding: 25px 20px;
  text-align: center;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  height: 160px;
  flex: 1;
  max-width: 300px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.card-desc {
  font-size: 13px;
  color: #666;
  margin: 10px 0;
  line-height: 1.4;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-button {
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.card-button:hover {
  opacity: 0.9;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .slogan {
    font-size: 20px;
  }
  
  .tabs-container {
    padding: 0 15px;
  }
  
  .tab-button {
    font-size: 14px;
    padding: 15px 15px;
  }
  
  .service-cards-grid {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .service-card {
    width: 100%;
    max-width: 350px;
  }
  
  .service-container {
    padding: 0 15px;
  }
  
  .background-section {
    height: auto;
    min-height: 300px;
    padding: 30px 0;
  }
}

@media (max-width: 480px) {
  .slogan {
    font-size: 18px;
  }
  
  .tab-button {
    font-size: 12px;
    padding: 12px 8px;
  }
}
</style> 