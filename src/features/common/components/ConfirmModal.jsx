
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '@src/components/ui/Modal';
import Button from '@src/components/ui/Button';

const ConfirmModal = ({ isOpen, message, onConfirm, onClose }) => {
  const { t } = useTranslation();

  const footer = (
    <>
      <Button variant="secondary" onClick={onClose}>
        {t('cancel')}
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        {t('delete')}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('confirmDeletion')}
      footer={footer}
    >
      <p className="text-gray-700">{message}</p>
    </Modal>
  );
};

export default ConfirmModal;
