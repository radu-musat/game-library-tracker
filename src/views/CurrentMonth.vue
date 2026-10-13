<script setup lang="ts">
import TimeLine from '@/components/TimeLine.vue';
import { useRecordStore } from '@/stores/record.ts';
const recordStore = useRecordStore();
const currentDate = new Date();
const hasCurrentMonthRecord = recordStore.activeRecords.some(
  (record) =>
    new Date(record.purchaseDate).getFullYear() === currentDate.getFullYear() &&
    new Date(record.purchaseDate).getMonth() === currentDate.getMonth(),
);
</script>

<template>
  <section class="px-3 pt-6 bg-gray-100 grow">
    <h1 class="text-3xl md:text-5xl mb-4 md:mb-8 font-medium">Current Month</h1>
    <TimeLine :currentMonthOnly="true" :use-decoration="false" v-if="hasCurrentMonthRecord" />
    <p v-else>No data available for the current month</p>
  </section>
</template>

<style scoped lang="scss"></style>
