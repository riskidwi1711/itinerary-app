import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { UserRound, X } from 'lucide-react';

const ActorSelectionModal = ({ isOpen, onClose, onSelectActor }) => {
  const { t } = useTranslation();

  const handleActorClick = (actor) => {
    onSelectActor(actor);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-sm p-6 relative border border-white border-opacity-60"
          >
            <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">{t('selectActor')}</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleActorClick('riski')}
                className="flex flex-col items-center p-4 bg-blue-100/70 rounded-xl shadow-md hover:bg-blue-200/70 transition duration-200 w-32 border border-blue-200"
              >
                <UserRound className="h-12 w-12 text-blue-600 mb-2" />
                <span className="text-lg font-semibold text-gray-800">Riski</span>
              </button>
              <button
                onClick={() => handleActorClick('aulia')}
                className="flex flex-col items-center p-4 bg-pink-100/70 rounded-xl shadow-md hover:bg-pink-200/70 transition duration-200 w-32 border border-pink-200"
              >
                <UserRound className="h-12 w-12 text-pink-600 mb-2" />
                <span className="text-lg font-semibold text-gray-800">Aulia</span>
              </button>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-600 hover:bg-gray-100 transition duration-200"
              title={t('close')}
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActorSelectionModal;
