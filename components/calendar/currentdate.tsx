'use client';
import React, { useState, useEffect } from 'react';

interface JalaliDate {
  jy: number;
  jm: number;
  jd: number;
}

interface PersianAndMiladiProps {
  className?: string;
}

const PersianAndMiladi: React.FC<PersianAndMiladiProps> = ({ className = '' }) => {
  const [date, setDate] = useState<Date>(new Date());
  
  useEffect(() => {
    // Update date once per day at midnight
    const now = new Date();
    const night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // tomorrow
      0, 0, 0 // at 00:00:00
    );
    const timeToMidnight = night.getTime() - now.getTime();
    
    const timer = setTimeout(() => {
      setDate(new Date());
    }, timeToMidnight);
    
    return () => clearTimeout(timer);
  }, [date]); // re-run when date changes
  
  // Format helper functions
  const convertToPersianDigits = (n: number): string => {
    const persianDigits: string[] = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().split('').map(char => {
      const digit = parseInt(char);
      return isNaN(digit) ? char : persianDigits[digit];
    }).join('');
  };
  
  // Get month name
  const getPersianMonth = (month: number): string => {
    const months: string[] = [
      'فروردین', 'اردیبهشت', 'خرداد', 
      'تیر', 'مرداد', 'شهریور', 
      'مهر', 'آبان', 'آذر', 
      'دی', 'بهمن', 'اسفند'
    ];
    return months[month - 1];
  };
  
  // Get day of week
  const getPersianWeekDay = (dayIndex: number): string => {
    const weekDays: string[] = [
      'یکشنبه', 'دوشنبه', 'سه‌شنبه', 
      'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'
    ];
    return weekDays[dayIndex];
  };
  
  // Get ancient Persian name for day
  const getAncientPersianWeekDay = (dayIndex: number): string => {
    const ancientNames: string[] = [
      'مهر شید', 'مَه شید', 'بهرام شید', 
      'تیر شید', 'اورمزد شید', 'ناهید شید', 'کیوان شید'
    ];
    return ancientNames[dayIndex];
  };
  
  // Convert Gregorian to Jalali date
  const toJalaali = (gy: number, gm: number, gd: number): JalaliDate => {
    const g_d_m: number[] = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let jy = (gy <= 1600) ? 0 : 979;
    gy -= (gy <= 1600) ? 621 : 1600;
    const gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = (365 * gy) + (Math.floor((gy2 + 3) / 4)) - (Math.floor((gy2 + 99) / 100)) + (Math.floor((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
    jy += 33 * (Math.floor(days / 12053));
    days %= 12053;
    jy += 4 * (Math.floor(days / 1461));
    days %= 1461;
    jy += Math.floor((days - 1) / 365);
    if (days > 365) days = (days - 1) % 365;
    const jm = (days < 186) ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
    const jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    return { jy, jm, jd };
  };
  
// Format Gregorian date
const getGregorianDateString = (date: Date): string => {
    const months: string[] = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year} `;
  };
  
  // Get today's date
  const now = date;
  const jalaliDate = toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const dayOfWeek = getPersianWeekDay(now.getDay());
  const ancientDayName = getAncientPersianWeekDay(now.getDay());
  const monthName = getPersianMonth(jalaliDate.jm);
  const persianDay = convertToPersianDigits(jalaliDate.jd);
  const gregorianDateString = getGregorianDateString(now);
  
  return (
    <div className={`persian-date-card ${className}`}>
      <div className="date-container p-6 backdrop-filter bg-gray-900/90 rounded-lg text-center shadow-[0_0_50px_rgba(59,130,246,0.2),inset_0_0_20px_rgba(30,64,175,0.2)] 
                      backdrop-blur-sm border border-white/5">
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold text-white mb-4">
            {persianDay} {monthName}
          </div>
          <div className="text-xl text-white/90 mb-3">
            {ancientDayName} ({dayOfWeek})
          </div>
          <div className="text-white/80 text-lg ltr" dir="ltr">
          {gregorianDateString}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersianAndMiladi;