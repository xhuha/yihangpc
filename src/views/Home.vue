<script setup>
import HeaderBar from '../components/HeaderBar.vue'
import FocusHero from '../components/FocusHero.vue'
import PromoServiceRow from '../components/PromoServiceRow.vue'
import ServiceCards from '../components/ServiceCards.vue'
import LifeStageServices from '../components/LifeStageServices.vue'
import ProductServices from '../components/ProductServices.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
    <div>
        <HeaderBar />
        <FocusHero bannerSrc="/hero.jpg" />
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
