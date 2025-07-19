
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const TimelineView = ({ groupedItineraryByDate, formatDateDisplay, formatCurrency, exchangeRates, getCountryFlag }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="space-y-8"
    >
      {Object.keys(groupedItineraryByDate).length > 0 ? (
        Object.keys(groupedItineraryByDate).sort().map(date => (
          <motion.div
            key={date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative pl-8 border-l-2 border-blue-300"
          >
            <div className="absolute -left-3 top-0 bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {new Date(date).getDate()}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 -mt-1">
              {formatDateDisplay(date)}
            </h3>
            <div className="space-y-4">
              {groupedItineraryByDate[date].map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white border-opacity-60 p-4 flex items-center justify-between"
                >
                  <div className="flex items-center flex-grow">
                    <span className="text-2xl mr-4">{getCountryFlag(item.country)}</span>
                    <div className="flex-grow">
                      <h4 className="text-lg font-semibold text-gray-800">{item.kegiatan}</h4>
                      <p className="text-gray-600 text-sm">
                        {item.waktuMulai} - {item.waktuSelesai} ({item.country})
                      </p>
                      {item.catatan && (
                        <p className="text-gray-700 text-xs italic mt-1">{t('note')}: {item.catatan}</p>
                      )}
                      <p className="text-xs mt-2">
                        {item.statusPembayaran ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                            {t('paid')}
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                            {t('unpaid')}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end ml-4">
                    {item.biaya > 0 ? (
                      <p className="text-gray-800 font-bold text-lg">
                        {formatCurrency(item.biaya, item.currency)}
                        <span className="text-gray-600 text-sm block">
                          ({formatCurrency(item.biaya * (exchangeRates[item.currency] || 1), 'IDR')})
                        </span>
                      </p>
                    ) : (
                      <p className="text-gray-500 text-sm">{t('free')}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/70 rounded-2xl p-8 text-center shadow-lg border border-white border-opacity-60"
        >
          <p className="text-lg font-semibold mb-2 text-gray-800">{t('noActivitiesForDateRange')}</p>
          <p className="text-gray-600">{t('useAddActivityButton')}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TimelineView;
