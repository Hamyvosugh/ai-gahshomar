'use client';
import { useEffect, useState, useRef } from 'react';
import jalaali from 'jalaali-js';
import DayInfo from './DayInfo';
import CalendarYears from './CalendarYears';

interface PersianDate {
  year: number;
  month: number;
  day: number;
}

export default function CalendarHero() {
  // استفاده از useRef برای ذخیره اندازه‌های کامپوننت
  const componentRef = useRef<HTMLDivElement>(null);
  
  const [date, setDate] = useState<{
    persianDate: PersianDate;
    gregorianDate: Date;
    weekDay: number;
  }>({
    persianDate: { year: 1404, month: 2, day: 12 },
    gregorianDate: new Date(),
    weekDay: 0,
  });

  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('desktop');
  
  // به جای isLoaded از یک متغیر mounted استفاده می‌کنیم
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get current date
    const now = new Date();
    
    // Convert to Jalaali
    const jalaaliDate = jalaali.toJalaali(now);
    const persianDate: PersianDate = {
      year: jalaaliDate.jy,
      month: jalaaliDate.jm,
      day: jalaaliDate.jd
    };
    
    setDate({
      persianDate,
      gregorianDate: now,
      weekDay: now.getDay(),
    });

    // Check viewport size and set view mode
    const handleResize = () => {
      setViewMode(window.innerWidth < 768 ? 'mobile' : 'desktop');
    };
    
    // Initialize view mode
    handleResize();
    
    // Component is now mounted
    setMounted(true);
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Content component that will be rendered in both states
  const CalendarContent = () => (
    viewMode === 'mobile' ? (
      // Mobile View
      <div className="bg-(--back1) text-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-4 flex flex-col">
          {/* Top section with Persian date */}
          <DayInfo 
            persianDate={date.persianDate} 
            weekDay={date.weekDay} 
          />
          
          {/* Calendar years section */}
          <CalendarYears 
            persianYear={date.persianDate.year} 
          />
        </div>
      </div>
    ) : (
      // Desktop View - با CalendarYears در وسط
      <div className="text-white rounded-lg max-h-30 overflow-hidden h-2/5">
        <div className="h-full grid grid-cols-12 gap-2 p-4">
          {/* Left: Persian Date (3 columns) */}
          <div className="col-span-3 flex flex-col">
            <div className="h-full">
              <DayInfo 
                persianDate={date.persianDate} 
                weekDay={date.weekDay} 
              />
            </div>
          </div>
          
          {/* Center: Calendar Years (9 columns با تراز مرکز) */}
          <div className="col-span-9 flex justify-center items-center">
            <div className="w-3/4 h-full pb-32">
              <CalendarYears 
                persianYear={date.persianDate.year}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="text-right mb-10 min-h-[200px]" dir="rtl" ref={componentRef}>
      {/* 
        به جای نمایش/عدم نمایش، از opacity و visibility استفاده می‌کنیم
        که باعث می‌شود فضا رزرو شود اما محتوا دیده نشود
      */}
      <div 
        className={`transition-opacity duration-300 ${mounted ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <CalendarContent />
      </div>
    </div>
  );
}