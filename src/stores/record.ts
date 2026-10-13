import { defineStore } from 'pinia';
import type { RecordState, Purchase } from '@/types/product.ts';
const STORAGE_KEY = 'game_purchase_records';
export const useRecordStore = defineStore('record', {
  state: (): RecordState => ({
    records: [],
  }),
  getters: {
    activeRecords: (state) => state.records,
    lastRecord: (state) => state.records.at(0),
    lifeTimeTotalSpent: (state) => {
      return state.records.reduce((total: number, record: Purchase) => {
        return total + record.totalCost;
      }, 0);
    },
    totalSpentCurrentYear: (state) => {
      const currentYear = new Date().getFullYear();
      return state.records
        .filter((record) => new Date(record.purchaseDate).getFullYear() === currentYear)
        .reduce((total, record) => total + record.totalCost, 0);
    },
    totalGamesPurchaseAllTime: (state) => {},
    defaultTimelineYear: (state) => {
      const currentYear = new Date().getFullYear();
      const hasCurrentYearRecord = state.records.some(
        (record) => new Date(record.purchaseDate).getFullYear() === currentYear,
      );

      if (!hasCurrentYearRecord && state.records.length > 0) {
        const years = state.records.map((record) => new Date(record.purchaseDate).getFullYear());
        return Math.max(...years).toString();
      }
      return currentYear.toString();
    },
  },
  actions: {
    addRecord(record: Purchase) {
      this.records.push(record);
    },
    saveToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.records));
    },
    importData(newRecords: Purchase[]) {
      this.records = newRecords;
      this.saveToStorage();
    },
    loadInitialRecords () {
      const saved = localStorage.getItem(STORAGE_KEY);;
      if (saved) {
        try {
          this.records = JSON.parse(saved);
          return
        } catch (e) {
          console.error('Failed to parse records from localStorage', e);
        }
      }
    },
  },
});
