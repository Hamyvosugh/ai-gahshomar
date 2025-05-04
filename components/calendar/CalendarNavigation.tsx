// src/components/Calendar/CalendarNavigation.tsx
import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface CalendarNavigationProps {
  isPersianCalendar: boolean;
  persianDate: { year: number; month: number; day: number };
  currentDate: Date;
  futureYear: number;
  onChangeMonth: (delta: number) => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  isPersianCalendar,
  persianDate,
  currentDate,
  futureYear,
  onChangeMonth
}) => {
  // Persian months
  const persianMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  
  // Gregorian months
  const gregorianMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Get month name based on calendar type
  const getMonthName = () => {
    if (isPersianCalendar) {
      return persianMonths[persianDate.month - 1];
    } else {
      return gregorianMonths[currentDate.getMonth()];
    }
  };

  return (
    <div className="bg-ai-dark/80 rounded-t-xl p-4 border-b border-gray-700/50">
      <div className="flex justify-between items-center">
        <button 
          className="p-2 bg-ai-dark hover:bg-gray-800 rounded-full transition-all"
          onClick={() => onChangeMonth(-1)}
        >
          <ArrowRight className="h-5 w-5 text-ai-primary" />
        </button>
        
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">{getMonthName()}</h2>
          <div className="flex flex-col text-sm ">
            <span className="text-ai-primary font-medium ">{futureYear}</span>
            <span className="text-gray-400">
              ({isPersianCalendar ? persianDate.year : currentDate.getFullYear()})
            </span>
            <span className="text-xs text-gray-500">
              {isPersianCalendar 
                ? `${currentDate.getFullYear()} / ${currentDate.getMonth() + 1}`
                : `${persianDate.year} / ${persianDate.month}`
              }
            </span>
          </div>
        </div>
        
        <button 
          className="p-2 bg-ai-dark hover:bg-gray-800 rounded-full transition-all"
          onClick={() => onChangeMonth(1)}
        >
          <ArrowLeft className="h-5 w-5 text-ai-primary" />
        </button>
      </div>
    </div>
  );
};

export default CalendarNavigation;