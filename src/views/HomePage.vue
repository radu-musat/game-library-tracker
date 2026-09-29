<script setup lang="ts">
// import PurchaseRecord from '@/components/PurchaseRecord.vue'
import FundsWidget from '@/components/FundsWidget.vue';
import LastPurchaseWidget from '@/components/LastPurchaseWidget.vue';
</script>

<template>
  <section class="px-3 py-6 bg-gray-100 grow">
    <h1 class="text-3xl md:text-5xl mb-4 md:mb-8 font-medium">Dashboard</h1>
    <FundsWidget class="mb-8" />
    <div class="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
      <LastPurchaseWidget />
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
