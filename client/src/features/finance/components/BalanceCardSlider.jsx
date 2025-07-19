import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import BalanceCard from './BalanceCard';
import { useTranslation } from 'react-i18next';
import { useFinance } from '@src/features/finance/hooks/useFinance.js';

const BalanceCardSlider = ({ onCurrencyChange }) => {
  const { t } = useTranslation();
  const { balances, initialBalances } = useFinance();
  const currencies = balances ? Object.keys(balances) : [];

  const [currentCurrency, setCurrentCurrency] = useState(currencies[0]);

  useEffect(() => {
    if (currencies.length > 0 && !currentCurrency) {
      setCurrentCurrency(currencies[0]);
    }
  }, [currencies, currentCurrency]);

  useEffect(() => {
    if (onCurrencyChange) {
      onCurrencyChange(currentCurrency);
    }
  }, [currentCurrency, onCurrencyChange]);
  
  const formatCurrency = (amount, currencyCode) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: currencyCode, minimumFractionDigits: 0, }).format(amount);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    centerPadding: '0px',
    afterChange: (index) => {
      setCurrentCurrency(currencies[index]);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '0px',
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '0px',
        }
      }
    ]
  };

  const totalBudget = initialBalances[currentCurrency] || 0;
  const spentAmount = totalBudget - (balances[currentCurrency] || 0);
  const percentageSpent = totalBudget > 0 ? (spentAmount / totalBudget) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full"
    >
      <Slider {...settings} className='shadow-lg rounded-xl bg-white/70'>
        {currencies.map((currency) => (
          <div key={currency} className="px-1">
            <BalanceCard currency={currency} amount={balances[currency]} />
          </div>
        ))}
      </Slider>
      {totalBudget > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-white/70 rounded-2xl p-6 shadow-lg border border-white border-opacity-60"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('budgetOverview')} ({currentCurrency})</h3>
          <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-600">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentageSpent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm mt-3 text-gray-700">
            <span>{t('spent')}: {formatCurrency(spentAmount, currentCurrency)}</span>
            <span>{t('total')}: {formatCurrency(totalBudget, currentCurrency)}</span>
          </div>
          {percentageSpent > 100 && (
            <p className="text-red-500 text-sm mt-2 font-medium">{t('overBudgetWarning')}</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BalanceCardSlider;
