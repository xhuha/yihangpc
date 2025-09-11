<script setup>
import { ref } from 'vue'

// 服务中心项目
const serviceCenterItems = ref([
  { icon: 'fas fa-sync-alt', text: '证书下载' },
  { icon: 'fas fa-key', text: '如何开通网银' },
  { icon: 'fas fa-credit-card', text: 'K宝首次登录' },
  { icon: 'fas fa-file-alt', text: 'K令首次登录' },
  { icon: 'fas fa-question-circle', text: '常见问题' }
])

// 底部链接
const footerLinks = ref([
  '网站声明', '网站地图', '联系我们'
])

function handleServiceClick(text) {
  // 可以添加服务点击处理逻辑
  console.log('点击了服务:', text)
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <!-- 服务中心区域 -->
      <div class="service-center">
        <div class="service-center-title">
          <span>服务中心</span>
        </div>
        <div class="service-items">
          <div 
            v-for="item in serviceCenterItems" 
            :key="item.text" 
            class="service-item"
            @click="handleServiceClick(item.text)"
          >
            <div class="service-icon">
              <i :class="item.icon"></i>
            </div>
            <span class="service-text">{{ item.text }}</span>
          </div>
        </div>
      </div>
      
      <!-- 底部信息 -->
      <div class="footer-info">
        <div class="footer-links">
          <span 
            v-for="(link, index) in footerLinks" 
            :key="link"
            class="footer-link"
          >
            {{ link }}
            <span v-if="index < footerLinks.length - 1" class="separator"> | </span>
          </span>
          <span class="separator"> | </span>
          <span class="hotline">客服热线: 95599</span>
        </div>
        <div class="copyright">
          <span class="copyright-text">中国农业银行版权所有</span>
          <span class="separator"> | </span>
          <span class="icp-number">京ICP备05049539</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: white;
  color: #333;
  padding: 0;
  font-size: 14px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 服务中心区域 */
.service-center {
  background: #f5f5f5;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
}

.service-center-title {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}

.service-center-title::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #ccc;
  z-index: 1;
}

.service-center-title span {
  background: #f5f5f5;
  padding: 0 20px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  position: relative;
  z-index: 2;
}

.service-items {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 10px;
}

.service-item:hover {
  transform: translateY(-2px);
}

.service-icon {
  width: 50px;
  height: 50px;
  background: #4ecdc4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  font-size: 20px;
  color: white;
  transition: all 0.3s ease;
}

.service-item:hover .service-icon {
  background: #45b7b8;
  transform: scale(1.05);
}

.service-text {
  font-size: 12px;
  font-weight: 500;
  color: #333;
  line-height: 1.2;
}

/* 底部信息 */
.footer-info {
  background: white;
  padding: 15px 0;
  text-align: center;
}

.footer-links {
  margin-bottom: 8px;
  font-size: 12px;
  color: #666;
}

.footer-link {
  color: #666;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #333;
  text-decoration: underline;
}

.separator {
  color: #999;
  margin: 0 4px;
}

.hotline {
  color: #666;
  font-size: 12px;
}

.copyright {
  font-size: 12px;
  color: #999;
}

.copyright-text {
  color: #999;
}

.icp-number {
  color: #ff6b35;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .service-items {
    gap: 20px;
  }
  
  .service-icon {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
  
  .service-text {
    font-size: 11px;
  }
  
  .footer-links,
  .copyright {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .service-items {
    gap: 15px;
  }
  
  .service-icon {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .service-text {
    font-size: 10px;
  }
  
  .footer-links,
  .copyright {
    font-size: 10px;
  }
  
  .service-center-title span {
    font-size: 14px;
    padding: 0 15px;
  }
}
</style>