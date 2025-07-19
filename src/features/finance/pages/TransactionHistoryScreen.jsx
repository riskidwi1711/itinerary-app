import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import BalanceCardSlider from '../components/BalanceCardSlider';
import { Calendar, Clock, MapPin, Tag, ShoppingBag, Utensils, Car, Plane, Hotel, RefreshCcw, ArrowUpRight, ArrowDownLeft, CreditCard, ReceiptText, Train } from 'lucide-react';
import useItinerary from '@src/features/itinerary/hooks/useItinerary.jsx';

const TransactionHistoryScreen = () => {
  const { t, i18n } = useTranslation();
  const { allItineraryActivities, isLoading } = useItinerary();
  const [currentCurrency, setCurrentCurrency] = useState('MYR');

  const filteredTransactions = allItineraryActivities.filter(
    (activity) => activity.currency === currentCurrency && activity.biaya > 0 && activity.statusPembayaran
  );

  const getCategoryIcon = (kegiatan) => {
    const lowerCaseKegiatan = kegiatan.toLowerCase();
    if (lowerCaseKegiatan.includes('transport') || lowerCaseKegiatan.includes('travel')) return <Car className="w-5 h-5 text-blue-500" />;
    if (lowerCaseKegiatan.includes('makan') || lowerCaseKegiatan.includes('food')) return <Utensils className="w-5 h-5 text-green-500" />;
    if (lowerCaseKegiatan.includes('belanja') || lowerCaseKegiatan.includes('shopping')) return <ShoppingBag className="w-5 h-5 text-purple-500" />;
    if (lowerCaseKegiatan.includes('pesawat') || lowerCaseKegiatan.includes('flight')) return <Plane className="w-5 h-5 text-indigo-500" />;
    if (lowerCaseKegiatan.includes('kereta') || lowerCaseKegiatan.includes('train')) return <Train className="w-5 h-5 text-yellow-500" />;
    if (lowerCaseKegiatan.includes('hotel') || lowerCaseKegiatan.includes('penginapan')) return <Hotel className="w-5 h-5 text-red-500" />;
    return <Tag className="w-5 h-5 text-gray-500" />;
  };

  const formatCurrency = (amount, currencyCode) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: currencyCode, minimumFractionDigits: 0, }).format(amount);
  };

  const getCountryFlag = (country) => ({
    Singapore: '🇸🇬',
    Malaysia: '🇲🇾',
    Indonesia: '🇮🇩',
  }[country] || '');

  const handleRefresh = () => {
    // This can be connected to the fetch function in the store if needed
  };

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BalanceCardSlider
          formatCurrency={formatCurrency}
          getCountryFlag={getCountryFlag}
          onCurrencyChange={setCurrentCurrency}
        />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/70 rounded-2xl shadow-lg border border-white border-opacity-60 overflow-hidden mt-6"
        >
          <div className="p-6 border-b border-gray-200/50 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">{t('transactionList')} ({currentCurrency})</h3>
            <button onClick={handleRefresh} className="p-2 rounded-full hover:bg-gray-100/50 transition-all duration-200">
              <RefreshCcw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <ul className="divide-y divide-gray-200/50">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((activity) => (
                <li key={activity.id} className="p-4 sm:p-6 hover:bg-gray-50/50 transition duration-150 ease-in-out">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center flex-1">
                      <div className="mr-4 flex-shrink-0">
                        {getCategoryIcon(activity.kegiatan)}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {activity.date} <Clock className="w-3 h-3" /> {activity.waktuMulai}
                        </p>
                        <p className="text-base font-semibold text-gray-800">{activity.kegiatan}</p>
                        {activity.catatan && (
                          <p className="text-sm text-gray-700 mt-1 italic">{t('note')}: {activity.catatan}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <p className="text-lg font-bold text-red-600">
                        {formatCurrency(activity.biaya, activity.currency)}
                      </p>
                      <span className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {activity.country}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <ReceiptText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-semibold mb-2">{t('noTransactionsYet')}</p>
                <p className="text-md">{t('addActivitiesToSeeSpendingHistory')}</p>
              </div>
            )}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TransactionHistoryScreen;