<script setup lang="ts">
import { computed } from 'vue';
import { useRecordStore } from '@/stores/record';
import type { Product } from '@/types/product';

type Game = (Product & { purchaseDate: string });
type AllGames = Game[];

const recordStore = useRecordStore();
const groupedGames = computed(() => {
  const allGames: AllGames  = [];
  recordStore.activeRecords.forEach((group) => {
    group.items.forEach((game) => {
      if (game.purchaseDate) {
        allGames.push(game as Product & { purchaseDate: string });
      }
    });
  });

  allGames.sort((a, b) => {
    return new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime();
  });


  const grouped: Record<string, AllGames> = {};

  allGames.forEach((game) => {
    const date = new Date(game.purchaseDate);
    const key = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    if (!grouped[key]) {
      grouped[key] = [];
    }

    grouped[key].push(game);
  });

  const result = Object.keys(grouped).map((monthKey) => ({
    month: monthKey,
    games: grouped[monthKey],
  }));

  return result;
});

//console.log(allGames);
</script>

<template>
  <section class="px-3 pt-6 bg-gray-100 grow">
    <h1 class="text-5xl mb-8 font-medium">
      Number of records: {{ recordStore.activeRecords.length }}
    </h1>

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
          <div class="card bg-base-100 shadow-md">
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
                <span>{{ game.name }}</span>
                <span>£{{ game.price }}</span>
                <span class="text-sm text-gray-500">{{ game.platform }}</span>
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
