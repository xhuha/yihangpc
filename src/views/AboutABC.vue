<script setup>
import { ref, onMounted } from 'vue'
import HeaderBar from '../components/HeaderBar.vue'
import Footer from '../components/Footer.vue'

const newsData = ref([
  { title: '中国农业银行2024年第一季度报告', date: '2024-04-26' },
  { title: '中国农业银行2023年年度报告', date: '2024-03-28' },
  { title: '中国农业银行关于2023年年度业绩的公告', date: '2024-03-27' },
  { title: '中国农业银行荣获多项绿色金融奖项', date: '2024-03-15' },
  { title: '中国农业银行成功发行绿色金融债券', date: '2024-02-20' }
])

const businessData = ref([
  { icon: 'fas fa-landmark', title: '公司业务', description: '为企业客户提供全面的金融解决方案' },
  { icon: 'fas fa-user-tie', title: '个人业务', description: '为个人客户提供多样化的金融产品和服务' },
  { icon: 'fas fa-seedling', title: '三农业务', description: '支持农业、农村和农民的发展' },
  { icon: 'fas fa-hand-holding-usd', title: '金融市场业务', description: '提供专业的金融市场交易和投资服务' },
  { icon: 'fas fa-credit-card', title: '银行卡业务', description: '发行和管理各类银行卡产品' },
  { icon: 'fas fa-mobile-alt', title: '电子银行业务', description: '提供便捷的网上银行、手机银行等服务' }
])

// 当前激活的菜单项
const activeMenuItem = ref('abc-intro')

// 菜单项点击处理函数
const handleMenuItemClick = (itemId) => {
  activeMenuItem.value = itemId
  // 滚动到内容顶部
  const contentElement = document.querySelector('.content')
  if (contentElement) {
    contentElement.scrollTop = 0
  }
}

// 发展历程数据
const historyData = ref([
  { year: '1951年', event: '中国农业银行成立，是新中国成立的第一家国有商业银行' },
  { year: '1979年', event: '恢复设立中国农业银行，成为国务院直属机构' },
  { year: '1994年', event: '开始商业化改革，逐步转变为现代商业银行' },
  { year: '2007年', event: '完成股份制改革，成立中国农业银行股份有限公司' },
  { year: '2010年', event: '在上海证券交易所和香港联合交易所挂牌上市' },
  { year: '2020年', event: '资产规模突破27万亿元，继续保持全球大型银行前列' }
])

onMounted(() => {
  // 页面加载完成后的初始化操作
})
</script>

<template>
  <div class="about-container">
    <HeaderBar />
    
    <!-- 横幅区域 -->
    <div class="banner">
      <div class="banner-inner">
        <div class="breadcrumb">
          <a href="/">首页</a> &gt; <span>关于农行</span>
        </div>
        <h1 class="banner-title">关于农行</h1>
      </div>
    </div>
    
    <!-- 主要内容区域 -->
    <div class="main-content">
      <div class="container">
        <!-- 左侧导航 -->
        <div class="sidebar">
          <div class="sidebar-title">关于农行</div>
          <ul class="sidebar-menu">
            <li class="menu-item" :class="{ active: activeMenuItem === 'abc-intro' }">
              <a href="#" class="menu-link" @click.prevent="handleMenuItemClick('abc-intro')">农行简介</a>
            </li>
            <li class="menu-item" :class="{ active: activeMenuItem === 'history' }">
              <a href="#" class="menu-link" @click.prevent="handleMenuItemClick('history')">发展历程</a>
            </li>
            <li class="menu-item" :class="{ active: activeMenuItem === 'culture' }">
              <a href="#" class="menu-link" @click.prevent="handleMenuItemClick('culture')">企业文化</a>
            </li>
            <li class="menu-item" :class="{ active: activeMenuItem === 'team' }">
              <a href="#" class="menu-link" @click.prevent="handleMenuItemClick('team')">管理团队</a>
            </li>
            <li class="menu-item" :class="{ active: activeMenuItem === 'investors' }">
              <a href="#" class="menu-link" @click.prevent="handleMenuItemClick('investors')">投资者关系</a>
            </li>
            <li class="menu-item" :class="{ active: activeMenuItem === 'social' }">
              <a href="#" class="menu-link" @click.prevent="handleMenuItemClick('social')">社会责任</a>
            </li>
            <li class="menu-item" :class="{ active: activeMenuItem === 'news' }">
              <a href="#" class="menu-link" @click.prevent="handleMenuItemClick('news')">新闻中心</a>
            </li>
            <li class="menu-item" :class="{ active: activeMenuItem === 'branches' }">
              <a href="#" class="menu-link" @click.prevent="handleMenuItemClick('branches')">分支机构</a>
            </li>
          </ul>
        </div>
        
        <!-- 右侧内容 -->
        <div class="content">
          <!-- 农行简介 -->
          <div v-if="activeMenuItem === 'abc-intro'" class="section">
            <h2 class="section-title">中国农业银行简介</h2>
            <div class="section-content">
              <p class="intro-text">
                中国农业银行（Agricultural Bank of China，简称ABC）是中国大型国有控股商业银行，成立于1951年，总部位于北京。作为中国四大银行之一，农业银行致力于为广大客户提供优质、高效、便捷的金融服务。
              </p>
              <div class="stats">
                <div class="stat-item">
                  <span class="stat-number">32,000+</span>
                  <span class="stat-text">境内分支机构</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">4.3亿+</span>
                  <span class="stat-text">个人客户</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">1.6亿+</span>
                  <span class="stat-text">移动银行用户</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">全球500强</span>
                  <span class="stat-text">世界排名前列</span>
                </div>
              </div>
              <div class="bank-photo">
                <img src="/yh1.png" alt="中国农业银行总部大楼">
                <p class="photo-caption">中国农业银行总部大楼</p>
              </div>
            </div>
          </div>
          
          <!-- 发展历程 -->
          <div v-if="activeMenuItem === 'history'" class="section">
            <h2 class="section-title">发展历程</h2>
            <div class="section-content">
              <div class="timeline">
                <div v-for="(item, index) in historyData" :key="index" class="timeline-item">
                  <div class="timeline-year">{{ item.year }}</div>
                  <div class="timeline-event">{{ item.event }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 企业文化 -->
          <div v-if="activeMenuItem === 'culture'" class="section">
            <h2 class="section-title">企业文化</h2>
            <div class="section-content">
              <div class="culture-section">
                <h3 class="culture-title">企业使命</h3>
                <p>面向三农，服务城乡，回报股东，成就员工</p>
              </div>
              <div class="culture-section">
                <h3 class="culture-title">企业愿景</h3>
                <p>建设国际一流商业银行集团</p>
              </div>
              <div class="culture-section">
                <h3 class="culture-title">核心价值观</h3>
                <p>诚信立业，稳健行远</p>
              </div>
              <div class="culture-section">
                <h3 class="culture-title">经营理念</h3>
                <p>以市场为导向，以客户为中心，以效益为目标</p>
              </div>
            </div>
          </div>
          
          <!-- 管理团队 -->
          <div v-if="activeMenuItem === 'team'" class="section">
            <h2 class="section-title">管理团队</h2>
            <div class="section-content">
              <div class="team-grid">
                <div class="team-member">
                  <div class="team-photo">
                    <img src="/yh2.png" alt="团队成员">
                  </div>
                  <div class="team-info">
                    <h3 class="team-name">言若城</h3>
                    <p class="team-position">党委书记、董事长</p>
                  </div>
                </div>
                <div class="team-member">
                  <div class="team-photo">
                    <img src="/yh2.png" alt="团队成员">
                  </div>
                  <div class="team-info">
                    <h3 class="team-name">李四</h3>
                    <p class="team-position">党委副书记、行长</p>
                  </div>
                </div>
                <div class="team-member">
                  <div class="team-photo">
                    <img src="/yh2.png" alt="团队成员">
                  </div>
                  <div class="team-info">
                    <h3 class="team-name">王五</h3>
                    <p class="team-position">党委委员、副行长</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 投资者关系 -->
          <div v-if="activeMenuItem === 'investors'" class="section">
            <h2 class="section-title">投资者关系</h2>
            <div class="section-content">
              <p>中国农业银行高度重视投资者关系管理，致力于与投资者建立透明、开放、互信的沟通机制。</p>
              <div class="investor-section">
                <h3 class="investor-title">财务报告</h3>
                <ul class="investor-list">
                  <li><a href="#">2024年第一季度报告</a></li>
                  <li><a href="#">2023年年度报告</a></li>
                  <li><a href="#">2023年第三季度报告</a></li>
                </ul>
              </div>
              <div class="investor-section">
                <h3 class="investor-title">股价信息</h3>
                <p>A股代码：601288<br>港股代码：01288</p>
              </div>
            </div>
          </div>
          
          <!-- 社会责任 -->
          <div v-if="activeMenuItem === 'social'" class="section">
            <h2 class="section-title">社会责任</h2>
            <div class="section-content">
              <p>中国农业银行积极履行社会责任，致力于促进经济、社会和环境的可持续发展。</p>
              <div class="social-areas">
                <div class="social-area">
                  <h3>乡村振兴</h3>
                  <p>加大对"三农"的金融支持力度，助力乡村振兴战略实施</p>
                </div>
                <div class="social-area">
                  <h3>绿色金融</h3>
                  <p>发展绿色信贷，支持绿色产业，推动生态文明建设</p>
                </div>
                <div class="social-area">
                  <h3>金融普惠</h3>
                  <p>提供便捷的金融服务，助力小微企业发展，促进金融普惠</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 新闻中心 -->
          <div v-if="activeMenuItem === 'news'" class="section">
            <h2 class="section-title">新闻中心</h2>
            <div class="section-content">
              <div class="news-list">
                <div v-for="news in newsData" :key="news.title" class="news-item">
                  <a href="#" class="news-link">{{ news.title }}</a>
                  <span class="news-date">{{ news.date }}</span>
                </div>
              </div>
              <a href="#" class="more-link">查看更多 &gt;</a>
            </div>
          </div>
          
          <!-- 分支机构 -->
          <div v-if="activeMenuItem === 'branches'" class="section">
            <h2 class="section-title">分支机构</h2>
            <div class="section-content">
              <p>中国农业银行拥有广泛的分支机构网络，覆盖全国城乡各地。</p>
              <div class="branches-map">
                <img src="/yh3.png" alt="分支机构分布图">
                <p class="map-caption">中国农业银行分支机构分布图</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<style scoped>
.about-container { min-height: 100vh; display: flex; flex-direction: column; }

/* 横幅样式 */
.banner {
  background: #f5f5f5;
  padding: 40px 0;
  border-bottom: 1px solid #e0e0e0;
}

.banner-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.breadcrumb {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.breadcrumb a {
  color: #666;
  text-decoration: none;
}

.breadcrumb a:hover {
  color: #21b69b;
}

.banner-title {
  font-size: 36px;
  color: #333;
  margin: 0;
}

/* 主要内容样式 */
.main-content {
  flex: 1;
  background: #fff;
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 40px;
}

/* 侧边栏样式 */
.sidebar {
  width: 240px;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  padding: 15px 20px;
  background: #f5f5f5;
  border-left: 4px solid #21b69b;
  margin-bottom: 0;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #e0e0e0;
  border-top: none;
}

.menu-item {
  border-bottom: 1px solid #e0e0e0;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-link {
  display: block;
  padding: 15px 20px;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
}

.menu-link:hover {
  background: #f5f5f5;
  color: #21b69b;
}

.menu-item.active .menu-link {
  background: #21b69b;
  color: #fff;
}

/* 内容区域样式 */
.content {
  flex: 1;
  max-height: 80vh;
  overflow-y: auto;
}

.section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #21b69b;
}

.section-content {
  font-size: 16px;
  line-height: 1.8;
  color: #666;
}

.intro-text {
  margin-bottom: 30px;
}

/* 统计数据样式 */
.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

.stat-item {
  flex: 1;
  min-width: 200px;
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-number {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: #21b69b;
  margin-bottom: 10px;
}

.stat-text {
  font-size: 14px;
  color: #666;
}

/* 图片样式 */
.bank-photo, .branches-map {
  text-align: center;
  margin-top: 30px;
}

.bank-photo img, .branches-map img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.photo-caption, .map-caption {
  margin-top: 10px;
  font-size: 14px;
  color: #999;
}

/* 业务领域样式 */
.business-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.business-item {
  padding: 25px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.business-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.business-icon {
  font-size: 36px;
  color: #21b69b;
  margin-bottom: 15px;
}

.business-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.business-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

/* 公告列表样式 */
.news-list {
  border: 1px solid #e0e0e0;
}

.news-item {
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;
}

.news-item:last-child {
  border-bottom: none;
}

.news-item:hover {
  background: #f5f5f5;
}

.news-link {
  color: #333;
  text-decoration: none;
  flex: 1;
  margin-right: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.news-link:hover {
  color: #21b69b;
}

.news-date {
  font-size: 14px;
  color: #999;
  white-space: nowrap;
}

.more-link {
  display: inline-block;
  margin-top: 20px;
  color: #21b69b;
  text-decoration: none;
}

.more-link:hover {
  text-decoration: underline;
}

/* 发展历程样式 */
.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #21b69b;
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -30px;
  top: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #21b69b;
}

.timeline-year {
  font-weight: 600;
  color: #21b69b;
  margin-bottom: 5px;
}

/* 企业文化样式 */
.culture-section {
  margin-bottom: 25px;
}

.culture-title {
  color: #333;
  margin-bottom: 10px;
}

/* 管理团队样式 */
.team-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.team-member {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  width: calc(50% - 10px);
}

.team-photo {
  margin-right: 20px;
}

.team-photo img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.team-name {
  margin: 0 0 5px 0;
  color: #333;
}

.team-position {
  margin: 0;
  color: #666;
  font-size: 14px;
}

/* 投资者关系样式 */
.investor-section {
  margin-bottom: 25px;
}

.investor-title {
  color: #333;
  margin-bottom: 10px;
}

.investor-list {
  padding-left: 20px;
  margin: 0;
}

.investor-list li {
  margin-bottom: 8px;
}

.investor-list a {
  color: #333;
  text-decoration: none;
}

.investor-list a:hover {
  color: #21b69b;
}

/* 社会责任样式 */
.social-areas {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.social-area {
  flex: 1;
  min-width: 250px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.social-area h3 {
  color: #21b69b;
  margin-bottom: 10px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 20px;
  }
  
  .sidebar {
    width: 100%;
  }
  
  .stats {
    flex-direction: column;
  }
  
  .stat-item {
    min-width: auto;
  }
  
  .team-member {
    width: 100%;
  }
  
  .social-areas {
    flex-direction: column;
  }
}
</style>