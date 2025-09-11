<script setup>
import HeaderBar from "../components/farmers/HeaderBar.vue";
import FocusHero from "../components/farmers/FocusHero.vue";
import PromoServiceRow from "../components/farmers/PromoServiceRow.vue";
import ServiceCards from "../components/farmers/ServiceCards.vue";
import ProductServices from "../components/farmers/ProductServices.vue";
import Footer from "../components/farmers/Footer.vue";
</script>

<template>
  <div>
    <HeaderBar />
    <FocusHero bannerSrc="/nong.jpg" />
    <PromoServiceRow />
    <ServiceCards />
    <LifeStageServices />
    <ProductServices />
    <Footer />
  </div>
</template>

<style scoped>
/* 确保组件间无间距 */
.focus-hero {
  margin-bottom: 0;
}
.promo-wrap {
  margin-top: -1px; /* 消除可能的1px间隙 */
}
</style>
