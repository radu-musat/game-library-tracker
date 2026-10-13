<script setup lang="ts">
import TimeLine from '@/components/TimeLine.vue';

import { useRecordStore } from '@/stores/record';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const recordStore = useRecordStore();
const route = useRoute();

const years = ref<number[]>([]);
onMounted(() => {
  years.value = [
    ...new Set(recordStore.activeRecords.map((r) => new Date(r.purchaseDate).getFullYear())),
  ].sort((a, b) => b - a);
  console.log(years.value);
});
</script>

<template>
  <section class="px-3 pt-6 bg-gray-100 grow">
    <h1 class="text-3xl md:text-5xl  md:mb-4 font-medium">Records</h1>
    <template v-if="years.length">
      <div role="tablist" class="tabs tabs-border mb-4">
        <router-link
          :to="{ name: 'Timeline', params: { year: year } }"
          v-for="year in years"
          :key="year"
          role="tab"
          class="tab"
          active-class="tab-active"
        >
          {{ year }}
        </router-link>
      </div>
      <TimeLine :year="Number(route.params.year)" />
    </template>
    <p v-else>No records available</p>
  </section>
</template>

<style scoped lang="scss"></style>
