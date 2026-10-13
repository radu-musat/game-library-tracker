<script setup lang="ts">
import { ref } from 'vue';
import { useRecordStore } from '@/stores/record';
import { useFundsStore } from '@/stores/funds.ts';
import { Download, Upload } from '@lucide/vue';

const recordStore = useRecordStore();
const fundsStore = useFundsStore();
const fileInput = ref<HTMLInputElement | null>(null);

// Export JSON Backup
const exportData = () => {
  const backupData = {
    records: recordStore.records,
    funds: {
      monthlyTotal: fundsStore.monthlyTotal,
      monthlyTotalSpent: fundsStore.monthlyTotalSpent,
    },
  };

  const dataStr = JSON.stringify(backupData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `game-purchases-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// Trigger hidden file input
const triggerImport = () => {
  fileInput.value?.click();
};

// Handle JSON Import File Selection
const handleFileImport = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;

  const file = target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      const parsed = JSON.parse(content);

      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.records)) {
        recordStore.importData(parsed.records);

        if (parsed.funds) {
          fundsStore.importFunds(parsed.funds);
        }

        alert('Data and funds imported successfully!');
      }
      else if (Array.isArray(parsed)) {
        recordStore.importData(parsed);
        alert('Records imported successfully!');
      } else {
        alert('Invalid backup file format.');
      }
    } catch (err) {
      alert('Could not parse JSON file.');
      console.error(err);
    } finally {
      target.value = '';
    }
  };

  if (file) {
    reader.readAsText(file);
  }
};
</script>

<template>
  <div class="card bg-base-100 card-xs shadow-sm">
    <div class="card-body">
      <h2 class="card-title">Data Backup & Restore</h2>
      <p class="text-sm text-gray-500 mb-2">
        Export your purchase records as a JSON file or import a previous backup.
      </p>
      <p class="text-sm text-gray-500 mb-2">
        Please note data is saved by default locally in the browser using
        <a
          href="https://developer.chrome.com/docs/devtools/storage/localstorage"
          target="_blank"
          class="text-blue-500 font-bold"
        >
          local storage </a
        >.
      </p>
      <p class="text-sm text-gray-500 mb-2">
        Clearing local storage without saving a JSON file will lead to data loss. Always have a JSON
        file backup on hand.
      </p>

      <div class="flex gap-4">
        <button @click="exportData" class="btn btn-primary flex-1 gap-2">
          <Download class="w-4 h-4" /> Export JSON
        </button>

        <button @click="triggerImport" class="btn btn-outline flex-1 gap-2">
          <Upload class="w-4 h-4" /> Import JSON
        </button>

        <!-- Hidden file input for importing -->
        <input
          type="file"
          ref="fileInput"
          accept=".json"
          class="hidden"
          @change="handleFileImport"
        />
      </div>
    </div>
  </div>
</template>
