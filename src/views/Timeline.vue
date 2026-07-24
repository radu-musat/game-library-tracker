<script setup lang="ts">
import { computed } from 'vue';
import { useRecordStore } from '@/stores/record';
import type { Product } from '@/types/product';
import { Gamepad2, Monitor, Tv, Atom, Globe } from '@lucide/vue';

const recordStore = useRecordStore();
//console.log('🔵 Component loaded');
const groupedGames = computed(() => {
  const allGames: (Product & {purchaseDate: string})[] = [];
  //console.log('📦 Store data:', recordStore.activeRecords);
  recordStore.activeRecords.forEach(group => {
    group.items.forEach(game => {
      if (game.purchaseDate) {
        allGames.push(game as Product & { purchaseDate: string});
      };
    });
  });
  //console.log('🟡 BEFORE SORT:', allGames.map(g => g.purchaseDate));
  allGames.sort((a, b) => {
    return new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime();
  });
  //console.log('🟢 AFTER SORT:', allGames.map(g => g.purchaseDate));

  const grouped: Record<string, (Product & { purchaseDate: string })[]> = {};

  allGames.forEach(game => {
  const date = new Date(game.purchaseDate);
  const key = date.toLocaleString('default', {month: 'long', year: 'numeric'});

  if (!grouped[key]) {
    grouped[key] = [];
  }

  grouped[key].push(game);
  });

  const result = Object.keys(grouped).map(monthKey => ({
    month: monthKey,
    games: grouped[monthKey]
  }));
  console.log('✅ Reached the end!');
  console.log(result);
  return result;
});

//console.log(allGames);

const getPlatformIcon = (platform: string) => {
  const map: Record<string, any> = {
    'PS5': Gamepad2,
    'Steam': Monitor,
    'Xbox': Tv,
    'Blizzard': Atom,
    'GOG': Globe
  }; 
  return map[platform] || Gamepad2;
};

</script>

<template>
  <section class="px-3 pt-6 bg-gray-100 grow">
    <h1 class="text-5xl mb-8 font-medium">Number of records: {{ recordStore.activeRecords.length }}</h1>
    
    <ul class="timeline timeline-vertical">
      <!-- Loop 1: Months -->
      <li v-for="monthGroup in groupedGames" :key="monthGroup.month">
        <!-- Timeline dot -->
        <div class="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <!-- Card for this month -->
        <div class="timeline-end">
          <div class="card bg-base-100 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.2)] transition-shadow duration-200 border border-gray-200 rounded-xl">
            <div class="card-body">
              <h2 class="text-2xl font-bold">{{ monthGroup.month }}</h2>
              <p class="text-sm text-gray-500">{{ monthGroup.games?.length || 0 }} games</p>
              
              <div class="divider"></div>
              
              <!-- Loop 2: Games in this month -->
              <div 
                v-for="game in monthGroup.games" 
                :key="game.id" 
                class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
              >
                <div class="flex items-center gap-2">
                  <component :is="getPlatformIcon(game.platform)" class="w-4 h-4 text-gray-500"/>
                  <span>{{ game.name }}</span>
                  <span class="font-semibold text-green-600">£{{ game.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss"></style>
