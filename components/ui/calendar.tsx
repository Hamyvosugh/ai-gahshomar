
// components/ui/calendar.tsx
import { useState } from 'react';
import { getCurrentPersianMonth, getPersianMonthName } from '@/lib/jalali-calendar';

interface CalendarProps {
  onMonthChange: (month: number) => void;
  currentMonth?: number;
}

export default function Calendar({ onMonthChange, currentMonth = getCurrentPersianMonth() }: CalendarProps) {
  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md rtl">
      <h3 className="text-lg font-bold mb-4 text-center">انتخاب ماه</h3>
      <div className="grid grid-cols-3 gap-3">
        {months.map((month, index) => (
          <button
            key={month}
            onClick={() => onMonthChange(index + 1)}
            className={`py-2 px-4 rounded-md text-center transition-colors ${
              currentMonth === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
}