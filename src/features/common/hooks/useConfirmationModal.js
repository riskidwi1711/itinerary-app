
import { useState } from 'react';

const useConfirmationModal = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(() => () => {});

  const showConfirm = (message, action) => {
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setShowConfirmModal(true);
  };

  const hideConfirm = () => {
    setShowConfirmModal(false);
    setConfirmMessage('');
    setConfirmAction(() => () => {});
  };

  return { showConfirmModal, confirmMessage, confirmAction, showConfirm, hideConfirm };
};

export default useConfirmationModal;
