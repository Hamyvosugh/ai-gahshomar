// src/utils/eventDateUtils.ts
import * as jalaali from 'jalaali-js';

/**
 * محاسبه تفاوت روزها بین تاریخ رویداد و امروز با در نظر گرفتن چرخه سالانه
 */
export const calculateDaysDifference = (eventDateStr: string, isPersianCalendar: boolean): { 
  daysText: string, 
  isPassed: boolean,
  isToday: boolean 
} => {
  // تبدیل تاریخ امروز به میلادی و شمسی
  const today = new Date();
  const todayG = {
    gy: today.getFullYear(),
    gm: today.getMonth() + 1,
    gd: today.getDate()
  };
  
  const todayJ = jalaali.toJalaali(todayG.gy, todayG.gm, todayG.gd);
  
  // استخراج سال، ماه و روز از تاریخ رویداد
  const [eventYear, eventMonth, eventDay] = eventDateStr.split('-').map(part => parseInt(part));
  
  // بررسی آیا تاریخ رویداد شمسی است یا میلادی
  const isEventPersian = eventDateStr.startsWith('14');
  
  // اگر هر دو تاریخ (رویداد و تقویم) شمسی هستند
  if (isEventPersian && isPersianCalendar) {
    // بررسی آیا رویداد امروز است
    if (eventMonth === todayJ.jm && eventDay === todayJ.jd) {
      return { daysText: 'امروز', isPassed: false, isToday: true };
    }
    
    // محاسبه روز سال برای رویداد و امروز
    const getDayOfYear = (jMonth: number, jDay: number): number => {
      let dayOfYear = 0;
      for (let m = 1; m < jMonth; m++) {
        if (m <= 6) dayOfYear += 31;
        else if (m <= 11) dayOfYear += 30;
        else dayOfYear += jalaali.isLeapJalaaliYear(todayJ.jy) ? 30 : 29;
      }
      return dayOfYear + jDay;
    };
    
    const eventDayOfYear = getDayOfYear(eventMonth, eventDay);
    const todayDayOfYear = getDayOfYear(todayJ.jm, todayJ.jd);
    
    // محاسبه تفاوت روزها
    if (eventDayOfYear >= todayDayOfYear) {
      // رویداد در آینده است (امسال)
      const daysRemaining = eventDayOfYear - todayDayOfYear;
      return { 
        daysText: formatDaysText(daysRemaining, false, true), 
        isPassed: false, 
        isToday: false 
      };
    } else {
      // رویداد در سال جاری گذشته و در سال آینده تکرار می‌شود
      const daysInYear = jalaali.isLeapJalaaliYear(todayJ.jy) ? 366 : 365;
      const daysRemaining = daysInYear - todayDayOfYear + eventDayOfYear;
      return { 
        daysText: formatDaysText(daysRemaining, false, true), 
        isPassed: false, 
        isToday: false 
      };
    }
  }
  // اگر هر دو تاریخ (رویداد و تقویم) میلادی هستند
  else if (!isEventPersian && !isPersianCalendar) {
    // بررسی آیا رویداد امروز است
    if (eventMonth === todayG.gm && eventDay === todayG.gd) {
      return { daysText: 'Today', isPassed: false, isToday: true };
    }
    
    // محاسبه روز سال برای رویداد و امروز
    const getDayOfYear = (gMonth: number, gDay: number): number => {
      const date = new Date(todayG.gy, gMonth - 1, gDay);
      const startOfYear = new Date(todayG.gy, 0, 0);
      const diff = date.getTime() - startOfYear.getTime();
      return Math.floor(diff / (1000 * 60 * 60 * 24));
    };
    
    const eventDayOfYear = getDayOfYear(eventMonth, eventDay);
    const todayDayOfYear = getDayOfYear(todayG.gm, todayG.gd);
    
    // محاسبه تفاوت روزها
    if (eventDayOfYear >= todayDayOfYear) {
      // رویداد در آینده است (امسال)
      const daysRemaining = eventDayOfYear - todayDayOfYear;
      return { 
        daysText: formatDaysText(daysRemaining, false, false), 
        isPassed: false, 
        isToday: false 
      };
    } else {
      // رویداد در سال جاری گذشته و در سال آینده تکرار می‌شود
      const isLeapYear = (year: number): boolean => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
      };
      const daysInYear = isLeapYear(todayG.gy) ? 366 : 365;
      const daysRemaining = daysInYear - todayDayOfYear + eventDayOfYear;
      return { 
        daysText: formatDaysText(daysRemaining, false, false), 
        isPassed: false, 
        isToday: false 
      };
    }
  }
  // اگر رویداد شمسی است اما تقویم میلادی
  else if (isEventPersian && !isPersianCalendar) {
    // تبدیل رویداد شمسی به میلادی برای امسال
    const thisYearEventG = jalaali.toGregorian(todayJ.jy, eventMonth, eventDay);
    const nextYearEventG = jalaali.toGregorian(todayJ.jy + 1, eventMonth, eventDay);
    
    // بررسی آیا رویداد امروز است
    if (thisYearEventG.gm === todayG.gm && thisYearEventG.gd === todayG.gd) {
      return { daysText: 'Today', isPassed: false, isToday: true };
    }
    
    // تبدیل تاریخ‌ها به میلی‌ثانیه
    const todayMs = new Date(todayG.gy, todayG.gm - 1, todayG.gd).getTime();
    const thisYearEventMs = new Date(thisYearEventG.gy, thisYearEventG.gm - 1, thisYearEventG.gd).getTime();
    const nextYearEventMs = new Date(nextYearEventG.gy, nextYearEventG.gm - 1, nextYearEventG.gd).getTime();
    
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    
    // اگر رویداد امسال هنوز نرسیده
    if (thisYearEventMs >= todayMs) {
      const daysRemaining = Math.round((thisYearEventMs - todayMs) / MS_PER_DAY);
      return { 
        daysText: formatDaysText(daysRemaining, false, false), 
        isPassed: false, 
        isToday: false 
      };
    } else {
      // رویداد امسال گذشته، محاسبه تا سال آینده
      const daysRemaining = Math.round((nextYearEventMs - todayMs) / MS_PER_DAY);
      return { 
        daysText: formatDaysText(daysRemaining, false, false), 
        isPassed: false, 
        isToday: false 
      };
    }
  }
  // اگر رویداد میلادی است اما تقویم شمسی
  else {
    // تبدیل رویداد میلادی به شمسی
    const eventJalaali = jalaali.toJalaali(eventYear, eventMonth, eventDay);
    
    // تنظیم سال به سال جاری شمسی
    const thisYearEvent = {
      jy: todayJ.jy,
      jm: eventJalaali.jm,
      jd: eventJalaali.jd
    };
    
    const nextYearEvent = {
      jy: todayJ.jy + 1,
      jm: eventJalaali.jm,
      jd: eventJalaali.jd
    };
    
    // بررسی آیا رویداد امروز است
    if (thisYearEvent.jm === todayJ.jm && thisYearEvent.jd === todayJ.jd) {
      return { daysText: 'امروز', isPassed: false, isToday: true };
    }
    
    // تبدیل تاریخ‌های شمسی به میلادی برای محاسبه دقیق
    const thisYearEventG = jalaali.toGregorian(thisYearEvent.jy, thisYearEvent.jm, thisYearEvent.jd);
    const nextYearEventG = jalaali.toGregorian(nextYearEvent.jy, nextYearEvent.jm, nextYearEvent.jd);
    
    // تبدیل تاریخ‌ها به میلی‌ثانیه
    const todayMs = new Date(todayG.gy, todayG.gm - 1, todayG.gd).getTime();
    const thisYearEventMs = new Date(thisYearEventG.gy, thisYearEventG.gm - 1, thisYearEventG.gd).getTime();
    const nextYearEventMs = new Date(nextYearEventG.gy, nextYearEventG.gm - 1, nextYearEventG.gd).getTime();
    
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    
    // اگر رویداد امسال هنوز نرسیده
    if (thisYearEventMs >= todayMs) {
      const daysRemaining = Math.round((thisYearEventMs - todayMs) / MS_PER_DAY);
      return { 
        daysText: formatDaysText(daysRemaining, false, true), 
        isPassed: false, 
        isToday: false 
      };
    } else {
      // رویداد امسال گذشته، محاسبه تا سال آینده
      const daysRemaining = Math.round((nextYearEventMs - todayMs) / MS_PER_DAY);
      return { 
        daysText: formatDaysText(daysRemaining, false, true), 
        isPassed: false, 
        isToday: false 
      };
    }
  }
};

/**
 * فرمت‌بندی متن روزها (گذشته یا مانده)
 */
export const formatDaysText = (days: number, isPassed: boolean, isPersianCalendar: boolean): string => {
  if (days === 0) {
    return isPersianCalendar ? 'امروز' : 'Today';
  }
  
  if (isPersianCalendar) {
    const persianDigits = convertToPersianDigits(days);
    return isPassed 
      ? `${persianDigits} روز گذشته` 
      : `${persianDigits} روز مانده`;
  } else {
    return isPassed 
      ? `${days} days ago` 
      : `${days} days remaining`;
  }
};

/**
 * تبدیل اعداد به ارقام فارسی
 */
export const convertToPersianDigits = (num: number): string => {
  return num.toString().replace(/[0-9]/g, (d) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return persianDigits[parseInt(d)];
  });
};