<script setup lang="ts"></script>

<template>
  <section class="px-3 pt-6 bg-gray-100 grow">
    <h1 class="text-5xl mb-8 font-medium">Create Record</h1>

    <form class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div class="card-body">
        <fieldset class="fieldset">
          <label class="label">Name</label>
          <input type="text" class="input" placeholder="Name" />
          <label class="label">Price</label>
          <input type="number" class="input" placeholder="Price" />
          <label class="label">Platform</label>
          <input type="text" class="input" placeholder="Platform" />
          <label class="label">Platform</label>
          <input type="text" class="input" placeholder="Platform" />
          <button type="submit" class="btn btn-neutral mt-4">Create</button>
          <!--
          TODO: ADD Datepicker calendar
          https://daisyui.com/components/calendar/
          https://github.com/uvarov-frontend/vanilla-calendar-pro
          -->
        </fieldset>
      </div>
    </form>
  </section>
</template>

<style scoped lang="scss"></style>
