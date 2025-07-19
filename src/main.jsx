import React, { Suspense, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@src/main.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import App from '@src/app.jsx';
import i18n from '@src/i18n'; // import i18n configuration
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@src/services/api';

import SplashScreen from '@src/components/SplashScreen';

const RootApp = () => {
  const [i18nInitialized, setI18nInitialized] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      setTimeout(() => {
        setI18nInitialized(true);
      }, 2000); // Display splash screen for at least 2 seconds
    } else {
      i18n.on('initialized', () => {
        setTimeout(() => {
          setI18nInitialized(true);
        }, 2000); // Display splash screen for at least 2 seconds
      });
    }
  }, []);

  if (!i18nInitialized) {
    return <SplashScreen />;
  }

  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </Suspense>
  );
};

createRoot(document.getElementById("root")).render(<RootApp />);