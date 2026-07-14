<script setup lang="ts">
import { Calendar } from '@lucide/vue'
import { House } from '@lucide/vue'
import { CirclePlus } from '@lucide/vue'
import { History } from '@lucide/vue'
</script>

<template>
  <div class="flex relative">
    <!-- Sidebar -->
    <aside class="h-full flex flex-col overflow-y-auto gap-2 py-6 px-2 bg-base-100 shadow-md">
      <RouterLink :to="{ name: 'Home' }" class="btn">
        <House />
      </RouterLink>
      <RouterLink :to="{ name: 'CurrentMonth' }" class="btn">
        <Calendar />
      </RouterLink>
      <RouterLink :to="{ name: 'Create' }" class="btn">
        <CirclePlus />
      </RouterLink>
      <RouterLink :to="{ name: 'CurrentMonth' }" class="btn">
        <History />
      </RouterLink>
    </aside>
  </div>
</template>

<style scoped></style>
