<script setup lang="ts">
import {
  Atom,
  CircleCheck,
  Gamepad2,
  Globe,
  Monitor,
  Tv,
  StarCheck,
  StarMinus,
  type LucideIcon,
} from '@lucide/vue';
import type { Product } from '@/types/product.ts';
import { useRecordStore } from '@/stores/record.ts';
import { computed } from 'vue';

interface Props {
  year?: number;
  useDecoration?: boolean;
  currentMonthOnly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  year: Number(new Date().getFullYear()),
  useDecoration: true,
  currentMonthOnly: false,
});

type TimelineGame = Product & { purchaseDate: string };
type TimelineGames = TimelineGame[];

const recordStore = useRecordStore();
const groupedGames = computed(() => {
  const targetRecords = recordStore.activeRecords.filter((record) => {
    if (!props.currentMonthOnly) return true;

    const recordDate = new Date(record.purchaseDate);
    const now = new Date();
    return (
      recordDate.getMonth() === now.getMonth() && recordDate.getFullYear() === now.getFullYear()
    );
  });

  const allGames: TimelineGames = targetRecords.flatMap((record) => {
    return record.items.map((game) => {
      return {
        ...game,
        purchaseDate: record.purchaseDate,
      };
    });
  });

  allGames.sort((a, b) => {
    return new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime();
  });

  const grouped: Record<string, Record<string, TimelineGames>> = {};

  allGames.forEach((game) => {
    const date = new Date(game.purchaseDate);
    const matchesYear = props.currentMonthOnly || date.getFullYear() === Number(props.year);
    if (matchesYear) {
      const monthKey = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      const dayKey = date.toLocaleString('default', {
        month: 'long',
        day: '2-digit',
      });

      if (!grouped[monthKey]) {
        grouped[monthKey] = {};
      }

      if (!grouped[monthKey][dayKey]) {
        grouped[monthKey][dayKey] = [];
      }

      grouped[monthKey][dayKey].push(game);
    }
  });

  return Object.entries(grouped).map(([monthKey, daysObj]) => ({
    year: Number(props.year),
    month: monthKey,
    days: Object.entries(daysObj).map(([dayKey, gamesList]) => ({
      date: dayKey,
      games: gamesList,
    })),
  }));
});

const getPlatformIcon = (platform: string) => {
  const map: Record<string, LucideIcon> = {
    PS5: Gamepad2,
    Steam: Monitor,
    Xbox: Tv,
    Blizzard: Atom,
    GOG: Globe,
  };
  return map[platform] || Gamepad2;
};
</script>

<template>
  <ul class="flex flex-col gap-4">
    <template v-for="(monthGroup, i) in groupedGames" :key="i">
      <!-- Loop 1: Months -->
      <li
        class="md:grid gap-4 w-full items-start"
        :class="[useDecoration ? 'grid-cols-[auto_1fr]' : 'grid-cols-[auto]']"
      >
        <!-- Column 1: Timeline dot / checkmark -->
        <div
          class="hidden md:flex md:flex-col justify-start items-center h-full"
          v-if="useDecoration"
        >
          <CircleCheck />
          <hr
            v-if="groupedGames.length > 1"
            class="w-1 grow bg-gray-300 border-0 relative"
            :class="[
              monthGroup === groupedGames.at(-1)
                ? ''
                : `after:content-[''] after:absolute after:w-full after:h-4 after:-bottom-4 after:bg-gray-300 overflow-visible`,
            ]"
          />
        </div>

        <!-- Column 2: Card taking the rest of the screen -->
        <div class="w-full" :class="[i === groupedGames.length - 1 ? 'mb-4' : '']">
          <div
            class="card bg-base-100 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.2)] transition-shadow duration-200 border border-gray-200 rounded-xl"
          >
            <div class="card-body">
              <h2 class="text-4xl font-bold">{{ monthGroup.month }}</h2>
              <div v-for="(days, j) in monthGroup.days" :key="j">
                <div class="divider" v-if="j !== 0"></div>
                <h3 class="text-lg">{{ days.date }}</h3>
                <p class="text-sm text-gray-500">{{ days.games.length || 0 }} games</p>
                <div
                  v-for="game in days.games"
                  :key="game.id"
                  class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                >
                  <div class="flex items-center gap-2">
                    <component :is="getPlatformIcon(game.platform)" class="w-4 h-4 text-gray-500" />
                    <span>{{ game.name }}</span>
                    <span class="font-semibold text-green-600">£{{ game.price }}</span>

                    <span class="font-semibold text-gray-500">
                      - purchased on: {{ game.purchaseDate }}
                    </span>
                    <span class="font-semibold text-gray-500 flex gap-2">
                      - main quest
                      <StarCheck  v-if="game.isMainQuest" class="text-green-500"/>
                      <StarMinus  v-else class="text-red-500"/>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </template>
  </ul>
</template>

<style scoped></style>
