<script setup lang="ts">
import { useFundsStore } from '@/stores/funds.ts';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
const schema = toTypedSchema(
  yup.object({
    funds: yup.number().typeError('Funds must be a valid number').required(),
  }),
);

const { errors, defineField, meta, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    funds: 0,
  },
});

const fundsStore = useFundsStore();
const [funds, fundsAttrs] = defineField('funds');

const onSubmit = handleSubmit(() => {
  if (funds.value) fundsStore.updateTotal(funds.value);
  resetForm();
});
</script>

<template>
  <div class="card bg-base-100 card-xs shadow-sm">
    <form class="card-body" novalidate @submit.prevent="onSubmit">
      <h2 class="card-title">Set Funds</h2>
      <fieldset class="fieldset">
        <input
          type="number"
          class="input"
          :class="{ 'border-red-500 border': errors.funds }"
          v-bind="fundsAttrs"
          v-model="funds"
        />
        <small class="text-red-500" v-if="errors.funds">{{ errors.funds }}</small>
        <p class="label">Update your monthly funds</p>
      </fieldset>
      <div class="justify-start card-actions mt-auto">
        <button class="btn btn-primary" :disabled="!meta.dirty || !meta.valid">Set Funds</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
