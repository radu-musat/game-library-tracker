<script setup lang="ts">
import { useToastStore } from '@/stores/toast.ts';
const toastStore = useToastStore();
</script>

<template>
  <div class="toast toast-top toast-center">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      :class="['alert', `alert-${toast.type}`]"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<style scoped></style>
