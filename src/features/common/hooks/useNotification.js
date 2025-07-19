
import { useState, useCallback } from 'react';

const useNotification = () => {
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

  const showNotification = useCallback((message, type) => {
    setNotification({ message, type, visible: true });
    const timer = setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 3000); // Notification disappears after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return { notification, showNotification };
};

export default useNotification;
