<script setup>
const cards = [
  {
    icon: "fa-solid fa-shield-halved",
    title: "农户小额贷款",
    desc: "农户小额贷款是农业银行向农户发放的用于满足其农业生产资金需求的贷款。",
    link: "点击了解 >",
  },
  {
    icon: "fa-solid fa-magnifying-glass",
    title: "智付通",
    desc: "企业版智付通是农业银行为企业客户提供的一种电子支付解决方案。",
    link: "点击了解 >",
  },
  {
    icon: "fa-solid fa-piggy-bank",
    title: "农村城镇化贷款",
    desc: "农村城镇化贷款是农业银行向农村城镇化建设提供的一种贷款。",
    link: "点击了解 >",
  }
];
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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