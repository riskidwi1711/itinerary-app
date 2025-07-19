import { useEffect } from 'react';
import { useSettingsStore } from '@src/stores/settingsStore';
import { useFinanceStore } from '@src/stores/financeStore';
import { useUIStore } from '@src/stores/uiStore';

const useSettings = () => {
  const { exchangeRates, initialBalances } = useFinanceStore();
  const {
    settingsForm,
    selectedActor,
    handleSettingsInputChange,
    loadSettings,
    handleSaveSettings: saveSettings,
    setSelectedActor,
  } = useSettingsStore();
  
  const { showNotification } = useUIStore();

  useEffect(() => {
    loadSettings(exchangeRates, initialBalances);
  }, [loadSettings, exchangeRates, initialBalances]);
  
  const handleSaveSettings = async (e) => {
    await saveSettings(e);
    showNotification('Pengaturan berhasil diperbarui!', 'success');
  };

  return {
    settingsForm,
    selectedActor,
    handleSettingsInputChange,
    handleSaveSettings,
    setSelectedActor,
  };
};

export default useSettings;