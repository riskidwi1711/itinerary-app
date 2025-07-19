import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO } from 'date-fns';
import { id, enUS } from 'date-fns/locale';
import { Popover, PopoverContent } from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const DateRangePickerInput = ({ startDate, endDate, setStartDate, setEndDate, MIN_DATE, MAX_DATE, placeholder, icon }) => {
  const { i18n } = useTranslation();
  const [selectedStartDate, setSelectedStartDate] = useState(startDate ? new Date(startDate) : null);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate ? new Date(endDate) : null);

  useEffect(() => {
    if (selectedStartDate) {
      setStartDate(format(selectedStartDate, 'yyyy-MM-dd'));
    } else {
      setStartDate(null);
    }
    if (selectedEndDate) {
      setEndDate(format(selectedEndDate, 'yyyy-MM-dd'));
    } else {
      setEndDate(null);
    }
  }, [selectedStartDate, selectedEndDate, setStartDate, setEndDate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Popover open={true} onOpenChange={() => {}}>
        <PopoverContent className="z-50 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-4 border border-white border-opacity-60">
          <DatePicker
            selected={selectedStartDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setSelectedStartDate(start);
              setSelectedEndDate(end);
            }}
            startDate={selectedStartDate}
            endDate={selectedEndDate}
            selectsRange
            inline
            minDate={new Date(MIN_DATE)}
            maxDate={new Date(MAX_DATE)}
            locale={i18n.language === 'id' ? id : enUS}
            className="w-full"
          />
        </PopoverContent>
      </Popover>
    </motion.div>
  );
};

export default DateRangePickerInput;
