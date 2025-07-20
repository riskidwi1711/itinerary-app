import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plus, List, Calendar, MapPin, Wallet, ListTodo, Clock } from 'lucide-react';
import CustomCalendar from '@src/features/common/components/CustomCalendar';
import ActivityList from '../components/ActivityList.jsx';
import TimelineView from '../components/TimelineView.jsx';
import { useCountryImages } from '@src/services';
import useItinerary from '../hooks/useItinerary.jsx';
import { useGlobalUI } from '@src/hooks/useGlobalUI.js';
import ItinerarySkeleton from '@src/features/common/components/ItinerarySkeleton.jsx';
import { useFinance } from '@src/features/finance/hooks/useFinance.js';

const ItineraryScreen = () => {
  const { t } = useTranslation();
  const {
    itinerary,
    isLoading,
    handleEdit,
    handleDelete,
    startDate,
    endDate,
    allItineraryActivities,
    openAddModal,
    setStartDate,
    setEndDate,
    filterItinerary,
    fetchItineraryActivities, // Add fetchItineraryActivities
  } = useItinerary();

  const { totalBiayaIDR, exchangeRates } = useFinance();
  const { openModal } = useGlobalUI();

  useEffect(() => {
    filterItinerary();
  }, [startDate, endDate, filterItinerary]);

  const [viewMode, setViewMode] = useState('list');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false); // New state for refresh

  const countries = ['Indonesia', 'Malaysia', 'Singapore'];
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const country = countries[currentCountryIndex];
  const { data: bannerImages = [], isLoading: loadingBanner } = useCountryImages(country);

  // Effect to change country every 3 seconds
  useEffect(() => {
    const countryChangeInterval = setInterval(() => {
      setCurrentCountryIndex((prevIndex) => (prevIndex + 1) % countries.length);
    }, 3000); // Change country every 3 seconds

    return () => clearInterval(countryChangeInterval);
  }, []);

  // Effect to change banner image within the current country's images
  useEffect(() => {
    if (bannerImages.length > 1) {
      const bannerTimer = setTimeout(() => {
        setIsFading(true);
        setTimeout(() => {
          setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
          setIsFading(false);
        }, 500);
      }, 5000); // Change banner image every 5 seconds
      return () => clearTimeout(bannerTimer);
    }
  }, [currentBannerIndex, bannerImages]);

  const groupedItineraryByDate = useMemo(() => {
    const grouped = (allItineraryActivities || []).filter(
      (item) => item.date >= startDate && item.date <= endDate
    ).reduce((acc, item) => {
      const date = item.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});

    Object.keys(grouped).forEach(date => {
      grouped[date].sort((a, b) => {
        const timeA = a.waktuMulai.split(':').map(Number);
        const timeB = b.waktuMulai.split(':').map(Number);
        if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0];
        return timeA[1] - timeB[1];
      });
    });
    return grouped;
  }, [allItineraryActivities, startDate, endDate]);

  const calculateDaysLeft = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

  const formatDateDisplay = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatCurrency = (amount, currencyCode) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: currencyCode, minimumFractionDigits: 0, }).format(amount);
  };

  const getCountryFlag = (country) => ({
    Singapore: '🇸🇬',
    Malaysia: '🇲🇾',
    Indonesia: '🇮🇩',
  }[country] || '');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchItineraryActivities();
    setIsRefreshing(false);
  };

  if (isLoading) {
    return <ItinerarySkeleton />;
  }

  return (
    <div className="min-h-screen">
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto space-y-6"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-700/60 z-10"></div>
            <div
              className="h-56 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${bannerImages[currentBannerIndex]})` }}
            >
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">{country}</h2>
                </div>
                <div className="flex items-center space-x-2 text-white/90">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{formatDateDisplay(startDate)} - {formatDateDisplay(endDate)}</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-5 overflow-visible cursor-pointer"
            onClick={() => openModal(
              <CustomCalendar
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                MIN_DATE="2024-01-01"
                MAX_DATE="2025-12-31"
              />,
              t('selectDateRange'),
              'md'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">{t('yourTrip')}</p>
                  <p className="text-base font-bold text-gray-800">{formatDateDisplay(startDate)} – {formatDateDisplay(endDate)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{calculateDaysLeft()}</p>
                <p className="text-xs text-gray-600">{t('days')}</p>
              </div>
            </div>
          </div>

          <div className="relative flex space-x-2 z-30">
            <button
              onClick={openAddModal}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 p-4 flex items-center justify-center space-x-3"
            >
              <Plus className="w-6 h-6" />
              <span className="text-lg font-semibold">{t('addActivity')}</span>
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'list' ? 'timeline' : 'list')}
              className="p-4 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg text-gray-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center"
              title={viewMode === 'list' ? t('switchToTimelineView') : t('switchToListView')}
            >
              {viewMode === 'list' ? <Calendar className="w-6 h-6" /> : <List className="w-6 h-6" />}
            </button>
          </div>

          {itinerary.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/70 rounded-2xl p-8 text-center shadow-lg border border-white border-opacity-60"
            >
              <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="mt-4 text-lg font-semibold text-gray-800">{t('noActivitiesYet')}</p>
              <p className="text-gray-600">{t('tapToAddActivity')}</p>
            </motion.div>
          ) : viewMode === 'list' ? (
            <ActivityList
              itinerary={itinerary}
              getCountryFlag={getCountryFlag}
              formatCurrency={formatCurrency}
              exchangeRates={exchangeRates}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ) : (
            <TimelineView
              groupedItineraryByDate={groupedItineraryByDate}
              formatDateDisplay={formatDateDisplay}
              formatCurrency={formatCurrency}
              exchangeRates={exchangeRates}
              getCountryFlag={getCountryFlag}
            />
          )}

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">{t('tripSummary')}</h3>
            <div className="text-center mb-4 pb-4 border-b border-indigo-400/50">
              <p className="text-indigo-100 text-sm flex items-center justify-center gap-1"><Wallet className="w-4 h-4" /> {t('totalSpent')}</p>
              <p className="text-4xl font-bold mt-1">{formatCurrency(totalBiayaIDR, 'IDR')}</p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-indigo-400/50">
              <div className="text-center px-4">
                <p className="text-indigo-100 text-sm flex items-center justify-center gap-1"><ListTodo className="w-4 h-4" /> {t('activities')}</p>
                <p className="text-2xl font-bold mt-1">{itinerary.length}</p>
              </div>
              <div className="text-center px-4">
                <p className="text-indigo-100 text-sm flex items-center justify-center gap-1"><Clock className="w-4 h-4" /> {t('daysLeft')}</p>
                <p className="text-2xl font-bold mt-1">{calculateDaysLeft()}</p>
              </div>
            </div>
          </div>

        </motion.div>
    </div>
  );
};

export default ItineraryScreen;