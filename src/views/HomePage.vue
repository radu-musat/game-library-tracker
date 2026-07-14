<script setup lang="ts">
// import PurchaseRecord from '@/components/PurchaseRecord.vue'
</script>

<template>
  <section class="px-3 pt-6 bg-gray-100 grow">
    <h1 class="text-5xl mb-8 font-medium">Dashboard</h1>
    <div class="stats stats-vertical sm:stats-horizontal shadow bg-base-100 mb-8">
      <div class="stat">
        <div class="stat-title">This Month's Budget</div>
        <div class="stat-value">31K</div>
        <div class="stat-desc">Jan 1st - Feb 1st</div>
      </div>

      <div class="stat">
        <div class="stat-title">Remaining Funds</div>
        <div class="stat-value">4,200</div>
        <div class="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <div class="stat">
        <div class="stat-title">Total Funds Spent</div>
        <div class="stat-value">1,200</div>
        <div class="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      <div class="card bg-base-100 card-xs shadow-sm">
        <div class="card-body">
          <h2 class="card-title">Last Purchase</h2>
          <ol>
            <li>3</li>
            <li>3</li>
            <li>3</li>
          </ol>
          <p>
            A card component has a figure, a body part, and inside body there are title and actions
            parts
          </p>
          <div class="justify-start card-actions">
            <button class="btn btn-primary">View Details</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
