import { useEffect } from 'react';
import { useFinanceStore } from '@src/stores/financeStore';
import { useItineraryStore } from '@src/stores/itineraryStore';

export const useFinance = () => {
  const {
    exchangeRates,
    initialBalances,
    spent,
    totalBiayaIDR,
    fetchInitialBalances,
    calculateSpending,
  } = useFinanceStore();
  
  const { allItineraryActivities } = useItineraryStore();

  useEffect(() => {
    fetchInitialBalances();
  }, [fetchInitialBalances]);
  
  useEffect(() => {
    if (allItineraryActivities) {
      calculateSpending(allItineraryActivities);
    }
  }, [allItineraryActivities, exchangeRates, calculateSpending]);

  return {
    exchangeRates,
    initialBalances,
    balances: {
      SGD: initialBalances.SGD - spent.SGD,
      MYR: initialBalances.MYR - spent.MYR,
      IDR: initialBalances.IDR - spent.IDR,
    },
    totalBiayaIDR,
  };
};
