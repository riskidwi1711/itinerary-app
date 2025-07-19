
import React from 'react';
import Toast from '@src/components/ui/Toast';

const Notification = ({ notification }) => {
  return (
    <Toast
      message={notification.message}
      type={notification.type}
      visible={notification.visible}
    />
  );
};

export default Notification;
