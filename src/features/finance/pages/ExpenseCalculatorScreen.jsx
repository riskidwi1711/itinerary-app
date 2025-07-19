import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, CalendarIcon, Tag, ShoppingBag, Utensils, Car, Plane, Train, Hotel, CheckCircle, PlusCircle, DollarSign, Clock, ReceiptText, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGlobalUI } from '@src/hooks/useGlobalUI.js';
import CustomCalendar from '@src/features/common/components/CustomCalendar';
import { Input } from '@src/components/ui/Input';
import Button from '@src/components/ui/Button';
import useItinerary from '@src/features/itinerary/hooks/useItinerary.jsx';
import { useSpendingCalculator } from '../hooks/useSpendingCalculator.js';

const ExpenseCalculatorScreen = () => {
  const { t, i18n } = useTranslation();
  const { allItineraryActivities } = useItinerary();
  const { openModal } = useGlobalUI();
  const { 
    selectedActivitiesForCalc, 
    handleToggleActivityForCalc, 
    calculatedSpending, 
    clearSelectedActivitiesForCalc 
  } = useSpendingCalculator();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [filteredActivities, setFilteredActivities] = useState([]);

  useEffect(() => {
    let tempActivities = allItineraryActivities;

    if (searchTerm) {
      tempActivities = tempActivities.filter(activity =>
        activity.kegiatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (activity.catatan && activity.catatan.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterStartDate && filterEndDate) {
      tempActivities = tempActivities.filter(activity =>
        activity.date >= filterStartDate && activity.date <= filterEndDate
      );
    } else if (filterStartDate) {
      tempActivities = tempActivities.filter(activity => activity.date >= filterStartDate);
    } else if (filterEndDate) {
      tempActivities = tempActivities.filter(activity => activity.date <= filterEndDate);
    }

    setFilteredActivities(tempActivities);
  }, [searchTerm, filterStartDate, filterEndDate, allItineraryActivities]);

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

  const formatNumber = (num) => {
    return new Intl.NumberFormat(i18n.language === 'id' ? 'id-ID' : 'en-US').format(num);
  };
  
  const formatDateDisplay = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  const formatCurrency = (amount, currencyCode) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: currencyCode, minimumFractionDigits: 0, }).format(amount);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6 min-h-screen"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/70 rounded-2xl p-6 shadow-lg border border-white border-opacity-60"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('activitiesSelection')}</h3>
          <div className="relative mb-3">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <Input
              type="text"
              placeholder={t('searchActivities')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3"
            />
          </div>
          <div 
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-5 overflow-visible cursor-pointer"
            onClick={() => openModal(
              <CustomCalendar
                startDate={filterStartDate}
                endDate={filterEndDate}
                setStartDate={setFilterStartDate}
                setEndDate={setFilterEndDate}
                MIN_DATE="2024-01-01"
                MAX_DATE="2025-12-31"
              />,
              t('selectDateRange'),
              'md'
            )}
          >
            <div className="flex items-center space-x-3">
              <CalendarIcon className="w-5 h-5 text-gray-500" />
              <p className="text-base font-medium text-gray-800">
                {filterStartDate && filterEndDate
                  ? `${formatDateDisplay(filterStartDate)} - ${formatDateDisplay(filterEndDate)}`
                  : t('selectDateRange')}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/70 rounded-2xl p-6 shadow-lg border border-white border-opacity-60"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex justify-between items-center">
            {t('selectedEntries')}
            <span className="text-sm font-normal text-gray-600">({selectedActivitiesForCalc.length} {t('selected')})</span>
          </h3>
          <div className="border border-gray-200/50 rounded-lg max-h-96 overflow-y-auto">
            {filteredActivities.length > 0 ? (
              filteredActivities.map(activity => (
                <div 
                  key={activity.id} 
                  className={`p-4 flex items-center justify-between border-b border-gray-200/50 last:border-b-0 cursor-pointer transition-all duration-200 rounded-xl ${selectedActivitiesForCalc.includes(activity.id) ? 'bg-blue-100/50' : 'hover:bg-gray-50/50'}`}
                  onClick={() => handleToggleActivityForCalc(activity.id)}
                >
                  <div className="flex items-center flex-1">
                    <div className="mr-3 flex-shrink-0">
                      {getCategoryIcon(activity.kegiatan)}
                    </div>
                    <div>
                      <p className="text-base font-medium text-gray-800">{activity.kegiatan}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {formatDateDisplay(activity.date)} - {activity.waktuMulai}
                      </p>
                      {activity.catatan && <p className="text-xs italic text-gray-700">{activity.catatan}</p>}
                    </div>
                  </div>
                  <div className="text-right flex items-center">
                    <p className="text-base font-semibold text-blue-700">{formatCurrency(activity.biaya, activity.currency)}</p>
                    {selectedActivitiesForCalc.includes(activity.id) ? (
                      <CheckCircle className="ml-3 w-5 h-5 text-blue-600" />
                    ) : (
                      <div className="ml-3 w-5 h-5 border border-gray-300 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10">
                <ReceiptText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>{t('noActivitiesFound')}</p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/70 rounded-2xl p-6 shadow-lg border border-white border-opacity-60 text-gray-800"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('totalConversion')}</h3>
          <p className="text-sm opacity-80">{t('totalConversionToIdr')}:</p>
          <p className="text-3xl font-bold mt-1 text-blue-700">{formatCurrency(calculatedSpending.totalIDR, 'IDR')}</p>
          <div className="mt-4 pt-4 border-t border-gray-200/50">
            <p className="text-base font-semibold mb-2">{t('breakdown')}:</p>
            {Object.keys(calculatedSpending).map(currencyCode => {
              if (currencyCode === 'totalIDR') return null;
              if (calculatedSpending[currencyCode] > 0) {
                return (
                  <p key={currencyCode} className="text-base flex justify-between items-center text-gray-700">
                    <span>{currencyCode}:</span>
                    <span>{formatCurrency(calculatedSpending[currencyCode], currencyCode)}</span>
                  </p>
                );
              }
              return null;
            })}
          </div>
        </motion.div>

        <Button
          variant="danger"
          className="w-full mt-4 !py-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={clearSelectedActivitiesForCalc}
        >
          <RotateCcw className="w-5 h-5" />
          {t('resetSelections')}
        </Button>

      </motion.div>
    </div>
  );
};

export default ExpenseCalculatorScreen;
