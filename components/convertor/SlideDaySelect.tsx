// /components/convertor/SlideDaySelect.tsx
  import React from 'react';
  import { getDaysInMonth, toPersianNumber } from './utils';
  
  interface SlideDaySelectProps {
    sourceCalendar: string;
    year: number;
    month: number;
    onSelect: (day: number) => void;
    onBack: () => void;
  }
  
  const SlideDaySelect: React.FC<SlideDaySelectProps> = ({ 
    sourceCalendar, 
    year, 
    month, 
    onSelect, 
    onBack 
  }) => {
    const daysInMonth = getDaysInMonth(year, month, sourceCalendar);
    const dayButtons = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-xl mb-6 text-right w-full">لطفاً روز را انتخاب کنید</h2>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-4 w-full mb-8">
          {dayButtons.map(dayNum => (
            <button
              key={dayNum}
              className="bg-green-900/50 hover:bg-gray-500 text-white py-3 px-4 rounded-lg transition-colors"
              onClick={() => onSelect(dayNum)}
            >
              {toPersianNumber(dayNum)}
            </button>
          ))}
        </div>
        <div className="w-full">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg"
            onClick={onBack}
          >
            بازگشت
          </button>
        </div>
      </div>
    );
  };
  
  export default SlideDaySelect;
  