import { create } from 'zustand';

export const useUIStore = create((set, get) => ({
  // State
  isModalOpen: false,
  modalContent: null,
  modalTitle: '',
  modalSize: 'md',
  notification: {
    message: '',
    type: 'info',
    visible: false,
  },
  isConfirmModalOpen: false,
  confirmMessage: '',
  confirmAction: () => {},

  // Actions
  openModal: (content, title, size = 'md') => set({
    isModalOpen: true,
    modalContent: content,
    modalTitle: title,
    size,
  }),

  closeModal: () => set({
    isModalOpen: false,
    modalContent: null,
    modalTitle: '',
  }),

  showNotification: (message, type = 'info') => {
    set({ notification: { message, type, visible: true } });
    setTimeout(() => {
      set({ notification: { message: '', type: 'info', visible: false } });
    }, 3000);
  },

  showConfirmModal: (message, onConfirm) => set({
    isConfirmModalOpen: true,
    confirmMessage: message,
    confirmAction: () => {
      onConfirm();
      get().hideConfirmModal();
    },
  }),

  hideConfirmModal: () => set({
    isConfirmModalOpen: false,
    confirmMessage: '',
    confirmAction: () => {},
  }),
}));