<script setup lang="ts">
import FundsWidget from '@/components/FundsWidget.vue';
import LastPurchaseWidget from '@/components/LastPurchaseWidget.vue';
import ImportExportWidget from '@/components/ImportExportWidget.vue';
import FundSetWidget from '@/components/FundSetWidget.vue';
</script>

<template>
  <section class="px-3 py-6 bg-gray-100 grow">
    <h1 class="text-3xl md:text-5xl mb-4 md:mb-8 font-medium">Dashboard</h1>
    <FundsWidget class="mb-8" />
    <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
      <LastPurchaseWidget />
      <ImportExportWidget />
      <FundSetWidget />
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
