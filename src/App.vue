<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { useToastStore } from '@/stores/toast.ts';
import AppToast from '@/components/AppToast.vue';

const toastStore = useToastStore();
</script>

<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
  <AppToast v-for="(toast, key) in toastStore.activeToasts" :key="key" />
</template>

<style scoped lang="scss"></style>
