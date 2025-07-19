import { useState, useEffect } from 'react';
import { useItineraryStore } from '@src/stores/itineraryStore';
import { useFinanceStore } from '@src/stores/financeStore';

export const useSpendingCalculator = () => {
  const { allItineraryActivities } = useItineraryStore();
  const { exchangeRates } = useFinanceStore();
  const [selectedActivitiesForCalc, setSelectedActivitiesForCalc] = useState([]);
  const [calculatedSpending, setCalculatedSpending] = useState({ totalIDR: 0 });

  useEffect(() => {
    const calculate = () => {
      const spending = { totalIDR: 0 };
      selectedActivitiesForCalc.forEach(activityId => {
        const activity = allItineraryActivities.find(a => a.id === activityId);
        if (activity) {
          if (!spending[activity.currency]) {
            spending[activity.currency] = 0;
          }
          spending[activity.currency] += parseFloat(activity.biaya);
          spending.totalIDR += parseFloat(activity.biaya) * (exchangeRates[activity.currency] || 1);
        }
      });
      setCalculatedSpending(spending);
    };
    calculate();
  }, [selectedActivitiesForCalc, allItineraryActivities, exchangeRates]);

  const handleToggleActivityForCalc = (activityId) => {
    setSelectedActivitiesForCalc(prev =>
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const clearSelectedActivitiesForCalc = () => {
    setSelectedActivitiesForCalc([]);
  };

  return {
    selectedActivitiesForCalc,
    handleToggleActivityForCalc,
    calculatedSpending,
    clearSelectedActivitiesForCalc,
  };
};