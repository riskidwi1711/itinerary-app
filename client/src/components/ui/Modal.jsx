
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from './Button';
import Heading from './Heading';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
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
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative max-h-[90vh] border border-white border-opacity-60"
          >
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200/50">
              <Heading level={2}>{title}</Heading>
              <Button variant="ghost" onClick={onClose} className="!p-2 !rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-0">{children}</div>
            {footer && <div className="flex justify-end gap-3 mt-6">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
