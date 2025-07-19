import React, { useState, useEffect, useMemo } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWithinInterval, isBefore, isAfter } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CustomCalendar = ({ startDate, endDate, setStartDate, setEndDate, MIN_DATE, MAX_DATE }) => {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState(startDate ? new Date(startDate) : null);
  const [selectedEnd, setSelectedEnd] = useState(endDate ? new Date(endDate) : null);

  useEffect(() => {
    setSelectedStart(startDate ? new Date(startDate) : null);
    setSelectedEnd(endDate ? new Date(endDate) : null);
  }, [startDate, endDate]);

  const daysInMonth = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDayClick = (day) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(day);
      setSelectedEnd(null);
    } else if (isBefore(day, selectedStart)) {
      setSelectedEnd(selectedStart);
      setSelectedStart(day);
    } else {
      setSelectedEnd(day);
    }
  };

  useEffect(() => {
    if (selectedStart && selectedEnd) {
      setStartDate(format(selectedStart, 'yyyy-MM-dd'));
      setEndDate(format(selectedEnd, 'yyyy-MM-dd'));
    } else if (selectedStart && !selectedEnd) {
      setStartDate(format(selectedStart, 'yyyy-MM-dd'));
      setEndDate(format(selectedStart, 'yyyy-MM-dd')); // Set end date to start date if only one is selected
    }
  }, [selectedStart, selectedEnd, setStartDate, setEndDate]);

  const isDaySelected = (day) => {
    if (!selectedStart) return false;
    if (selectedStart && !selectedEnd) return isSameDay(day, selectedStart);
    return isWithinInterval(day, { start: selectedStart, end: selectedEnd });
  };

  const isDayRangeStart = (day) => selectedStart && isSameDay(day, selectedStart);
  const isDayRangeEnd = (day) => selectedEnd && isSameDay(day, selectedEnd);

  return (
    <div className="bg-white/90 backdrop-blur-lg border border-white border-opacity-60 p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeft /></button>
        <h3 className="font-semibold text-lg">{format(currentMonth, 'MMMM yyyy')}</h3>
        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronRight /></button>
      </div>
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDayClick(day)}
            className={`p-2 rounded-lg cursor-pointer transition-colors duration-200
              ${isSameDay(day, new Date()) ? 'bg-blue-100 text-blue-700' : ''}
              ${isDaySelected(day) ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
              ${isDayRangeStart(day) && selectedEnd ? 'rounded-r-none' : ''}
              ${isDayRangeEnd(day) && selectedStart ? 'rounded-l-none' : ''}
              ${selectedStart && selectedEnd && isWithinInterval(day, { start: selectedStart, end: selectedEnd }) && !isSameDay(day, selectedStart) && !isSameDay(day, selectedEnd) ? 'bg-blue-200' : ''}
              ${isWithinInterval(day, { start: new Date(MIN_DATE), end: new Date(MAX_DATE) }) ? '' : 'text-gray-400 cursor-not-allowed'}
            `}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;
