import React from 'react';
import Modal from '../components/ui/Modal';
import useModal from '../hooks/useModal';

const GlobalModal = ({ isOpen, onClose, title, children, size }) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
    >
      {children}
    </Modal>
  );
};

export default GlobalModal;