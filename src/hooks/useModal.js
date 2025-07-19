import { useState, useCallback } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState('');
  const [footer, setFooter] = useState(null);
  const [size, setSize] = useState('md'); // 'sm', 'md', 'lg', 'xl'

  const openModal = useCallback((modalContent, modalTitle = '', modalFooter = null, modalSize = 'md') => {
    setContent(modalContent);
    setTitle(modalTitle);
    setFooter(modalFooter);
    setSize(modalSize);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setContent(null);
    setTitle('');
    setFooter(null);
    setSize('md');
  }, []);

  return { isOpen, content, title, footer, size, openModal, closeModal };
};

export default useModal;
