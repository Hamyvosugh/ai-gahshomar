// src/components/Calendar/CalendarGrid.tsx
import React from 'react';
import { toGregorian, jalaaliMonthLength } from 'jalaali-js';
import { toPersianDigits, toGregorianDigits } from '@/utils/utils';
import { CalendarEvent } from '@/types/eventSchema';

interface CalendarGridProps {
  isPersianCalendar: boolean;
  persianDate: { year: number; month: number; day: number };
  currentDate: Date;
  holidays: string[];
  events: CalendarEvent[];
  selectedDay: number | null;
  onDayClick: (day: number, dayEvents: CalendarEvent[]) => void;
  onGoToToday: () => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  isPersianCalendar,
  persianDate,
  currentDate,
  holidays,
  events,
  selectedDay,
  onDayClick,
  onGoToToday
}) => {
  // Persian weekdays
  const persianWeekdays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  
  // Gregorian weekdays
  const gregorianWeekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Generate calendar days
  const generateCalendarDays = () => {
    let days = [];
    let startDay, totalDays;

    if (isPersianCalendar) {
      // For Persian calendar
      const firstDayOfMonth = toGregorian(persianDate.year, persianDate.month, 1);
      const firstDayDate = new Date(firstDayOfMonth.gy, firstDayOfMonth.gm - 1, firstDayOfMonth.gd);
      startDay = (firstDayDate.getDay() + 1) % 7; // Adjust for Persian calendar (week starts on Saturday)
      totalDays = jalaaliMonthLength(persianDate.year, persianDate.month);
    } else {
      // For Gregorian calendar
      const firstDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      startDay = firstDayDate.getDay();
      totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    }

    // Add empty cells for days before the 1st of month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
      let dateStr;
      let gregorianDateStr = '';
      
      if (isPersianCalendar) {
        // Convert Persian date to Gregorian for comparison
        const gregorianDate = toGregorian(persianDate.year, persianDate.month, day);
        dateStr = `${persianDate.year}-${String(persianDate.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Format gregorian date for display
        const gDate = new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd);
        gregorianDateStr = `${gDate.getDate()}/${gDate.getMonth() + 1}`;
      } else {
        // For Gregorian calendar
        dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Convert to Persian for display
        const persianDate = toJalaali(currentDate.getFullYear(), currentDate.getMonth() + 1, day);
        gregorianDateStr = `${persianDate.jd}/${persianDate.jm}`;
      }

      // Check if day is a holiday
      const isHoliday = holidays.includes(dateStr);
      
      // Check if day has events
      const dayEvents = events.filter(event => event.date === dateStr);
      const hasEvent = dayEvents.length > 0;
      
      // Check if day has personal events
      const hasPersonalEvent = dayEvents.some(event => event.isPersonal);
      const hasOtherEvent = dayEvents.some(event => !event.isPersonal);
      
      // Check if this is today
      let isToday = false;
      if (isPersianCalendar) {
        const today = new Date();
        const todayPersian = toJalaali(today.getFullYear(), today.getMonth() + 1, today.getDate());
        isToday = persianDate.year === todayPersian.jy && 
                  persianDate.month === todayPersian.jm && 
                  day === todayPersian.jd;
      } else {
        const today = new Date();
        isToday = currentDate.getFullYear() === today.getFullYear() && 
                  currentDate.getMonth() === today.getMonth() && 
                  day === today.getDate();
      }

      days.push(
        <div 
          key={`day-${day}`}
          className={`
            aspect-square flex flex-col justify-center items-center rounded text-sm cursor-pointer transition-all
            ${isToday ? 'border-3 border-green-500 bg-green-100 dark:bg-green-800/30 font-bold shadow-lg transform scale-110 transition-transform duration-200 text-green-800 ring-1 ring-green-300' : ''}
            ${isHoliday ? 'bg-red-900/80 text-white border-2 border-red-500 rounded-xl shadow-lg font-bold transform scale-110' : ''}
            ${hasPersonalEvent && !isHoliday && !isToday ? 'bg-purple-800/70 hover:bg-purple-700/90 border-l-3 border-purple-400 cursor-pointer transition-colors duration-200 text-white hover:text-purple-100 shadow-md font-medium rounded md:rounded-4xl' : ''}
            ${hasOtherEvent && !hasPersonalEvent && !isHoliday && !isToday ? 'bg-blue-800/70 hover:bg-blue-700/90 border-l-3 border-blue-400 cursor-pointer transition-colors duration-200 text-white hover:text-blue-100 shadow-md font-medium' : ''}
            ${!hasEvent && !isHoliday && !isToday ? 'bg-gray-800/20 hover:bg-gray-900/70 transition-colors duration-150 cursor-default text-blue-950 hover:text-gray-100 hover:scale-105 hover:font-medium' : ''}
            ${selectedDay === day ? 'ring-2 ring-ai-primary ring-offset-1 ring-offset-gray-900 transform scale-105 shadow-md transition-all duration-200' : ''}
          `}
          onClick={() => onDayClick(day, dayEvents)}
        >
          <span className={`${isPersianCalendar ? 'text-base' : 'text font-bold'} ${isHoliday ? 'text-white' : isToday ? 'text-green-800' : hasEvent && !isHoliday && !isToday ? 'text-white' : 'text-blue-950'}`}>
            {isPersianCalendar ? toPersianDigits(day) : day}
          </span>
          <span className={`text-xs ${isPersianCalendar ? '' : 'text-base'} ${isHoliday ? 'text-red-100' : isToday ? 'text-green-600' : hasEvent && !isHoliday && !isToday ? 'text-blue-100' : 'text-blue-800'}`}>
            {isPersianCalendar ? toGregorianDigits(gregorianDateStr) : toPersianDigits(gregorianDateStr)}
          </span>
          {hasEvent && (
            <span className={`h-1.5 w-1.5 rounded-full mt-1 animate-pulse
              ${hasPersonalEvent ? 'bg-purple-300' : 'bg-blue-300'}
            `}></span>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="lg:flex-1 bg-indigo-50 text-blue-950 backdrop-blur-sm rounded-b-xl lg:rounded-br-none p-4 border-x border-b border-gray-600 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Weekdays Header */}
      <div className="grid grid-cols-7 gap-2 mb-4 ">
        {(isPersianCalendar ? persianWeekdays : gregorianWeekdays).map((day, idx) => (
          <div key={`weekday-${idx}`} className="text-center  text-s text-gray-700">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2 mb-6 ">
        {generateCalendarDays()}
      </div>
      
      {/* Back to Today Button */}
      <div className="flex justify-center mt-4 ">
        <button 
          className="px-4 py-2 bg-ai-dark hover:bg-gray-800 hover:text-amber-50 text-ai-primary border border-ai-primary/30 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ai-primary/50 active:transform active:scale-95"
          onClick={onGoToToday}
          aria-label="Go to today"
        >
          {isPersianCalendar ? 'برگشت به امروز' : 'Back to Today'}
        </button>
      </div>
    </div>
  );
};

// Add missing import that was missed in component extraction
import { toJalaali } from 'jalaali-js';

export default CalendarGrid;