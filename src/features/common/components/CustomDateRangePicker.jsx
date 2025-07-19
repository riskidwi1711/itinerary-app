import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { id, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

const CustomDateRangePicker = ({ startDate, endDate, setStartDate, setEndDate, MIN_DATE, MAX_DATE }) => {
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
    <div className="flex flex-col bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-white border-opacity-60">
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
        className="w-full h-full"
      />
    </div>
  );
};

export default CustomDateRangePicker;
