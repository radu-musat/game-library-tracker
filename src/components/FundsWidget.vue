<script setup lang="ts">
import { useFundsStore } from '@/stores/funds.ts';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const fundsStore = useFundsStore();
const {
  monthlyTotal,
  totalSpent,
  monthlyRemaining,
  monthlyRemainingPercentage,
  monthlySpentPercentage,
} = storeToRefs(fundsStore);

const dateRange = computed(() => {
  const now = new Date();
  const currentMonth = now.toLocaleDateString('default', { month: 'short' });
  const nextMonthDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const nextMonth = nextMonthDate.toLocaleString('default', { month: 'short' });
  return `${currentMonth} 1st - ${nextMonth} 1st`;
});
</script>

<template>
  <div class="stats stats-vertical sm:stats-horizontal shadow bg-base-100">
    <div class="stat">
      <div class="stat-title">This Month's Budget</div>
      <div class="stat-value">{{ monthlyTotal }}</div>
      <div class="stat-desc">{{ dateRange }}</div>
    </div>

    <div class="stat">
      <div class="stat-title">Remaining Funds</div>
      <div class="stat-value">{{ monthlyRemaining }}</div>
      <div
        class="stat-desc"
        :class="monthlyRemainingPercentage < 0 ? 'text-red-500' : 'text-success'"
      >
        {{ monthlyRemainingPercentage < 0 ? '↘︎' : '↗︎' }}
        {{ monthlyRemainingPercentage }}%
        {{ monthlyRemainingPercentage < 0 ? 'OVERSPENDING!' : 'remaining' }}
      </div>
    </div>

    <div class="stat">
      <div class="stat-title">Total Funds Spent</div>
      <div class="stat-value">{{ totalSpent }}</div>
      <div class="stat-desc">
        <div :class="monthlySpentPercentage <= 100 ? 'text-warning' : 'text-red-500'">
          ↗︎
          {{ monthlySpentPercentage }}%
          {{ monthlySpentPercentage <= 100 ? 'spent' : 'OVERSPENT!' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
