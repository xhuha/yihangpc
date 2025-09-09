<script setup>
const cards = [
  {
    icon: 'fa-solid fa-shield-halved',
    title: '网络支付',
    badge: 'HOT',
    desc: '线上支付安全便捷，分账结算灵活合规',
    link: '点击了解 >'
  },
  {
    icon: 'fa-solid fa-magnifying-glass',
    title: '产品查询',
    desc: '热销产品，查询更便捷',
    link: '点击了解 >'
  },
  {
    icon: 'fa-solid fa-piggy-bank',
    title: '大额存单',
    desc: '本息安全，方便灵活，收益更高！',
    link: '点击了解 >'
  },
  {
    icon: 'fa-solid fa-arrow-trend-up',
    title: '农银同行',
    desc: '同业客户的一站式，综合金融服务平台',
    link: '点击进入 >'
  }
]
</script>

<template>
  <section class="service-cards">
    <div class="container">
      <div class="cards-grid">
        <div v-for="(card, idx) in cards" :key="idx" class="card">
          <div class="card-header">
            <div class="icon-wrap">
              <i :class="card.icon"></i>
            </div>
            <span v-if="card.badge" class="badge">{{ card.badge }}</span>
          </div>
          <h3 class="title">{{ card.title }}</h3>
          <p class="desc">{{ card.desc }}</p>
          <a href="javascript:void(0)" class="link">{{ card.link }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.service-cards { 
  background: #fff; 
  padding: 24px 0;
}
.container { 
  max-width: 1200px; 
  margin: 0 auto; 
}
.cards-grid { 
  display: grid; 
  grid-template-columns: repeat(4, 1fr); 
  gap: 24px; 
}
.card { 
  background: #f8f9fa; 
  border: 1px solid #e9ecef; 
  padding: 24px 20px; 
  text-align: center;
  position: relative;
}
.card-header { 
  position: relative; 
  margin-bottom: 16px; 
}
.icon-wrap { 
  width: 64px; 
  height: 64px; 
  margin: 0 auto 12px; 
  background: #fff; 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
}
.icon-wrap i { 
  font-size: 28px; 
  color: #21b69b; 
}
.badge { 
  position: absolute; 
  top: -8px; 
  right: 8px; 
  background: #ff4757; 
  color: #fff; 
  font-size: 10px; 
  padding: 2px 6px; 
  font-weight: 700;
}
.title { 
  font-size: 18px; 
  font-weight: 700; 
  color: #333; 
  margin: 0 0 12px; 
}
.desc { 
  font-size: 14px; 
  color: #666; 
  line-height: 1.5; 
  margin: 0 0 16px; 
}
.link { 
  color: #21b69b; 
  text-decoration: none; 
  font-size: 14px; 
}
.link:hover { 
  text-decoration: underline; 
}
</style> 