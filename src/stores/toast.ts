import { defineStore } from 'pinia';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface ToastStore {
  toasts: Toast[];
}

export const useToastStore = defineStore('toast', {
  state: (): ToastStore => ({
    toasts: [],
  }),
  getters: {
    activeToasts: (state) => state.toasts,
  },
  actions: {
    remove(id: string) {
      const index = this.toasts.findIndex((toast: Toast) => toast.id === id);
      if (index === -1) return;
      this.toasts.splice(index, 1);
    },
    showMessage(message: string, type: Toast['type']) {
      const toast: Toast = {
        id: crypto.randomUUID(),
        message,
        type,
      };
      this.toasts.push(toast);
      setTimeout(() => this.remove(toast.id), 3000);
    },
  },
});
