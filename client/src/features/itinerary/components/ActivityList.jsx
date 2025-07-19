import React from 'react';
import { SwipeableList, SwipeableListItem, SwipeAction, TrailingActions, LeadingActions } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { motion } from 'framer-motion';
import { Edit, Trash2, Clock, DollarSign, Train, Tag, ShoppingBag, Utensils, Car, Plane, Hotel } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ActivityList = ({ itinerary, getCountryFlag, formatCurrency, exchangeRates, handleEdit, handleDelete }) => {
  const { t } = useTranslation();

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

  const leadingActions = (id) => (
    <LeadingActions>
      <SwipeAction
        onClick={() => handleEdit(id)}
        className="bg-blue-500 text-white"
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center mx-auto">
          <Edit className="h-6 w-6 mx-auto mb-1" />
          <span className="text-sm font-semibold">{t('edit')}</span>
        </div>
        </div>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (id) => (
   <TrailingActions>
  <SwipeAction
    onClick={() => handleDelete(id)}
    className="bg-red-500 text-white"
  >
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center mx-auto">
        <Trash2 className="h-6 w-6 mb-1" />
        <span className="text-sm font-semibold">{t('delete')}</span>
      </div>
    </div>
  </SwipeAction>
</TrailingActions>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-4 mb-8"
    >
      {itinerary.length > 0 ? (
        <SwipeableList className=" shadow-lg rounded-3xl">
          {itinerary.map((item) => (
            <SwipeableListItem
              key={item.id}
              leadingActions={leadingActions(item.id)}
              trailingActions={trailingActions(item.id)}
              threshold={0.5}
              className="overflow-hidden flex flex-col gap-3 border border-b-2"
            >
              <div className="w-full bg-white/70 backdrop-blur-lg p-4 border border-white border-opacity-60">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {getCategoryIcon(item.kegiatan)}
                    </div>
                    <div>
                      <p className="font-semibold text-base text-gray-800">{item.kegiatan}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{item.waktuMulai} - {item.waktuSelesai} ({item.country})</span>
                      </div>
                      {item.catatan && <p className="text-sm italic text-gray-700">{t('note')}: {item.catatan}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 font-bold text-blue-700 text-lg">
                      {getCountryFlag(item.currency)} {formatCurrency(item.biaya, item.currency)}
                    </div>
                    <p className="text-sm text-gray-600">({formatCurrency(item.biaya * (exchangeRates[item.currency] || 1), 'IDR')})</p>
                  </div>
                </div>
                {item.statusPembayaran && (
                  <div className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                      {t('paid')}
                    </span>
                  </div>
                )}
              </div>
            </SwipeableListItem>
          ))}
        </SwipeableList>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/70 rounded-2xl p-8 text-center shadow-lg border border-white border-opacity-60"
        >
          <Tag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="mt-4 text-lg font-semibold text-gray-800">{t('noActivitiesForDateRange')}</p>
          <p className="text-gray-600">{t('useAddActivityButton')}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ActivityList;