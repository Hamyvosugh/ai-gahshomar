// components/hero/utils/persianHelper.ts

/**
 * Convert English digits to Persian digits
 * @param num - Number or string to convert
 * @returns String with Persian digits
 */
export function toPersianNum(num: number | string): string {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, m => persianDigits[parseInt(m)]);
  }
  
  /**
   * Get Persian month name
   * @param monthIndex - Month index (1-12)
   * @returns Persian month name
   */
  export function getPersianMonthName(monthIndex: number): string {
    const monthNames: string[] = [
      'فروردین', 'اردیبهشت', 'خرداد',
      'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر',
      'دی', 'بهمن', 'اسفند'
    ];
    return monthNames[monthIndex - 1]; // monthIndex is 1-based
  }
  
  /**
   * Get ancient Persian name for day of week
   * @param dayIndex - Day index (0-6, where 0 is Sunday)
   * @returns Ancient Persian day name
   */
  export function getAncientPersianWeekDay(dayIndex: number): string {
    const ancientNames: string[] = [
      'مهر شید', 'مَه شید', 'بهرام شید',
      'تیر شید', 'اورمزد شید', 'ناهید شید', 'کیوان شید'
    ];
    return ancientNames[dayIndex];
  }
  
  /**
   * Get Persian day of week
   * @param dayIndex - Day index (0-6, where 0 is Sunday)
   * @returns Persian day name
   */
  export function getPersianWeekDay(dayIndex: number): string {
    const weekDays: string[] = [
      'یکشنبه', 'دوشنبه', 'سه‌شنبه',
      'چهارشنبه', 'پنج‌شنبه', 'آدینه', 'شنبه'
    ];
    return weekDays[dayIndex];
  }
  
  /**
   * Calculate day of year in Persian calendar
   * @param persianDate - Persian date object
   * @returns Day of year (1-366)
   */
  export function calculateDayOfYear(persianDate: { year: number; month: number; day: number }): number {
    const monthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]; // Persian calendar month days
    let dayOfYear = persianDate.day;
    
    for (let i = 0; i < persianDate.month - 1; i++) {
      dayOfYear += monthDays[i];
    }
    
    return dayOfYear;
  }
  
  /**
   * Check if a Persian year is leap year
   * @param year - Persian year
   * @returns Boolean indicating if leap year
   */
  export function isPersianLeapYear(year: number): boolean {
    return (year % 33 === 1 || year % 33 === 5 || 
            year % 33 === 9 || year % 33 === 13 || 
            year % 33 === 17 || year % 33 === 22 || 
            year % 33 === 26 || year % 33 === 30);
  }
  
  /**
   * Calculate remaining days in Persian year
   * @param persianDate - Persian date object
   * @returns Number of remaining days
   */
  export function calculateRemainingDays(persianDate: { year: number; month: number; day: number }): number {
    const isLeapYear = isPersianLeapYear(persianDate.year);
    const totalDays = isLeapYear ? 366 : 365;
    const dayOfYear = calculateDayOfYear(persianDate);
    
    return totalDays - dayOfYear;
  }