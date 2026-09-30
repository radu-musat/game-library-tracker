<script setup lang="ts">
import type { Product, Purchase } from '@/types/product.ts';
import { ref, type Ref, computed } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { useRecordStore } from '@/stores/record.ts';
import { useToastStore } from '@/stores/toast.ts';
import { useFundsStore } from '@/stores/funds.ts';
import { CircleCheck, CircleX, Trash2, Pencil } from '@lucide/vue';
import FundsWidget from '@/components/FundsWidget.vue';
import utils from '@/utils/utils';
import 'cally';
import { storeToRefs } from 'pinia';

const recordStore = useRecordStore();
const toastStore = useToastStore();
const fundsStore = useFundsStore();
const { monthlyTotalSpent } = storeToRefs(fundsStore);

const schema = toTypedSchema(
  yup.object({
    name: yup.string().required().min(3),
    price: yup
      .number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required()
      .min(0),
    platform: yup.string().required().min(3),
    isMainQuest: yup.boolean().required(),
  }),
);

const { errors, defineField, meta, handleSubmit, resetForm } = useForm<Product>({
  validationSchema: schema,
  initialValues: {
    isMainQuest: true,
  },
});

const [name, nameAttrs] = defineField('name');
const [price, priceAttrs] = defineField('price');
const [platform, platformAttrs] = defineField('platform');
const [mainQuest, mainQuestAttrs] = defineField('isMainQuest');

const isCreateMode = ref(true);
const editId = ref<string | null>(null);

const purchase: Ref<Purchase> = ref({
  id: crypto.randomUUID(),
  purchaseDate: '',
  totalCost: 0,
  items: [],
});

const totalCost = computed(() => purchase.value.items.reduce((acc, item) => acc + item.price, 0));
const onDateChange = (e: Event) => {
  const target = e.target as HTMLElement & { value: string };
  purchase.value.purchaseDate = target.value;

  const popover = document.getElementById('cally-popover1') as HTMLElement & {
    hidePopover?: () => void;
  };

  popover.hidePopover?.();
};

const onSubmit = handleSubmit(() => {
  const recordData: Product = {
    name: name.value,
    price: price.value,
    platform: platform.value,
    isMainQuest: mainQuest.value,
    id: crypto.randomUUID(),
  };

  if (isCreateMode.value) {
    purchase.value.items.push(recordData);
    purchase.value.totalCost = totalCost.value;
    toastStore.showMessage('Purchase added to record', 'success');
  } else if (editId.value) {
    recordData.id = editId.value;
    const index = purchase.value.items.findIndex((item: Product) => item.id === recordData.id);

    if (index === -1) {
      return;
    }

    purchase.value.items[index] = recordData;
    isCreateMode.value = true;
    resetForm();
    toastStore.showMessage(`Purchase record ${recordData.name} updated`, 'success');
  }
});
const onDelete = (id: string) => {
  const index = purchase.value.items.findIndex((item: Product) => item.id === id);
  toastStore.showMessage(
    `Purchased record ${purchase.value.items[index]?.name} removed`,
    'warning',
  );
  purchase.value.items.splice(index, 1);
};
const onEditSelect = (id: string) => {
  const editItem = purchase.value.items.find((item: Product) => item.id === id);

  if (!editItem) {
    return;
  }

  isCreateMode.value = false;
  name.value = editItem.name;
  price.value = editItem.price;
  platform.value = editItem.platform;
  mainQuest.value = editItem.isMainQuest;
  editId.value = editItem.id;

  toastStore.showMessage(`Now editing ${name.value}`, 'info');
};

const addRecord = (): void => {
  recordStore.addRecord(purchase.value);
  toastStore.showMessage('Record added', 'success');

  const currentYear = new Date().getFullYear();
  const purchaseYear = new Date(purchase.value.purchaseDate).getFullYear();

  if (currentYear === purchaseYear) {
    const totalFundsSpent = monthlyTotalSpent.value + purchase.value.totalCost;
    fundsStore.updateTotalSpent(totalFundsSpent);
  }

  purchase.value = {
    id: crypto.randomUUID(),
    purchaseDate: '',
    totalCost: 0,
    items: [],
  };
};
const { prettifyKey } = utils;
</script>

<template>
  <section class="px-3 pt-6 bg-gray-100 grow">
    <div class="flex flex-wrap gap-5 mb-8 items-center">
      <h1 class="text-5xl font-medium">
        {{ isCreateMode ? 'Create Record' : 'Edit Record Purchase' }}
      </h1>
      <FundsWidget />
    </div>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2 rounded-box">
      <div class="card bg-base-100 shadow-2xl">
        <form class="w-full shrink-0 card-body" novalidate @submit.prevent="onSubmit">
          <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            <fieldset class="fieldset">
              <label class="label" for="name">Name</label>
              <input
                type="text"
                class="input"
                placeholder="Name"
                v-model="name"
                v-bind="nameAttrs"
                :class="{ 'border-red-500 border': errors.name }"
                id="name"
              />
              <small class="text-red-500" v-if="errors.name">{{ errors.name }}</small>

              <label class="label" for="price">Price</label>
              <input
                type="number"
                class="input"
                placeholder="Price"
                v-model="price"
                v-bind="priceAttrs"
                :class="{ 'border-red-500 border': errors.price }"
                id="price"
              />
              <small class="text-red-500" v-if="errors.price">{{ errors.price }}</small>

              <label class="label">Platform</label>
              <input
                type="text"
                class="input"
                placeholder="Platform"
                v-model="platform"
                :class="{ 'border-red-500 border': errors.platform }"
                v-bind="platformAttrs"
              />
              <small class="text-red-500" v-if="errors.platform">{{ errors.platform }}</small>
            </fieldset>
            <fieldset class="fieldset pt-6">
              <div class="flex gap-1">
                <label class="label">Main quest (must buy)</label>
                <input
                  type="checkbox"
                  class="checkbox"
                  name="Main-Quest"
                  v-model="mainQuest"
                  v-bind="mainQuestAttrs"
                />
              </div>
            </fieldset>
          </div>
          <button
            type="submit"
            class="btn btn-neutral mt-4 self-start"
            :disabled="!meta.touched || !meta.valid"
          >
            {{ isCreateMode ? 'Add to purchase record' : 'Update purchase record' }}
          </button>
        </form>
      </div>
      <div class="card bg-base-100 shadow-2xl justify-between">
        <div class="grow">
          <div class="p-4 pb-0">Total cost: {{ totalCost }}</div>

          <div class="p-4">
            <label class="label" for="price">Purchase Date</label>
            <div>
              <button
                popovertarget="cally-popover1"
                class="input input-border"
                id="cally1"
                style="anchor-name: --cally1"
                type="button"
              >
                {{ purchase.purchaseDate || 'Pick a date' }}
              </button>

              <div
                popover
                id="cally-popover1"
                class="dropdown bg-base-100 rounded-box shadow-lg"
                style="position-anchor: --cally1"
              >
                <calendar-date class="cally" @change="onDateChange">
                  <calendar-month />
                </calendar-date>
              </div>
            </div>
          </div>

          <ul class="list max-h-60 overflow-auto">
            <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Purchase Record Products</li>
            <template v-if="purchase.items.length">
              <li class="list-row" v-for="(purchaseItem, key) in purchase.items" :key="key">
                <div>
                  <img
                    class="size-10 rounded-box"
                    src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                    :alt="`${purchaseItem.name} icon`"
                  />
                </div>
                <div>
                  <div>{{ purchaseItem.name }}</div>
                  <div class="flex gap-2 flex-wrap">
                    <template v-for="(value, key) in purchaseItem" :key="key">
                      <div
                        class="flex gap-1 items-center text-xs"
                        v-if="key !== 'name' && key !== 'id'"
                      >
                        <div class="uppercase font-semibold opacity-60">
                          {{ prettifyKey(key, 'is') }} :
                        </div>
                        <span>
                          <template v-if="typeof value === 'boolean'">
                            <CircleCheck v-if="value" />
                            <CircleX v-else />
                          </template>
                          <template v-else>
                            {{ value }}
                          </template>
                        </span>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="self-start pt-6 flex gap-2">
                  <Pencil class="cursor-pointer" @click.prevent="onEditSelect(purchaseItem.id)" />
                  <Trash2 class="cursor-pointer" @click.prevent="onDelete(purchaseItem.id)" />
                </div>
              </li>
            </template>
            <li class="list-row" v-else>No products recorded</li>
          </ul>
        </div>
        <div class="p-4 mt-4">
          <button
            class="btn btn-neutral"
            :disabled="!purchase.items.length || !isCreateMode || !purchase.purchaseDate"
            @click.prevent="addRecord"
          >
            Add record
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
