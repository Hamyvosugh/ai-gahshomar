// /components/convertor/SlideMonthSelect.tsx
  import React from 'react';
  import { calendars } from './constants';
  
  interface SlideMonthSelectProps {
    sourceCalendar: string;
    onSelect: (month: number) => void;
    onBack: () => void;
  }
  
  const SlideMonthSelect: React.FC<SlideMonthSelectProps> = ({ sourceCalendar, onSelect, onBack }) => {
    const getCalendarMonths = () => {
      const calendar = calendars.find(c => c.id === sourceCalendar);
      if (!calendar) return [];
      
      if (calendar.months) return calendar.months;
      
      // For custom calendars, use Jalali months
      return calendars.find(c => c.id === 'jalali')?.months || [];
    };
  
    const months = getCalendarMonths();
  
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-xl mb-6 text-right text-blue-950 w-full">لطفاً ماه را انتخاب کنید</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 w-full mb-8">
          {months.map((monthName, index) => (
            <button
              key={index}
              className="bg-green-900/50 hover:bg-gray-500 text-white py-3 px-2 rounded-lg transition-colors"
              onClick={() => onSelect(index + 1)}
            >
              {monthName}
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
  
  export default SlideMonthSelect;
  