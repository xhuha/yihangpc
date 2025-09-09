<script setup>
import { ref } from 'vue'

const services = ref([
  { icon: 'fas fa-desktop', text: '网上银行' },
  { icon: 'fas fa-mobile-alt', text: '掌上银行' },
  { icon: 'fas fa-building', text: '网点' },
  { icon: 'fas fa-shield-alt', text: '安全专区' }
])

const aboutLinks = ref([
  '农业银行介绍', '投资者关系', '人才招聘',
  '新闻中心', '分支机构', '采购公告'
])



const complaintChannels = ref([
  '营业网点：在我行营业网点设置的投诉建议箱、客户意见簿，或向我行营业网点反映投诉',
  '客服电话95599：（1）直接按投诉专线进入"4915"——系统识别客户并转接人工服务；（2）按1【投诉服务】——按0【人工服务】——按8【查询与投诉】',
  '信用卡客服电话4006695599：（1）按0——按#【投诉服务】——转接人工服务；（2）按1——按#【投诉服务】——按9——按#【投诉咨询】',
  '掌上银行：登录中国农业银行掌上银行APP——点击"客服"——点击下方"更多服务，请点击咨询农众"——输入"人工"',
  '官方网站：访问中国农业银行官方网站（http://www.abchina.com.cn）——点击"在线客服"——输入"人工"',
  '微信公众号："中国农业银行云客服"微信公众号——点击"我的客服"——输入"人工"',
  '电子邮箱：95599@abchina.com.cn',
  '总行监事机构地址：北京市东城区建国门内大街69号（邮编：100005）点击查看更多投诉受理及投诉处理流程'
])

function handleServiceClick(text) {
  if (text === '网点') {
     window.location.href = '/src/pages/mapSelect.html'
  }
  // 可以添加其他服务的点击处理逻辑
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <!-- 主要内容区域 -->
      <div class="top-section">
        <div class="left-content">
          <h3 class="section-title">我们无处不在</h3>
          <p class="section-subtitle">任何一个事情您都可以享受金融便利！</p>
          
          <div class="services-grid">
            <div 
              v-for="service in services" 
              :key="service.text" 
              class="service-item"
              @click="handleServiceClick(service.text)"
              style="cursor: pointer;"
            >
              <div class="service-icon">
                <i :class="service.icon"></i>
              </div>
              <span class="service-text">{{ service.text }}</span>
            </div>
          </div>
          
          <!-- 关于农行 -->
          <div class="about-section">
            <h3 class="about-title">关于农行</h3>
            <p class="about-description">
              > 农业银行为员工"花"起变心一夏
            </p>
            <p class="about-detail">
              以前面值的消费，从了客人们，心里感觉很贴心！您在享受共同条件的支持下，上线写感。
              安静公司目标，上网专线。
            </p>
            
            <div class="links-grid">
              <div v-for="link in aboutLinks" :key="link" class="link-item">
                • {{ link }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="right-content">
          <h3 class="complaint-title">投诉受理渠道</h3>
          <ul class="complaint-list">
            <li v-for="(channel, index) in complaintChannels" :key="index" class="complaint-item">
              • {{ channel }}
            </li>
          </ul>
        </div>
      </div>
      

    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #4ecdc4;
  color: white;
  padding: 10px 0;
  font-size: 14px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 主要区域 */
.top-section {
  display: flex;
  gap: 60px;
  margin-bottom: 40px;
}

.left-content {
  flex: 1;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: white;
}

.section-subtitle {
  font-size: 14px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.service-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  font-size: 24px;
  transition: all 0.3s ease;
}

.service-icon:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.service-text {
  font-size: 14px;
  font-weight: 500;
}

.right-content {
  flex: 1.2;
}

.complaint-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
}

.complaint-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.complaint-item {
  margin-bottom: 12px;
  line-height: 1.6;
  font-size: 13px;
  opacity: 0.95;
}



.about-section {
  margin-top: 30px;
}

.about-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
}

.about-description {
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 500;
}

.about-detail {
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 25px;
  opacity: 0.9;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.link-item {
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 5px 0;
}

.link-item:hover {
  opacity: 0.8;
  text-decoration: underline;
}





/* 响应式设计 */
@media (max-width: 1024px) {
  .top-section,
  .middle-section {
    flex-direction: column;
    gap: 40px;
  }
  
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .qr-section {
    justify-content: center;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 30px 0 20px;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .service-icon {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
  
  .links-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .qr-section {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .qr-code {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .section-title,
  .complaint-title,
  .about-title {
    font-size: 18px;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .complaint-item {
    font-size: 12px;
  }
  
  .about-detail {
    font-size: 12px;
  }
}
</style>