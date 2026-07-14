<script setup lang="ts">
import TopNavigation from '@/components/TopNavigation.vue'
import SideNavigation from '@/components/SideNavigation.vue'
</script>

<template>
  <main class="flex grow">
    <SideNavigation/>
    <div class="grow flex flex-col">
      <TopNavigation />
      <slot></slot>
    </div>
  </main>
</template>

<style scoped></style>
