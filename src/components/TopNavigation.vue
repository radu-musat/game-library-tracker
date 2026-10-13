<script setup lang="ts">
import GLT from '@/assets/icons/GLT.svg';
</script>

<template>
  <div class="navbar gap-2 flex-col md:flex-row bg-base-100">
    <div class="flex-1">
      <RouterLink :to="{ name: 'Home' }">
        <img class="h-16 w-auto" :src="GLT" alt="logo" />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
