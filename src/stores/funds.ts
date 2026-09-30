import { defineStore } from 'pinia';
import type { Funds } from '@/types/funds.ts';

export const useFundsStore = defineStore('funds', {
  state: (): Funds => ({
    monthlyTotal: 0,
    monthlyTotalSpent: 0,
  }),
  getters: {
    monthlyRemaining: (state) => state.monthlyTotal - state.monthlyTotalSpent,
    monthlyRemainingPercentage: (state) => {
      if (state.monthlyTotal === 0) {
        if (state.monthlyTotalSpent > 0) return -100;
        return 0;
      }
      const remaining = state.monthlyTotal - state.monthlyTotalSpent;
      return Math.round((remaining / state.monthlyTotal) * 100);
    },
    monthlySpentPercentage: (state) => {
      console.log(state.monthlyTotal);
      if (state.monthlyTotal === 0) {
        if (state.monthlyTotalSpent > 0) return 100;
        return 0;
      }
      return Math.round((state.monthlyTotalSpent / state.monthlyTotal) * 100);
    },
  },

  actions: {
    updateTotal(value: number) {
      this.monthlyTotal = value;
    },
    updateTotalSpent(value: number) {
      this.monthlyTotalSpent = value;
    },
  },
});
