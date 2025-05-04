// /components/Calendar/PersianCalendar.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { toJalaali, toGregorian, jalaaliMonthLength } from 'jalaali-js';
import { getMonthEvents, getHolidays } from '@/utils/calendarData';
import { usePersonalEventsForCalendar } from '@/components/PersonalEvents/hooks/usePersonalEventsForCalendar';


// Components
import CalendarHeader from './CalendarHeader';
import CountrySelector from '@/components/calendar/CountrySelector';
import CalendarNavigation from '@/components/calendar/MonthNavigator';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import EventsList from '@/components/calendar/EventsList';
import EventPopup from '@/components/calendar/EventPopup';

// Types
import { CalendarEvent, CountryOption } from '@/types/eventSchema';

// Helper function to convert numbers to Persian numerals
const toPersianNumbers = (num: number): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

const PersianCalendar: React.FC = () => {
  // Countries
  const countries: CountryOption[] = [
    { value: 'iran', label: 'ایران', flag: ' 🟢 ' },
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
  
  // Convert future year to Persian numerals
  const persianFutureYear = toPersianNumbers(futureYear);
  
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

    // personal event
    const { personalEvents, loading: personalEventsLoading } = usePersonalEventsForCalendar(
      isPersianCalendar ? persianDate.year : currentDate.getFullYear(),
      isPersianCalendar ? persianDate.month : currentDate.getMonth() + 1,
      isPersianCalendar
    );
  
    // Combine personal events with calendar events
    const combinedEvents = [...events];
    
    // Add personal events to the calendar
    personalEvents.forEach(personalEvent => {
      const calendarEvent = {
        id: personalEvent.id,
        date: personalEvent.date,
        title: personalEvent.title,
        description: personalEvent.description || '',
        isHoliday: false,
        country: ['personal'],
        type: 'personal',
        isPersonal: true // Add this flag to distinguish personal events
      };
      combinedEvents.push(calendarEvent);
    });

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
<div dir="rtl" className="font-iransans bg-(--back1) text-ai-text p-2 rounded-2xl border border-ai-primary/20 lg:w-[70vw] h-auto mx-auto relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-br from-ai-primary/5 to-ai-secondary/5 z-0"></div>
      <div className="absolute top-0 left-0 w-62 h-64 bg-ai-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-ai-secondary/5 rounded-full blur-3xl"></div>
      
      {/* Neural network pattern overlay */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="h-full w-full bg-neural-pattern bg-neural"></div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10">
        {/* Header with AI branding */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <CalendarHeader 
            isPersianCalendar={isPersianCalendar} 
          />
          
          {/* Country Selector */}
          <CountrySelector 
            countries={countries}
            selectedCountry={selectedCountry}
            isDropdownOpen={countryDropdownOpen}
            setIsDropdownOpen={setCountryDropdownOpen}
            onCountryChange={changeCountry}
          />
        </div>
        
        {/* Calendar Header with Navigation - Pass Persian Future Year */}
        <CalendarNavigation 
          isPersianCalendar={isPersianCalendar}
          persianDate={persianDate}
          currentDate={currentDate}
          futureYear={futureYear}
          persianFutureYear={persianFutureYear}
          onChangeMonth={changeMonth}
        />
        
        {/* Calendar and Events Container */}
        <div className="lg:flex">
          {/* Calendar Grid */}
          <CalendarGrid 
            isPersianCalendar={isPersianCalendar}
            persianDate={persianDate}
            currentDate={currentDate}
            holidays={holidays}
            events={combinedEvents}
            selectedDay={selectedDay}
            onDayClick={handleDayClick}
            onGoToToday={goToToday}
          />
          
          {/* Events List */}
          <EventsList 
            isPersianCalendar={isPersianCalendar}
            events={combinedEvents}
          />
        </div>
      </div>
      
      {/* Event Popup */}
      {selectedEvent && (
        <EventPopup 
          event={selectedEvent}
          isPersianCalendar={isPersianCalendar}
          onClose={closeEventPopup}
        />
      )}
    </div>
  );
};

export default PersianCalendar;