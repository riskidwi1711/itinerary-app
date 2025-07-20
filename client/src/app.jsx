import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import GlobalModal from '@src/components/GlobalModal.jsx';
import AppRoutes from '@src/AppRoutes.jsx';
import GlobalLoading from '@src/components/GlobalLoading.jsx';
import Toast from '@src/components/ui/Toast.jsx';
import { useUIStore } from '@src/stores/uiStore.js';
import { useSettingsStore } from '@src/stores/settingsStore.js';
import { useItineraryStore } from '@src/stores/itineraryStore.js';
import { useInactivity } from './hooks/useInactivity';
import {BottomNav, Header, ConfirmModal, ActorSelectionModalContent} from '@src/features/common/components/index.js'
import PullToRefresh from 'react-pull-to-refresh'; // Import PullToRefresh

import PinEntry from '@src/components/PinEntry';

function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const { 
    isModalOpen, 
    closeModal, 
    modalContent, 
    modalTitle, 
    modalSize,
    notification,
    isConfirmModalOpen,
    confirmMessage,
    confirmAction,
    hideConfirmModal,
    openModal,
  } = useUIStore();
  
  const { selectedActor, setSelectedActor } = useSettingsStore();
  const { isLocked, setIsLocked, fetchItineraryActivities, isLoading } = useItineraryStore(); // Get fetchItineraryActivities and isLoading

  useInactivity();

  const showPinEntry = !selectedActor || isLocked;

  const handleRefresh = async () => {
    // Only refresh if not already loading
    if (!isLoading) {
      await fetchItineraryActivities();
    }
  };

  if (showPinEntry) {
    return <PinEntry onPinVerified={(actorName) => {
      setSelectedActor(actorName);
      setIsLocked(false);
    }} />;
  }

  const currentScreen = location.pathname.substring(1) || 'itinerary';

  return (
    <div className="flex justify-center items-start min-h-screen  bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 app-container">
      <div className="flex flex-col w-full font-inter mobile:mx-auto">
        <Header
          currentScreen={currentScreen} 
          selectedActor={selectedActor}
          onProfileClick={() => openModal(
            <ActorSelectionModalContent
              onSelectActor={(actor) => {
                setSelectedActor(actor);
                closeModal();
              }}
              onClose={closeModal}
            />,
            t('selectActor'),
            'sm'
          )}
        />

        <PullToRefresh
          onRefresh={handleRefresh}
        >
          <main className="flex-1 overflow-y-auto pt-24 pb-36 min-h-screen px-4">
            <AppRoutes />
          </main>
        </PullToRefresh>

        <BottomNav currentScreen={currentScreen} />

        <GlobalModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          title={modalTitle}
          size={modalSize}
        >
          {modalContent}
        </GlobalModal>
        
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={hideConfirmModal}
          onConfirm={confirmAction}
          message={confirmMessage}
        />

        <GlobalLoading />
        <Toast 
          message={notification.message} 
          type={notification.type} 
          visible={notification.visible} 
        />
      </div>
    </div>
  );
}

export default App;