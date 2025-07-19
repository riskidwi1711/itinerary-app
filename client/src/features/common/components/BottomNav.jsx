
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ListTodo, Wallet, Settings, Calculator, History, PlaneTakeoff, PiggyBank, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BottomNav = ({ currentScreen }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navItems = React.useMemo(() => [
    { id: 'itinerary', path: '/itinerary', icon: PlaneTakeoff, label: t('itinerary') },
    { id: 'history', path: '/history', icon: History, label: t('history') },
    { id: 'calculator', path: '/calculator', icon: PiggyBank, label: t('calculator') },
    { id: 'settings', path: '/settings', icon: SlidersHorizontal, label: t('settings') },
  ], [t]);

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 w-full bg-white/70 backdrop-blur-lg border-t border-white border-opacity-60 shadow-2xl z-30 flex justify-around py-3 px-2 rounded-t-3xl"
    >
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center text-xs font-medium p-2 rounded-xl transition-all duration-300 relative group
            ${currentScreen === item.id ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
        >
          <item.icon className="h-6 w-6 mb-1" />
          <span className={`mt-1 ${currentScreen === item.id ? 'font-bold text-blue-600' : 'text-gray-700 group-hover:text-blue-600'}`}>{item.label}</span>
          {currentScreen === item.id && (
            <motion.span
              layoutId="underline"
              className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 rounded-full"
            />
          )}
        </button>
      ))}
    </motion.nav>
  );
};

export default BottomNav;
