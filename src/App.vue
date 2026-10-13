<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { useToastStore } from '@/stores/toast.ts';
import AppToast from '@/components/AppToast.vue';
import { onMounted } from 'vue';
import { useRecordStore } from '@/stores/record.ts';
import { useFundsStore } from '@/stores/funds';
const recordStore = useRecordStore();
const fundsStore = useFundsStore();

onMounted(() => {
  console.log('app init');
  recordStore.loadInitialRecords();
  fundsStore.loadFromStorage();
});

const toastStore = useToastStore();
</script>

<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
  <AppToast v-for="(toast, key) in toastStore.activeToasts" :key="key" />
</template>

<style scoped lang="scss"></style>
