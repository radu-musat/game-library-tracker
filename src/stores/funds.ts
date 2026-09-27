import { defineStore } from 'pinia';
import type { Funds } from '@/types/funds.ts';

export const useFundsStore = defineStore('funds', {
  state: (): Funds => ({
    monthlyTotal: 0,
    totalSpent: 0,
  }),
  getters: {
    monthlyRemaining: (state) => state.monthlyTotal - state.totalSpent,
    monthlyRemainingPercentage: (state) => {
      if (state.monthlyTotal === 0) {
        if (state.totalSpent > 0) return -100;
        return 0;
      }
      const remaining = state.monthlyTotal - state.totalSpent;
      return Math.round((remaining / state.monthlyTotal) * 100);
    },

    monthlySpentPercentage: (state) => {
      console.log(state.monthlyTotal);
      if (state.monthlyTotal === 0) {
        if (state.totalSpent > 0) return 100;
        return 0;
      }
      return Math.round((state.totalSpent / state.monthlyTotal) * 100);
    },
  },

  actions: {
    updateTotal(value: number) {
      this.monthlyTotal = value;
    },
    updateTotalSpent(value: number) {
      this.totalSpent = value;
    },
  },
});
