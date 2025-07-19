import React, { useEffect } from 'react';
import { useItineraryStore } from '@src/stores/itineraryStore';
import ActivityFormModalContent from '../components/ActivityFormModalContent';
import { useGlobalUI } from '@src/hooks/useGlobalUI';

const useItinerary = () => {
  const { 
    itinerary, 
    allItineraryActivities,
    isLoading,
    formItem,
    editingItem,
    startDate,
    endDate,
    fetchItineraryActivities, 
    setStartDate,
    setEndDate,
    handleInputChange,
    addActivity,
    updateActivity,
    deleteActivity,
    resetForm,
    calculateBiayaIDR,
    filterItinerary,
    handleEdit: handleEditInStore,
  } = useItineraryStore();
  
  const { showNotification, showConfirmModal, closeModal, openModal } = useGlobalUI();

  useEffect(() => {
    fetchItineraryActivities();
  }, [fetchItineraryActivities]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['waktuMulai', 'waktuSelesai', 'kegiatan', 'date', 'country', 'currency'];
    const isValid = requiredFields.every(key => !!formItem[key]);
    if (!isValid) {
      showNotification('Harap lengkapi semua kolom yang wajib diisi.', 'error');
      return;
    }
    
    if (editingItem) {
      await updateActivity(formItem);
      showNotification('Kegiatan berhasil diperbarui!', 'success');
    } else {
      await addActivity(formItem);
      showNotification('Kegiatan berhasil ditambahkan!', 'success');
    }

    fetchItineraryActivities()
    closeModal();
  };

  const handleDelete = (id) => {
    const item = allItineraryActivities.find(i => i.id === id);
    if (!item) return;
    showConfirmModal(`Hapus "${item.kegiatan}"?`, () => {
      deleteActivity(id);
      showNotification('Kegiatan berhasil dihapus!', 'success');
    });
  };
  
  const handleEdit = (id) => {
    handleEditInStore(id);
    openModal(<ActivityFormModalContent />, 'Edit Activity', 'lg');
  };
  
  const openAddModal = () => {
    resetForm();
    openModal(<ActivityFormModalContent />, 'Add New Activity', 'lg');
  };

  return {
    itinerary,
    allItineraryActivities,
    isLoading,
    formItem,
    editingItem,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    handleInputChange,
    handleSubmit,
    handleDelete,
    handleEdit,
    openAddModal,
    resetForm,
    calculateBiayaIDR,
    filterItinerary,
  };
};

export default useItinerary;