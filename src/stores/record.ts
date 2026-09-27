import { defineStore } from 'pinia';
import type { RecordState, Purchase } from '@/types/product.ts';
export const useRecordStore = defineStore('record', {
  state: (): RecordState => ({
    records: [
      {
        id: '4c2dd649-1a2e-405f-9d40-b523471fa091',
        purchaseDate: '2026-09-26',
        totalCost: 669,
        items: [
          {
            name: 'Game 1',
            price: 222,
            platform: 'Steam',
            isMainQuest: true,
            isPurchased: true,
            id: '22ddfb96-3ddd-44ce-8ba9-3edfc53bd2a7',
          },
          {
            name: 'Game 2',
            price: 224,
            platform: 'Steam',
            isMainQuest: true,
            isPurchased: true,
            id: 'cf55a45b-52c1-474a-be7b-7127e1e5d9b6',
          },
          {
            name: 'Game 3',
            price: 229,
            platform: 'Steam',
            isMainQuest: true,
            isPurchased: true,
            id: '33d55a55-430f-4c1f-900f-ad2a5cdd4044',
          },
        ],
      },
    ],
  }),
  getters: {
    activeRecords: (state) => state.records,
    lastRecord: (state) => state.records.at(-1),
  },
  actions: {
    addRecord(record: Purchase) {
      console.log(record);
      this.records.push(record);
    },
  },
});
