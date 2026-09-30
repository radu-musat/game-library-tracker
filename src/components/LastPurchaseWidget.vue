<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRecordStore } from '@/stores/record.ts';
const recordStore = useRecordStore();

const { lastRecord } = storeToRefs(recordStore);
</script>

<template>
  <div class="card bg-base-100 card-xs shadow-sm">
    <div class="card-body">
      <h2 class="card-title">Last Purchase</h2>
      <ol v-if="lastRecord" class="flex flex-col gap-1">
        <li class="flex gap-1 flex-wrap justify-between">
          <span
            v-for="item in lastRecord.items"
            :key="item.name"
            class="badge badge-outline badge-info"
          >
            {{ item.name }}
          </span>
        </li>
        <li>Purchase date: {{ lastRecord.purchaseDate }}</li>
        <li>Total Cost: {{ lastRecord.totalCost }}</li>
      </ol>
      <p v-else>No record available</p>
      <div class="justify-start card-actions" v-if="lastRecord">
        <button class="btn btn-primary">View Details</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
