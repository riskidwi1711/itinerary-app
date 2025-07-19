import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import GlobalModal from '@src/components/GlobalModal.jsx';
import AppRoutes from '@src/AppRoutes.jsx';
import GlobalLoading from '@src/components/GlobalLoading.jsx';
import Toast from '@src/components/ui/Toast.jsx';
import { useUIStore } from '@src/stores/uiStore.js';
import { useSettingsStore } from '@src/stores/settingsStore.js';
import {BottomNav, Header, ConfirmModal, ActorSelectionModalContent} from '@src/features/common/components/index.js'

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

  if (!selectedActor) {
    return <PinEntry onPinVerified={setSelectedActor} />;
  }

  const currentScreen = location.pathname.substring(1) || 'itinerary';

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-300 app-container">
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

        <main className="flex-1 overflow-y-auto pt-24 pb-36 min-h-screen px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <AppRoutes />
        </main>

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