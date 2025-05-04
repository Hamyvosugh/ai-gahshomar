// components/ui/month-selector.tsx
import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { getPersianMonthName } from '@/lib/jalali-calendar';

interface MonthSelectorProps {
  currentMonth: number;
  onMonthChange: (month: number) => void;
}

export default function MonthSelector({ currentMonth, onMonthChange }: MonthSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const months = [
    { value: 1, name: 'فروردین' },
    { value: 2, name: 'اردیبهشت' },
    { value: 3, name: 'خرداد' },
    { value: 4, name: 'تیر' },
    { value: 5, name: 'مرداد' },
    { value: 6, name: 'شهریور' },
    { value: 7, name: 'مهر' },
    { value: 8, name: 'آبان' },
    { value: 9, name: 'آذر' },
    { value: 10, name: 'دی' },
    { value: 11, name: 'بهمن' },
    { value: 12, name: 'اسفند' }
  ];

  const handleMonthSelect = (month: number) => {
    onMonthChange(month);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="انتخاب ماه"
      >
        <Calendar size={24} />
      </button>
      
      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-white rounded-lg shadow-xl p-4 rtl w-64">
          <h3 className="font-bold mb-3 text-gray-800">انتخاب ماه</h3>
          <div className="grid grid-cols-3 gap-2">
            {months.map(month => (
              <button
                key={month.value}
                onClick={() => handleMonthSelect(month.value)}
                className={`p-2 rounded-md text-sm ${
                  currentMonth === month.value
                    ? 'bg-blue-100 text-blue-800 font-medium'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {month.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}