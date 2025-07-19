import { create } from 'zustand';
import { api } from '@src/services/api';

export const useFinanceStore = create((set, get) => ({
  // State
  exchangeRates: {
    "SGD": 11500,
    "MYR": 3500,
    "IDR": 1,
  },
  initialBalances: {
    "SGD": 0,
    "MYR": 0,
    "IDR": 0,
  },
  spent: {
    "SGD": 0,
    "MYR": 0,
    "IDR": 0,
  },
  totalBiayaIDR: 0,

  // Actions
  setExchangeRates: (rates) => set({ exchangeRates: rates }),

  fetchInitialBalances: async () => {
    try {
      const [sgd, myr, idr] = await Promise.all([
        api.get('/settings/initial_balance_SGD'),
        api.get('/settings/initial_balance_MYR'),
        api.get('/settings/initial_balance_IDR'),
      ]);
      set({
        initialBalances: {
          SGD: parseFloat(sgd.data.value) || 0,
          MYR: parseFloat(myr.data.value) || 0,
          IDR: parseFloat(idr.data.value) || 0,
        }
      });
    } catch (error) {
      console.error("Failed to fetch initial balances:", error);
    }
  },

  calculateSpending: (activities) => {
    const { exchangeRates } = get();
    
    const spent = { "SGD": 0, "MYR": 0, "IDR": 0 };
    let totalBiayaIDR = 0;

    activities.forEach(item => {
      if (item.currency && item.biaya && item.statusPembayaran) {
        spent[item.currency] += parseFloat(item.biaya);
      }
    });

    totalBiayaIDR = Object.keys(spent).reduce((acc, currency) => {
      return acc + (spent[currency] * (exchangeRates[currency] || 1));
    }, 0);

    set({ spent, totalBiayaIDR });
  },
}));