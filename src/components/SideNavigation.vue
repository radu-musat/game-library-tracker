<script setup lang="ts">
import { Calendar } from '@lucide/vue';
import { House } from '@lucide/vue';
import { CirclePlus } from '@lucide/vue';
import { Timeline } from '@lucide/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRecordStore } from '@/stores/record.ts';

const route = useRoute();
const recordStore = useRecordStore();

const currentTimelineYear = computed(() => {
  return route.params.year || recordStore.defaultTimelineYear;
});
</script>

<template>
  <div class="flex relative">
    <!-- Sidebar -->
    <aside
      class="h-full w-full md:w-auto flex justify-center md:justify-start
      md:flex-col overflow-y-auto gap-2 py-2 md:py-3 px-2 bg-base-100 shadow-md"
    >
      <RouterLink :to="{ name: 'Home' }" class="btn btn-success text-white">
        <House />
      </RouterLink>
      <RouterLink :to="{ name: 'CurrentMonth' }" class="btn btn-success text-white">
        <Calendar />
      </RouterLink>
      <RouterLink
        :to="{ name: 'Timeline', params: { year: currentTimelineYear } }"
        class="btn btn-success text-white"
      >
        <Timeline />
      </RouterLink>
      <RouterLink :to="{ name: 'Create' }" class="btn btn-success text-white">
        <CirclePlus />
      </RouterLink>
    </aside>
  </div>
</template>

<style scoped></style>
