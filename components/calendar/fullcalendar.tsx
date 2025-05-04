'use client';
import React, { useState, useEffect } from 'react';
import { toJalaali, toGregorian, jalaaliMonthLength } from 'jalaali-js';
import { ArrowRight, ArrowLeft, Calendar as CalendarIcon, ChevronDown, X, ExternalLink } from 'lucide-react';
import { getMonthEvents, getHolidays } from '@/utils/calendarData';
import { toPersianDigits, toGregorianDigits } from '@/utils/utils';

// Types
interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD format
  title: string;
  description: string;
  isHoliday: boolean;
  country: string[];
  blogUrl?: string;
}

interface CountryOption {
  value: string;
  label: string;
  flag: string;
}

const PersianCalendar: React.FC = () => {
  // Countries
  const countries: CountryOption[] = [
    { value: 'iran', label: 'ایران', flag: '🟢' },
    { value: 'usa', label: 'آمریکا', flag: '🇺🇸' },
    { value: 'germany', label: 'آلمان', flag: '🇩🇪' },
    { value: 'uae', label: 'امارات', flag: '🇦🇪' },
  ];

  // State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState<string>('iran');
  const [isPersianCalendar, setIsPersianCalendar] = useState<boolean>(true);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [holidays, setHolidays] = useState<string[]>([]);

  // Calculate current persian date
  const getPersianDate = () => {
    const persianDate = toJalaali(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate()
    );
    return { year: persianDate.jy, month: persianDate.jm, day: persianDate.jd };
  };

  const persianDate = getPersianDate();
  
  // Calculate future year (current year + 1180)
  const futureYear = isPersianCalendar 
    ? persianDate.year + 1180 
    : currentDate.getFullYear() + 1180;
  
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

  // Persian weekdays
  const persianWeekdays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  
  // Gregorian weekdays
  const gregorianWeekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Get month name based on calendar type
  const getMonthName = () => {
    if (isPersianCalendar) {
      return persianMonths[persianDate.month - 1];
    } else {
      return gregorianMonths[currentDate.getMonth()];
    }
  };

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
            ${isToday ? 'bg-ai-primary/30 border border-ai-primary/50' : ''}
            ${isHoliday ? 'bg-ai-secondary/30 text-white border border-ai-secondary/50' : ''}
            ${hasEvent && !isHoliday && !isToday ? 'bg-gray-800/50 hover:bg-gray-700/60' : ''}
            ${!hasEvent && !isHoliday && !isToday ? 'bg-gray-800/20 hover:bg-gray-800/40' : ''}
            ${selectedDay === day ? 'ring-2 ring-ai-primary' : ''}
          `}
          onClick={() => handleDayClick(day, dayEvents)}
        >
          <span className={`${isPersianCalendar ? 'text-base' : 'text-xs text-gray-400'}`}>
            {isPersianCalendar ? toPersianDigits(day) : day}
          </span>
          <span className={`text-xs ${isPersianCalendar ? 'text-gray-400' : 'text-base text-white'}`}>
            {isPersianCalendar ? toGregorianDigits(gregorianDateStr) : toPersianDigits(gregorianDateStr)}
          </span>
          {hasEvent && <span className="h-1 w-1 bg-ai-primary rounded-full mt-1"></span>}
        </div>
      );
    }
    
    return days;
  };

  // Change month
  const changeMonth = (delta: number) => {
    setSelectedDay(null);
    setSelectedEvent(null);
    
    const newDate = new Date(currentDate);
    
    if (isPersianCalendar) {
      // For Persian calendar
      let { jy, jm } = toJalaali(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      );
      
      jm += delta;
      
      if (jm > 12) {
        jm = 1;
        jy += 1;
      } else if (jm < 1) {
        jm = 12;
        jy -= 1;
      }
      
      const jd = Math.min(jalaaliMonthLength(jy, jm), 29);
      const gDate = toGregorian(jy, jm, jd);
      newDate.setFullYear(gDate.gy, gDate.gm - 1, gDate.gd);
    } else {
      // For Gregorian calendar
      newDate.setMonth(newDate.getMonth() + delta);
    }
    
    setCurrentDate(newDate);
  };

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDay(null);
    setSelectedEvent(null);
  };

  // Change country
  const changeCountry = (country: string) => {
    setSelectedCountry(country);
    setCountryDropdownOpen(false);
    setSelectedDay(null);
    setSelectedEvent(null);
    
    // Set calendar type based on country
    setIsPersianCalendar(country === 'iran');
  };

  // Handle day click
  const handleDayClick = (day: number, dayEvents: CalendarEvent[]) => {
    setSelectedDay(day);
    
    if (dayEvents.length > 0) {
      setSelectedEvent(dayEvents[0]);
    } else {
      setSelectedEvent(null);
    }
  };

  // Close event popup
  const closeEventPopup = () => {
    setSelectedEvent(null);
    setSelectedDay(null);
  };

  // Load events for current month
  useEffect(() => {
    const loadEvents = async () => {
      let year, month;
      
      if (isPersianCalendar) {
        year = persianDate.year;
        month = persianDate.month;
      } else {
        year = currentDate.getFullYear();
        month = currentDate.getMonth() + 1;
      }
      
      // Get events and holidays
      const monthEvents = await getMonthEvents(year, month, isPersianCalendar, selectedCountry);
      const monthHolidays = await getHolidays(year, month, isPersianCalendar, selectedCountry);
      
      setEvents(monthEvents);
      setHolidays(monthHolidays);
    };
  
    loadEvents();
  }, [currentDate, selectedCountry, isPersianCalendar]);
  return (
    <div dir="rtl" className="font-iransans bg-ai-bg text-ai-text p-6 rounded-2xl border border-ai-primary/20 max-w-4xl mx-auto relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-ai-primary/5 to-ai-secondary/5 z-0"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-ai-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-ai-secondary/5 rounded-full blur-3xl"></div>
      
      {/* Neural network pattern overlay */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="h-full w-full bg-neural-pattern bg-neural"></div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10">
        {/* Header with AI branding */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
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
          
          {/* Country Selector */}
          <div className="relative">
            <button 
              className="flex items-center bg-ai-dark/70 hover:bg-ai-dark/90 rounded-lg py-2 px-4 border border-gray-700 transition-colors"
              onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
            >
              <span className="mr-2">{countries.find(c => c.value === selectedCountry)?.flag}</span>
              <span>{countries.find(c => c.value === selectedCountry)?.label}</span>
              <ChevronDown className="h-4 w-4 mr-2 text-gray-400" />
            </button>
            
            {countryDropdownOpen && (
              <div className="absolute top-full mt-1 right-0 bg-ai-dark border border-gray-700 rounded-lg shadow-lg z-30 w-full">
                {countries.map((country) => (
                  <button
                    key={country.value}
                    className="flex items-center w-full text-right py-2 px-4 hover:bg-gray-800 transition-colors"
                    onClick={() => changeCountry(country.value)}
                  >
                    <span className="mr-2">{country.flag}</span>
                    <span>{country.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Calendar Header with Navigation */}
        <div className="bg-ai-dark/80 rounded-t-xl p-4 border-b border-gray-700/50">
          <div className="flex justify-between items-center">
            <button 
              className="p-2 bg-ai-dark hover:bg-gray-800 rounded-full transition-all"
              onClick={() => changeMonth(-1)}
            >
              <ArrowRight className="h-5 w-5 text-ai-primary" />
            </button>
            
            <div className="text-center">
              <h2 className="text-xl font-bold text-white">{getMonthName()}</h2>
              <div className="flex flex-col text-sm">
                <span className="text-ai-primary font-medium">{futureYear}</span>
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
              onClick={() => changeMonth(1)}
            >
              <ArrowLeft className="h-5 w-5 text-ai-primary" />
            </button>
          </div>
        </div>
        
        {/* Calendar and Events Container */}
        <div className="lg:flex">
          {/* Calendar Grid */}
          <div className="lg:flex-1 bg-ai-panel backdrop-blur-sm rounded-b-xl lg:rounded-br-none p-4 border-x border-b border-gray-700/50">
            {/* Weekdays Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {(isPersianCalendar ? persianWeekdays : gregorianWeekdays).map((day, idx) => (
                <div key={`weekday-${idx}`} className="text-center text-xs text-gray-400">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {generateCalendarDays()}
            </div>
            
            {/* Back to Today Button */}
            <div className="flex justify-center mt-4">
              <button 
                className="px-4 py-2 bg-ai-dark hover:bg-gray-800 text-ai-primary border border-ai-primary/30 rounded-lg transition-colors"
                onClick={goToToday}
              >
                {isPersianCalendar ? 'برگشت به امروز' : 'Back to Today'}
              </button>
            </div>
            
            {/* Event Popup */}
            {selectedEvent && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <div className="relative bg-ai-dark/95 border border-ai-primary/30 rounded-xl p-6 max-w-md w-full backdrop-blur-md">
                  <button 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    onClick={closeEventPopup}
                  >
                    <X className="h-5 w-5" />
                  </button>
                  
                  <div className="mb-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${selectedEvent.isHoliday ? 'bg-ai-secondary/20 text-ai-secondary' : 'bg-ai-primary/20 text-ai-primary'}`}>
                      {selectedEvent.isHoliday ? (isPersianCalendar ? 'تعطیل رسمی' : 'Holiday') : (isPersianCalendar ? 'رویداد' : 'Event')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{selectedEvent.title}</h3>
                  <p className="text-gray-300 mb-6">{selectedEvent.description}</p>
                  
                  {selectedEvent.blogUrl && (
                    <a 
                      href={selectedEvent.blogUrl}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-ai-primary to-ai-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      {isPersianCalendar ? 'مشاهده بیشتر' : 'Read More'}
                      <ExternalLink className="h-4 w-4 mr-2" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Events List */}
          <div className="lg:w-1/3 bg-ai-panel backdrop-blur-sm rounded-b-xl lg:rounded-bl-none p-4 border-b border-r border-gray-700/50 lg:border-l-0 mt-4 lg:mt-0">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <CalendarIcon className="h-5 w-5 ml-2 text-ai-primary" />
              {isPersianCalendar ? 'رویدادهای این ماه' : 'Events This Month'}
            </h3>
            
            {events.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {events.map((event) => (
                  <a
                    key={event.id}
                    href={event.blogUrl}
                    className="block p-3 bg-ai-dark/80 rounded-lg border border-gray-700/50 hover:border-ai-primary/30 transition-all group"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full mb-1 ${event.isHoliday ? 'bg-ai-secondary/20 text-ai-secondary' : 'bg-ai-primary/20 text-ai-primary'}`}>
                          {event.isHoliday ? (isPersianCalendar ? 'تعطیل' : 'Holiday') : (isPersianCalendar ? 'رویداد' : 'Event')}
                        </span>
                        <h4 className="font-medium text-white group-hover:text-ai-primary transition-colors">{event.title}</h4>
                        <p className="text-sm text-gray-400 line-clamp-2">{event.description}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                {isPersianCalendar ? 'رویدادی در این ماه وجود ندارد' : 'No events this month'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersianCalendar;