import React from 'react';
import { motion } from 'framer-motion';
import DateRangePickerInput from './DateRangePickerInput';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DateNavigation = ({ goToPreviousDay, startDate, MIN_DATE, formatDateDisplay, goToNextDay, endDate, MAX_DATE, setStartDate, setEndDate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex flex-col items-center mb-6 p-4 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white border-opacity-60"
    >
      <div className="flex items-center justify-between w-full mb-4">
        <button
          onClick={goToPreviousDay}
          disabled={startDate === MIN_DATE}
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          title="Hari Sebelumnya"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="text-md font-semibold text-gray-800">
          {formatDateDisplay(startDate)} - {formatDateDisplay(endDate)}
        </p>
        <button
          onClick={goToNextDay}
          disabled={endDate === MAX_DATE}
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          title="Hari Selanjutnya"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <DateRangePickerInput
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        MIN_DATE={MIN_DATE}
        MAX_DATE={MAX_DATE}
      />
    </motion.div>
  );
};

export default DateNavigation;
