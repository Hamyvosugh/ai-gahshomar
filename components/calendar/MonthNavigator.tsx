// src/components/Calendar/CalendarNavigation.tsx
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

interface CalendarNavigationProps {
  isPersianCalendar: boolean;
  persianDate: { year: number; month: number; day: number };
  currentDate: Date;
  futureYear: number;
  persianFutureYear?: string;
  onChangeMonth: (delta: number) => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  isPersianCalendar,
  persianDate,
  currentDate,
  futureYear,
  persianFutureYear,
  onChangeMonth
}) => {
  // حالت برای نمایش/عدم نمایش منوی ماه‌ها
  const [monthDropdownOpen, setMonthDropdownOpen] = useState<boolean>(false);
  
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
  
  // تعیین ماه‌های قابل نمایش در منوی کشویی
  const months = isPersianCalendar ? persianMonths : gregorianMonths;
  
  // تغییر به ماه مشخص
  const goToMonth = (monthIndex: number) => {
    let currentMonthIndex;
    
    if (isPersianCalendar) {
      currentMonthIndex = persianDate.month - 1;
    } else {
      currentMonthIndex = currentDate.getMonth();
    }
    
    // محاسبه اختلاف ماه برای تغییر
    const delta = monthIndex - currentMonthIndex;
    
    // اعمال تغییر ماه
    onChangeMonth(delta);
    
    // بستن منوی کشویی
    setMonthDropdownOpen(false);
  };

  return (
    <div className="pb-2">
      <div className="flex justify-between items-center">
        <button 
          className="p-2 hover:bg-gray-200 hover:text-blue-950 rounded-full transition-all"
          onClick={() => onChangeMonth(-1)}
        >
          <ArrowRight className="h-5 w-5 text-ai-primary" />
        </button>
        
        <div className="text-center relative">
          {/* نمایش ماه و سال آینده (فقط برای تقویم فارسی) */}
          <div className="flex justify-center items-center text-2xl font-bold text-white">
            {/* دکمه آیکون دراپ‌داون */}
            <div className="relative">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
              >
                <span>{getMonthName()}</span>
                <ChevronDown className="h-5 w-5 mr-1 text-ai-primary" />
              </div>
              
              {/* منوی کشویی ماه‌ها */}
              {monthDropdownOpen && (
                <div className="absolute z-10 mt-1 py-2 w-50 bg-gray-950 text-white rounded-lg shadow-lg right-0 max-h-96  overflow-auto">
                  {months.map((month, index) => (
                    <div 
                      key={index} 
                      className={`px-4 py-2 cursor-pointer hover:bg-ai-primary/20 transition-colors duration-200 ${
                        (isPersianCalendar && index === persianDate.month - 1) || 
                        (!isPersianCalendar && index === currentDate.getMonth())
                          ? 'bg-ai-primary/30'
                          : ''
                      }`}
                      onClick={() => goToMonth(index)}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* فقط اگر تقویم فارسی باشد، سال آینده با اعداد فارسی نمایش داده شود */}
            {isPersianCalendar && persianFutureYear && (
              <span className="mr-2 text-ai-primary">{persianFutureYear}</span>
            )}
          </div>
          
          <div className="flex flex-col text-sm">
            {/* نمایش سال فعلی - میلادی به لاتین، شمسی به فارسی */}
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
          className="p-2 hover:bg-gray-200 hover:text-blue-950 rounded-full transition-all"
          onClick={() => onChangeMonth(1)}
        >
          <ArrowLeft className="h-5 w-5 text-ai-primary" />
        </button>
      </div>
    </div>
  );
};

export default CalendarNavigation;