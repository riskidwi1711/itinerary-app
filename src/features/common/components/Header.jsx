
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plane, UserRound, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Heading from '@src/components/ui/Heading';

const Header = ({ currentScreen, openSettingsModal, onProfileClick, selectedActor }) => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const screenTitles = React.useMemo(() => ({
    itinerary: t('travelItinerary'),
    calculator: t('expenseCalculator'),
    history: t('transactionHistory'),
    settings: t('applicationSettings'),
  }), [t, currentScreen]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 w-full bg-white/70 backdrop-blur-lg border-b border-white border-opacity-60 shadow-lg z-50 flex items-center justify-between py-3 px-4 rounded-b-3xl"
    >
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition duration-200"
        title={t('toggleTheme')}
      >
        {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>
      <Heading level={1} className="flex-grow text-center !text-xl">
        {screenTitles[currentScreen]}
      </Heading>
      <button
        onClick={onProfileClick}
        className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition duration-200"
        title={t('profile')}
      >
        <UserRound className={`h-6 w-6 ${selectedActor === 'aulia' ? 'text-pink-500' : 'text-blue-500'}`} />
      </button>
    </motion.header>
  );
};

export default Header;
