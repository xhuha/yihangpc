<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentMenuIndex: { type: Number, default: 0 }
})

// 所有菜单数据 - 根据真实截图数据
const allMenuData = {
  0: [ // 个人服务
    { icon: 'fa-solid fa-chart-line', title: '投资理财', items: ['理财', '基金'] },
    { icon: 'fa-solid fa-credit-card', title: '信用卡', items: ['我要办卡', '刷卡优惠'] },
    { icon: 'fa-solid fa-globe', title: '个人电子银行', items: ['网上银行', '掌上银行'] },
    { icon: 'fa-solid fa-shield-halved', title: '网络支付', items: ['支付产品', '结算产品'] },
    { icon: 'fa-solid fa-piggy-bank', title: '存款', items: [] },
    { icon: 'fa-solid fa-id-card', title: '借记卡', items: [] },
    { icon: 'fa-solid fa-yen-sign', title: '贷款', items: [] },
    { icon: 'fa-solid fa-file-invoice-dollar', title: '支付结算', items: [] },
    { icon: 'fa-solid fa-graduation-cap', title: '留学金融', items: [] },
    { icon: 'fa-solid fa-scroll', title: '章程协议', items: [] },
    { icon: 'fa-solid fa-gem', title: '贵宾服务', items: [] },
    { icon: 'fa-solid fa-arrows-rotate', title: '外汇', items: [] }
  ],
  1: [ // 企业服务
    { icon: 'fa-solid fa-home', title: '基本服务', items: ['存款服务', '支付结算', '交易业务', '银行卡'] },
    { icon: 'fa-solid fa-desktop', title: '企业电子银行', items: ['服务与功能', '消息服务', '安全专区', '智付通'] },
    { icon: 'fa-solid fa-chart-bar', title: '托管业务', items: ['业务综述', '托管产品', '业务动态', '信息披露'] },
    { icon: 'fa-solid fa-chart-line', title: '金融市场', items: ['业务简介', '货币市场业务', '贵金属业务'] },
    { icon: 'fa-solid fa-shield', title: '纳税授权', items: [] },
    { icon: 'fa-solid fa-money-bill', title: '现金管理', items: [] },
    { icon: 'fa-solid fa-chart-area', title: '投资理财', items: [] },
    { icon: 'fa-solid fa-building', title: '投资银行', items: [] },
    { icon: 'fa-solid fa-handshake', title: '金融同业', items: [] },
    { icon: 'fa-solid fa-file-contract', title: '资产处置', items: [] },
    { icon: 'fa-solid fa-globe', title: '国际业务', items: [] },
    { icon: 'fa-solid fa-piggy-bank', title: '养老金', items: [] }
  ],
  2: [ // 三农服务
    { icon: 'fa-solid fa-seedling', title: '三农个人产品', items: ['惠农e贷', '金穗惠农卡', '惠农信用卡', '农户小额贷款', '农村个人生产经营贷款', '富民贷'] },
    { icon: 'fa-solid fa-tractor', title: '三农对公产品', items: ['园区贷', '工业贷', '农村城镇化贷款', '季节性收购贷款', '养老机构贷款', '县域商品流通市场建设贷款'] },
    { icon: 'fa-solid fa-wheat-awn', title: '三农其他产品', items: ['农业生产托管贷', '金穗农担贷'] },
    { icon: 'fa-solid fa-chart-line', title: '农行数字乡村平台', items: ['"三资"管理', '智慧畜牧', '乡镇治理', '客户贷款推荐'] }
  ],
  3: [ // 小微企业服务
    { icon: 'fa-solid fa-building', title: '全国通用产品', items: ['微捷贷', '快捷贷', '链捷贷'] },
    { icon: 'fa-solid fa-chart-line', title: '', items: ['简式贷', '科创贷', '账户e贷'] },
    { icon: 'fa-solid fa-star', title: '分行特色产品', items: ['小微网贷（浙江）', '苏科贷（江苏）', '微捷贷退税e贷（山东）'] },
    { icon: 'fa-solid fa-money-bill', title: '我要贷款', items: [] },
    { icon: 'fa-solid fa-user-plus', title: '我要开户', items: [] },
    { icon: 'fa-solid fa-file-signature', title: '我要签约', items: [] },
    { icon: 'fa-solid fa-shield', title: '纳税授权', items: [] },
    { icon: 'fa-solid fa-chart-bar', title: '财富管理', items: [] },
    { icon: 'fa-solid fa-cog', title: '结算服务', items: [] }
  ],
  4: [ // 关于农行
    { icon: 'fa-solid fa-landmark', title: '农行风貌', items: ['农行简介', '农行历程', '年度奖项'] },
    { icon: 'fa-solid fa-chart-line', title: '投资者关系', items: ['公司公告', '公司治理', '业绩报告'] },
    { icon: 'fa-solid fa-leaf', title: '农行ESG', items: ['可持续发展报告', 'ESG动态', '公司治理'] },
    { icon: 'fa-solid fa-seedling', title: '绿色金融专题', items: ['绿色金融报告', '绿色金融信息披露', '绿色金融动态'] },
    { icon: 'fa-solid fa-newspaper', title: '农行资讯', items: [] },
    { icon: 'fa-solid fa-users', title: '人才招聘', items: [] },
    { icon: 'fa-solid fa-phone', title: '联系我们', items: [] }
  ]
}

// 根据当前菜单索引获取对应数据 - 使用computed使其响应式
const sections = computed(() => allMenuData[props.currentMenuIndex] || allMenuData[0])
</script>

<template>
  <div class="mega">
    <div class="content-area">
      <div v-for="(s, i) in sections" :key="i" class="service-group">
        <div class="service-header">
          <i :class="s.icon" v-if="s.icon"></i>
          <span class="service-title" v-if="s.title">{{ s.title }}</span>
        </div>
        <ul v-if="s.items && s.items.length" class="service-items">
          <li v-for="(item, j) in s.items" :key="j">
            <span class="item-text">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mega {
  width: 100%;
  background: #fff;
  border: 1px solid #e6e6e6;
  box-shadow: 0 8px 24px rgba(0,0,0,.06);
  min-height: 268px;
  padding: 20px;
  box-sizing: border-box;
}

.content-area {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 24px;
  justify-content: start;
  align-items: start;
}

.service-group {
  min-width: 0; /* 允许网格项收缩 */
  padding: 0 8px;
}

.service-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding-bottom: 6px;
}

/* 图标样式 */
.service-group .service-header i {
  font-size: 18px;
  color: #21b69b;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

/* 第一行（前4个）服务组：黄色图标 */
.service-group:nth-child(-n+4) .service-header i {
  color: #f5a623 !important;
}

.service-title {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  cursor: pointer;
  display: inline-block;
  border-bottom: 1px solid transparent;
  padding-bottom: 2px;
  transition: border-color 0.2s ease;
}

/* 标题悬停效果 */
.service-header:hover .service-title {
  border-bottom-color: #21b69b;
}

.service-items {
  list-style: none;
  padding: 0;
  margin: 0;
  padding-left: 30px; /* 与图标+间距对齐 */
}

.service-items li {
  line-height: 22px;
  margin-bottom: 1px;
}

.item-text {
  color: #666;
  font-size: 12px;
  cursor: pointer;
  display: inline-block;
  border-bottom: 1px solid transparent;
  padding-bottom: 1px;
  transition: color 0.2s ease, border-color 0.2s ease;
}

/* 子项悬停效果 */
.service-items li:hover .item-text {
  color: #21b69b;
  border-bottom-color: #21b69b;
}
</style> 