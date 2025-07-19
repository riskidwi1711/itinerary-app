import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, Edit, UserRound, CheckCircle, CircleUserRound, Users, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useSettings from '../hooks/useSettings';
import { useFinance } from '@src/features/finance/hooks/useFinance.js';
import Heading from '@src/components/ui/Heading';

const SettingsScreen = () => {
  const { t, i18n } = useTranslation();
  const {
    settingsForm,
    selectedActor,
    handleSettingsInputChange,
    handleSaveSettings,
  } = useSettings();
  
  const { exchangeRates, initialBalances } = useFinance();

  const [isExchangeRateEditing, setIsExchangeRateEditing] = useState(false);
  const [isBalanceEditing, setIsBalanceEditing] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const formatNumber = (num) => {
    return new Intl.NumberFormat(i18n.language === 'id' ? 'id-ID' : 'en-US').format(num);
  };

  const handleSaveAllSettings = async (e) => {
    e.preventDefault();
    await handleSaveSettings(e);
    if (isExchangeRateEditing) setIsExchangeRateEditing(false);
    if (isBalanceEditing) setIsBalanceEditing(false);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const lang = i18n.language;

  return (
    <div className="mb-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto space-y-8 min-h-screen"
      >
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/70 rounded-2xl p-6 shadow-lg border border-white border-opacity-60"
        >
          <Heading level={2} className="mb-4">{t('profile')}</Heading>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <CircleUserRound className="w-16 h-16 text-blue-500 bg-blue-100 rounded-full p-2" />
              <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white bg-green-400"></span>
            </div>
            <div>
              <Heading level={1}>Hello, {selectedActor || t('Guest')}!</Heading>
              <p className="text-sm text-gray-600">Manage your application settings.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/70 rounded-2xl p-6 shadow-lg border border-white border-opacity-60"
        >
          <Heading level={2} className="mb-4">{t('languageSettings')}</Heading>
          <div className="flex space-x-3">
            <button
              onClick={() => changeLanguage('id')}
              className={`flex items-center px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${lang === 'id' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              🇮🇩 {t('indonesian')}
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`flex items-center px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${lang === 'en' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              🇬🇧 {t('english')}
            </button>
          </div>
        </motion.div>

        <form onSubmit={handleSaveAllSettings} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative bg-white/70 rounded-2xl p-6 shadow-lg border border-white border-opacity-60"
            >
              <Heading level={2} className="mb-4">{t('exchangeRateSettings')}</Heading>
              <button
                type="button"
                onClick={() => setIsExchangeRateEditing(!isExchangeRateEditing)}
                className="absolute top-6 right-6 p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 rounded-full hover:bg-blue-50"
                title={isExchangeRateEditing ? t('doneEditing') : t('editExchangeRates')}
              >
                <Edit className="h-5 w-5" />
              </button>
              {!isExchangeRateEditing ? (
                <div className="space-y-3 text-left">
                  <p className="text-base text-gray-700 flex items-center">🇸🇬 SGD to IDR: <span className="font-mono font-semibold text-gray-900 ml-2">{formatNumber(exchangeRates.SGD)}</span></p>
                  <p className="text-base text-gray-700 flex items-center">🇲🇾 MYR to IDR: <span className="font-mono font-semibold text-gray-900 ml-2">{formatNumber(exchangeRates.MYR)}</span></p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="sgdRate" className="block text-sm font-semibold text-gray-700 mb-1">{t('sgdToIdrRate')}:</label>
                    <input
                      type="number"
                      id="sgdRate"
                      name="sgdRate"
                      value={settingsForm.sgdRate}
                      onChange={handleSettingsInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-gray-800 bg-gray-50 transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="myrRate" className="block text-sm font-semibold text-gray-700 mb-1">{t('myrToIdrRate')}:</label>
                    <input
                      type="number"
                      id="myrRate"
                      name="myrRate"
                      value={settingsForm.myrRate}
                      onChange={handleSettingsInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-gray-800 bg-gray-50 transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative bg-white/70 rounded-2xl p-6 shadow-lg border border-white border-opacity-60"
            >
              <Heading level={2} className="mb-4">{t('setInitialBalances')}</Heading>
              <button
                type="button"
                onClick={() => setIsBalanceEditing(!isBalanceEditing)}
                className="absolute top-6 right-6 p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 rounded-full hover:bg-blue-50"
                title={isBalanceEditing ? t('doneEditing') : t('editInitialBalances')}
              >
                <Edit className="h-5 w-5" />
              </button>
              {!isBalanceEditing ? (
                <div className="space-y-3 text-left">
                  <p className="text-base text-gray-700 flex items-center">🇲🇾 {t('myrInitialBalance')}: <span className="font-mono font-semibold text-gray-900 ml-2">RM {formatNumber(initialBalances.MYR)}</span></p>
                  <p className="text-base text-gray-700 flex items-center">🇸🇬 {t('sgdInitialBalance')}: <span className="font-mono font-semibold text-gray-900 ml-2">S$ {formatNumber(initialBalances.SGD)}</span></p>
                  <p className="text-base text-gray-700 flex items-center">🇮🇩 {t('idrInitialBalance')}: <span className="font-mono font-semibold text-gray-900 ml-2">Rp {formatNumber(initialBalances.IDR)}</span></p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="myrInitialBalance" className="block text-sm font-semibold text-gray-700 mb-1">{t('myrInitialBalance')}</label>
                    <input type="number" id="myrInitialBalance" name="myrInitialBalance" value={settingsForm.myrInitialBalance} onChange={handleSettingsInputChange} className="w-full p-3 border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gray-50 transition-all duration-200" placeholder={t('enterInitialMyr')} />
                  </div>
                  <div>
                    <label htmlFor="sgdInitialBalance" className="block text-sm font-semibold text-gray-700 mb-1">{t('sgdInitialBalance')}</label>
                    <input type="number" id="sgdInitialBalance" name="sgdInitialBalance" value={settingsForm.sgdInitialBalance} onChange={handleSettingsInputChange} className="w-full p-3 border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gray-50 transition-all duration-200" placeholder={t('enterInitialSgd')} />
                  </div>
                  <div>
                    <label htmlFor="idrInitialBalance" className="block text-sm font-semibold text-gray-700 mb-1">{t('idrInitialBalance')}</label>
                    <input type="number" id="idrInitialBalance" name="idrInitialBalance" value={settingsForm.idrInitialBalance} onChange={handleSettingsInputChange} className="w-full p-3 border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-gray-50 transition-all duration-200" placeholder={t('enterInitialIdr')} />
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {(isExchangeRateEditing || isBalanceEditing) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-end pt-4"
            >
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 flex items-center shadow-lg transform hover:scale-105"
              >
                <Save className="h-5 w-5 mr-2" />
                {t('saveChanges')}
              </button>
            </motion.div>
          )}
        </form>

        <AnimatePresence>
          {showSaveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 z-50"
            >
              <CheckCircle className="h-5 w-5" />
              <span>{t('settingsSavedSuccessfully')}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SettingsScreen;