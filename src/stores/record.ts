import { defineStore } from 'pinia'
import type { RecordState, Purchase} from '@/types/product.ts'
export const useRecordStore = defineStore('record', {
  state: (): RecordState => ({
    records: []
  }),
  getters: {
    activeRecords: (state) => state.records
  },
  actions: {
    addRecord(record: Purchase) {
      this.records.push(record)
    }
  }
})
