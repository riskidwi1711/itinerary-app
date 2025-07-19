import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BalanceCard = ({ currency, amount }) => {
  const { t, i18n } = useTranslation();

  const formatNumber = (num) => {
    return new Intl.NumberFormat(i18n.language === 'id' ? 'id-ID' : 'en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const getCurrencySymbol = (curr) => {
    switch (curr) {
      case 'MYR': return 'RM';
      case 'SGD': return 'S';
      case 'IDR': return 'Rp';
      default: return curr;
    }
  };

  const getCurrencyFlag = (curr) => {
    switch (curr) {
      case 'MYR': return '🇲🇾';
      case 'SGD': return '🇸🇬';
      case 'IDR': return '🇮🇩';
      default: return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-none w-full bg-white/70 backdrop-blur-lg rounded-2xl p-6 text-gray-800 relative overflow-hidden border border-white border-opacity-60"
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex justify-between items-start w-full flex-wrap">
          <div className="flex items-center">
            <Wallet className="w-7 h-7 mr-2 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-700">{t('currentBalance')}</h2>
          </div>
          <span className="text-2xl font-bold text-blue-700 flex items-center gap-2">
            {getCurrencyFlag(currency)} {currency}
          </span>
        </div>
        <p className="text-4xl font-extrabold leading-tight mt-4 text-gray-900">
          {getCurrencySymbol(currency)} {formatNumber(amount)}
        </p>
        <p className="text-sm mt-4 text-gray-600 text-right opacity-80">
          {t('lastUpdated')}: {new Date().toLocaleDateString(i18n.language === 'id' ? 'id-ID' : 'en-US')}
        </p>
      </div>
    </motion.div>
  );
};

export default BalanceCard;