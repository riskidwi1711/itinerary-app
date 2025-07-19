import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ItineraryScreen from '@src/features/itinerary/pages/ItineraryScreen';
import ExpenseCalculatorScreen from '@src/features/finance/pages/ExpenseCalculatorScreen';
import TransactionHistoryScreen from '@src/features/finance/pages/TransactionHistoryScreen';
import SettingsScreen from '@src/features/settings/pages/SettingsScreen';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/itinerary" />} />
      <Route
        path="/itinerary"
        element={<ItineraryScreen />}
      />
      <Route
        path="/calculator"
        element={<ExpenseCalculatorScreen />}
      />
      <Route
        path="/history"
        element={<TransactionHistoryScreen />}
      />
      <Route
        path="/settings"
        element={<SettingsScreen />}
      />
    </Routes>
  );
};

export default AppRoutes;