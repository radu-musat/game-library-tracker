import { defineStore } from 'pinia';
import type { Funds } from '@/types/funds.ts';

const STORAGE_KEY = 'game_purchase_funds';

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
      if (state.monthlyTotal === 0) {
        if (state.monthlyTotalSpent > 0) return 100;
        return 0;
      }
      return Math.round((state.monthlyTotalSpent / state.monthlyTotal) * 100);
    },
  },
  actions: {
    saveToStorage() {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          monthlyTotal: this.monthlyTotal,
          monthlyTotalSpent: this.monthlyTotalSpent,
        }),
      );
    },
    loadFromStorage() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          this.monthlyTotal = parsed.monthlyTotal ?? 0;
          this.monthlyTotalSpent = parsed.monthlyTotalSpent ?? 0;
        } catch (e) {
          console.error('Failed to parse funds from localStorage', e);
        }
      }
    },
    updateTotal(value: number) {
      this.monthlyTotal = value;
      this.saveToStorage();
    },
    updateTotalSpent(value: number) {
      this.monthlyTotalSpent = value;
      this.saveToStorage();
    },
    importFunds(fundsData: Funds) {
      this.monthlyTotal = fundsData.monthlyTotal ?? 0;
      this.monthlyTotalSpent = fundsData.monthlyTotalSpent ?? 0;
      this.saveToStorage();
    },
  },
});
