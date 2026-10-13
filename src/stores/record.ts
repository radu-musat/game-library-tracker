import { defineStore } from 'pinia';
import type { RecordState, Purchase } from '@/types/product.ts';
const STORAGE_KEY = 'game_purchase_records';
export const useRecordStore = defineStore('record', {
  state: (): RecordState => ({
    records: [
      // {
      //   id: '3b999bae-5073-48d9-b7cf-df095fea9d70',
      //   purchaseDate: '2026-09-27',
      //   totalCost: 669,
      //   items: [
      //     {
      //       name: 'Game 1',
      //       price: 222,
      //       platform: 'Steam',
      //       isMainQuest: true,
      //       id: '22ddfb96-3ddd-44ce-8ba9-3edfc53bd2a7',
      //     },
      //     {
      //       name: 'Game 2',
      //       price: 224,
      //       platform: 'Steam',
      //       isMainQuest: true,
      //       id: 'cf55a45b-52c1-474a-be7b-7127e1e5d9b6',
      //     },
      //     {
      //       name: 'Game 3',
      //       price: 229,
      //       platform: 'Steam',
      //       isMainQuest: true,
      //       id: '33d55a55-430f-4c1f-900f-ad2a5cdd4044',
      //     },
      //   ],
      // },
      // {
      //   id: '4c2dd649-1a2e-405f-9d40-b523471fa091',
      //   purchaseDate: '2026-10-26',
      //   totalCost: 669,
      //   items: [
      //     {
      //       name: 'Game 1',
      //       price: 222,
      //       platform: 'Steam',
      //       isMainQuest: true,
      //       id: '22ddfb96-3ddd-44ce-8ba9-3edfc53bd2a7',
      //     },
      //     {
      //       name: 'Game 2',
      //       price: 224,
      //       platform: 'Steam',
      //       isMainQuest: true,
      //       id: 'cf55a45b-52c1-474a-be7b-7127e1e5d9b6',
      //     },
      //     {
      //       name: 'Game 3',
      //       price: 229,
      //       platform: 'Steam',
      //       isMainQuest: true,
      //       id: '33d55a55-430f-4c1f-900f-ad2a5cdd4044',
      //     },
      //   ],
      // },
      // {
      //   id: '4c2dd649-1a2e-405f-9d40-b523471fa091',
      //   purchaseDate: '2026-09-26',
      //   totalCost: 669,
      //   items: [
      //     {
      //       name: 'Game 1',
      //       price: 222,
      //       platform: 'Steam',
      //       isMainQuest: true,
      //       id: '22ddfb96-3ddd-44ce-8ba9-3edfc53bd2a7',
      //     },
      //     {
      //       name: 'Game 2',
      //       price: 224,
      //       platform: 'Steam',
      //       isMainQuest: true,
      //       id: 'cf55a45b-52c1-474a-be7b-7127e1e5d9b6',
      //     },
      //     {
      //       name: 'Game 3',
      //       price: 229,
      //       platform: 'Steam',
      //       isMainQuest: true,
      //       id: '33d55a55-430f-4c1f-900f-ad2a5cdd4044',
      //     },
      //   ],
      // },
      // {
      //   id: '4c2dd649-1a2e-405f-9d40-b523471fa091',
      //   purchaseDate: '2025-09-26',
      //   totalCost: 669,
      //   items: [
      //     {
      //       name: 'Game 1',
      //       price: 222,
      //       platform: 'Steam',
      //       isMainQuest: true,
      //       id: '22ddfb96-3ddd-44ce-8ba9-3edfc53bd2a7',
      //     },
      //     {
      //       name: 'Game 2',
      //       price: 224,
      //       platform: 'Steam',
      //       isMainQuest: true,
      //       id: 'cf55a45b-52c1-474a-be7b-7127e1e5d9b6',
      //     },
      //     {
      //       name: 'Game 3',
      //       price: 229,
      //       platform: 'Steam',
      //       isMainQuest: true,
      //       id: '33d55a55-430f-4c1f-900f-ad2a5cdd4044',
      //     },
      //   ],
      // },
      // {
      //   id: '4c2dd649-1a2e-405f-9d40-b523471fa091',
      //   purchaseDate: '2023-09-26',
      //   totalCost: 669,
      //   items: [
      //     {
      //       name: 'Game 1',
      //       price: 222,
      //       platform: 'Steam',
      //       isMainQuest: true,
      //       id: '22ddfb96-3ddd-44ce-8ba9-3edfc53bd2a7',
      //     },
      //     {
      //       name: 'Game 2',
      //       price: 224,
      //       platform: 'Steam',
      //       isMainQuest: true,
      //       id: 'cf55a45b-52c1-474a-be7b-7127e1e5d9b6',
      //     },
      //     {
      //       name: 'Game 3',
      //       price: 229,
      //       platform: 'Steam',
      //       isMainQuest: true,
      //       id: '33d55a55-430f-4c1f-900f-ad2a5cdd4044',
      //     },
      //   ],
      // },
    ],
  }),
  getters: {
    activeRecords: (state) => state.records,
    lastRecord: (state) => state.records.at(-1),
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
      console.log(record);
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
      const saved = localStorage.getItem(STORAGE_KEY);
      console.log('aaa');
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
