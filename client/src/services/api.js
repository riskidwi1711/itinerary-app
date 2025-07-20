import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';
import { useItineraryStore } from '../stores/itineraryStore';

export const queryClient = new QueryClient();

export const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(
  (config) => {
    const sessionId = localStorage.getItem('sessionId');
    console.log('API Interceptor: Checking sessionId. Found:', sessionId);
    if (sessionId) {
      config.headers.Authorization = `Bearer ${sessionId}`;
      console.log('API Interceptor: Setting Authorization header:', config.headers.Authorization);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized, force logout
      localStorage.removeItem('sessionId');
      // Use a direct call to the store's action, as useItineraryStore() cannot be called here
      // This is a common pattern for Zustand stores when used outside React components
      useItineraryStore.getState().setIsLocked(true);
    }
    return Promise.reject(error);
  }
);
