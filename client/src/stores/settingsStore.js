import { create } from 'zustand';
import { api } from '@src/services/api';
import { useFinanceStore } from '@src/stores/financeStore';

export const useSettingsStore = create((set, get) => ({
  // State
  settingsForm: {
    sgdRate: '',
    myrRate: '',
    myrInitialBalance: '',
    sgdInitialBalance: '',
    idrInitialBalance: '',
  },
  selectedActor: localStorage.getItem('selectedActor') || null,

  // Actions
  handleSettingsInputChange: ({ target: { name, value } }) => {
    set(state => ({
      settingsForm: {
        ...state.settingsForm,
        [name]: value,
      }
    }));
  },

  loadSettings: (exchangeRates, initialBalances) => {
    set(state => ({
      settingsForm: {
        ...state.settingsForm,
        sgdRate: exchangeRates.SGD,
        myrRate: exchangeRates.MYR,
        myrInitialBalance: initialBalances.MYR,
        sgdInitialBalance: initialBalances.SGD,
        idrInitialBalance: initialBalances.IDR,
      }
    }));
  },

  handleSaveSettings: async (e) => {
    e.preventDefault();
    const { settingsForm } = get();
    const { setExchangeRates, fetchInitialBalances } = useFinanceStore.getState();

    try {
      // Update exchange rates
      const newRates = {
        SGD: parseFloat(settingsForm.sgdRate),
        MYR: parseFloat(settingsForm.myrRate),
        IDR: 1,
      };
      await api.post('/settings/SGD', { value: newRates.SGD });
      await api.post('/settings/MYR', { value: newRates.MYR });
      setExchangeRates(newRates);

      // Update initial balances
      await api.post('/settings/initial_balance_SGD', { value: settingsForm.sgdInitialBalance });
      await api.post('/settings/initial_balance_MYR', { value: settingsForm.myrInitialBalance });
      await api.post('/settings/initial_balance_IDR', { value: settingsForm.idrInitialBalance });
      fetchInitialBalances();

    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  },
  
  setSelectedActor: (actor) => {
    localStorage.setItem('selectedActor', actor);
    set({ selectedActor: actor });
  }
}));
