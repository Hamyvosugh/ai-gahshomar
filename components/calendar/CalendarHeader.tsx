// src/components/Calendar/CalendarHeader.tsx
import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

interface CalendarHeaderProps {
  isPersianCalendar: boolean;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ isPersianCalendar }) => {
  return (
    <div className="flex  items-center mb-4 sm:mb-0">
      <div className="flex justify-center items-center h-10 w-10 bg-ai-dark/80 rounded-lg mr-3">
        <CalendarIcon className="h-6 w-6 text-ai-primary" />
      </div>
      <div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ai-primary to-ai-secondary">
          {isPersianCalendar ? 'تقویم هوشمند ایرانی' : 'Smart Calendar'}
        </h1>
        <p className="text-xs text-gray-400">
          {isPersianCalendar ? 'با محاسبات دقیق سال‌های کبیسه' : 'With accurate leap year calculations'}
        </p>
      </div>
    </div>
  );
};

export default CalendarHeader;