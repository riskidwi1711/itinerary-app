import { useUIStore } from '@src/stores/uiStore';

export const useGlobalUI = () => {
  const { showNotification, showConfirmModal, closeModal, openModal } = useUIStore();

  return {
    showNotification,
    showConfirmModal,
    closeModal,
    openModal,
  };
};
