// src/components/Calendar/CalendarUtils.ts
import { toJalaali, toGregorian } from 'jalaali-js';

/**
 * Get current Persian date from a Date object
 */
export const getPersianDate = (date: Date) => {
  const persianDate = toJalaali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  return { year: persianDate.jy, month: persianDate.jm, day: persianDate.jd };
};

/**
 * Format a date string based on calendar type
 */
export const formatDateString = (year: number, month: number, day: number, isPersian: boolean): string => {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

/**
 * Check if a given date is today
 */
export const isToday = (
  year: number, 
  month: number, 
  day: number, 
  isPersian: boolean,
  persianDate: { year: number; month: number; day: number },
  currentDate: Date
): boolean => {
  if (isPersian) {
    const today = new Date();
    const todayPersian = toJalaali(today.getFullYear(), today.getMonth() + 1, today.getDate());
    return year === todayPersian.jy && month === todayPersian.jm && day === todayPersian.jd;
  } else {
    const today = new Date();
    return year === today.getFullYear() && month === today.getMonth() + 1 && day === today.getDate();
  }
};

/**
 * Convert Gregorian date to Persian date display format (day/month)
 */
export const gregorianToPersianDisplay = (gYear: number, gMonth: number, gDay: number): string => {
  const persianDate = toJalaali(gYear, gMonth, gDay);
  return `${persianDate.jd}/${persianDate.jm}`;
};

/**
 * Convert Persian date to Gregorian date display format (day/month)
 */
export const persianToGregorianDisplay = (jYear: number, jMonth: number, jDay: number): string => {
  const gregorianDate = toGregorian(jYear, jMonth, jDay);
  const gDate = new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd);
  return `${gDate.getDate()}/${gDate.getMonth() + 1}`;
};