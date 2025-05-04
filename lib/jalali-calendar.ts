// lib/jalali-calendar.ts
/**
 * Utility functions for Jalali (Persian) calendar
 */
import * as jalaali from 'jalaali-js';

export function getCurrentPersianMonth(): number {
  const now = new Date();
  const { jm } = jalaali.toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  return jm;
}

export function getPersianMonthName(month: number): string {
  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  return months[month - 1];
}

export function formatPersianDate(dateStr: string): string {
  const date = new Date(dateStr);
  const { jy, jm, jd } = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return `${jd} ${getPersianMonthName(jm)} ${jy}`;
}

export function getDaysUntilEvent(eventDateStr: string): number {
  // Parse the event date (example: "2 اردیبهشت")
  const [day, monthName] = eventDateStr.split(' ');
  
  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  
  const monthIndex = months.indexOf(monthName) + 1;
  
  // Get current Jalali date
  const now = new Date();
  const { jy, jm, jd } = jalaali.toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  
  // If the event month is before current month, assume it's for next year
  let eventYear = jy;
  if (monthIndex < jm || (monthIndex === jm && parseInt(day) < jd)) {
    eventYear = jy + 1;
  }
  
  // Convert event date to Gregorian
  const eventGregorian = jalaali.toGregorian(eventYear, monthIndex, parseInt(day));
  const eventDate = new Date(eventGregorian.gy, eventGregorian.gm - 1, eventGregorian.gd);
  
  // Calculate difference in days
  const diffTime = eventDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

export function isToday(eventDateStr: string): boolean {
  // Parse the event date (example: "2 اردیبهشت")
  const [day, monthName] = eventDateStr.split(' ');
  
  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  
  const monthIndex = months.indexOf(monthName) + 1;
  
  // Get current Jalali date
  const now = new Date();
  const { jy, jm, jd } = jalaali.toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  
  return jm === monthIndex && jd === parseInt(day);
}