import { useEffect, useRef } from 'react';
import { useItineraryStore } from '../stores/itineraryStore';
import { api } from '../services/api';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

export const useInactivity = () => {
  const { setIsLocked } = useItineraryStore();
  const timeoutRef = useRef(null);

  const resetTimer = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsLocked(true);
    }, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];

    const handleActivity = () => {
      resetTimer();
    };

    events.forEach(event => window.addEventListener(event, handleActivity));

    resetTimer(); // Initialize the timer on component mount

    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity));
      clearTimeout(timeoutRef.current);
    };
  }, []);
};
