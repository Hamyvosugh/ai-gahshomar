// components/hero/data/calendarSystems.ts

export interface CalendarSystem {
    name: string;
    yearDifference: number;
    requires_calculation?: boolean;
    show_month?: boolean;
  }
  
  export const calendarSystems: CalendarSystem[] = [
    { name: 'ایلامی', yearDifference: 3821 },
    { name: 'زرتشتی', yearDifference: 2359 },
    { name: 'کردی', yearDifference: 1321 }, // Same as Persian/Solar Hijri
    { name: 'شاهنشاهی', yearDifference: 1180 },
    { name: 'تبری', yearDifference: 132 },
    { name: 'ه.شمسی', yearDifference: 0 }, // Same as Persian
    { name: 'قمری', yearDifference: -621, requires_calculation: true, show_month: true }, // Lunar Hijri with month name
    { name: 'میلادی', yearDifference: 621, requires_calculation: true }, // Gregorian
  ];
  
  /**
   * Calculate all calendar years based on Persian year
   * @param persianYear - Persian/Solar Hijri year
   * @returns Array of calendar years with names
   */
  export function calculateAllCalendarYears(persianYear: number): { name: string; year: number }[] {
    // Function to calculate Gregorian year from Persian year
    const calculateGregorianYear = (persianYear: number): number => {
      // More precise calculation considering leap years
      const persianMonthDay = 11; // Assumed day/month for better precision
      const persianMonth = 3;
      
      // Convert Persian date to JavaScript Date (which uses Gregorian)
      const gregorianDate = jalaliToGregorian(persianYear, persianMonth, persianMonthDay);
      return gregorianDate.getFullYear();
    };
  
    // Function to calculate Lunar Hijri year from Persian year
    const calculateLunarHijriYear = (persianYear: number): number => {
      // First convert Persian to Gregorian
      const gregorianYear = calculateGregorianYear(persianYear);
      
      // Then convert Gregorian to Lunar Hijri using the formula:
      // H = G - 622 + (G - 622) / 32
      // where H is Hijri year and G is Gregorian year
      // This formula gives a more accurate approximation than the previous method
      return Math.floor((gregorianYear - 622) * (33/32));
    };
  
    return calendarSystems.map(calendar => {
      if (calendar.requires_calculation) {
        if (calendar.name === 'میلادی') {
          return { name: calendar.name, year: calculateGregorianYear(persianYear) };
        } else if (calendar.name === 'قمری') {
          const gregorianYear = calculateGregorianYear(persianYear);
          // Calculate full hijri date to get month name
          const now = new Date();
          const hijriDate = gregorianToHijri(gregorianYear, now.getMonth() + 1, now.getDate());
          const hijriMonthName = getHijriMonthName(hijriDate.hijriMonth);
          
          // Convert day number to Persian numerals and place it before month name
          const persianDay = convertToPersianNumerals(hijriDate.hijriDay);
          
          // Return day and month name instead of "قمری"
          return { 
            name: `${persianDay} ${hijriMonthName}`, 
            year: hijriDate.hijriYear 
          };
        }
      }
      
      return { name: calendar.name, year: persianYear + calendar.yearDifference };
    });
  }
  
  /**
   * Convert Jalali (Persian) date to Gregorian date
   * @param jy Jalali year
   * @param jm Jalali month (1-12)
   * @param jd Jalali day (1-31)
   * @returns JavaScript Date object representing the Gregorian date
   */
  function jalaliToGregorian(jy: number, jm: number, jd: number): Date {
    // Julian day number algorithm
    let gy: number;
    if (jy > 979) {
      gy = 1600;
      jy -= 979;
    } else {
      gy = 621;
    }
  
    let days = (365 * jy) + (Math.floor(jy / 33) * 8) + Math.floor(((jy % 33) + 3) / 4) + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    gy += 400 * Math.floor(days / 146097);
    days %= 146097;
  
    if (days > 36524) {
      gy += 100 * Math.floor(--days / 36524);
      days %= 36524;
      if (days >= 365) days++;
    }
  
    gy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
      gy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
  
    let gd = days + 1;
    const sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let gm: number;
    for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) {
      gd -= sal_a[gm];
    }
  
    return new Date(gy, gm - 1, gd, 0, 0, 0, 0);
  }
  
  /**
   * Convert English numerals to Persian numerals
   * @param number The number to convert
   * @returns The Persian numeral string
   */
  export function convertToPersianNumerals(number: number): string {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return number.toString().replace(/\d/g, digit => persianDigits[parseInt(digit)]);
  }
  
  /**
   * Get Hijri (Islamic) month name in Arabic
   * @param monthNumber Month number (1-12)
   * @returns Arabic name of the month
   */
  export function getHijriMonthName(monthNumber: number): string {
    const hijriMonths = [
      'محرم',      // Muharram
      'صفر',       // Safar
      'ربيع الأول', // Rabi' al-Awwal
      'ربيع الثاني', // Rabi' al-Thani
      'جمادى الأولى', // Jumada al-Awwal
      'جمادى الآخرة', // Jumada al-Thani
      'رجب',       // Rajab
      'شعبان',     // Sha'ban
      'رمضان',     // Ramadan
      'شوال',      // Shawwal
      'ذو القعدة',  // Dhu al-Qi'dah
      'ذو الحجة'    // Dhu al-Hijjah
    ];
    
    // Make sure month number is between 1-12
    const index = ((monthNumber - 1) % 12 + 12) % 12;
    return hijriMonths[index];
  }
  
  /**
   * More accurately convert Gregorian to Lunar Hijri date
   * This is a more complete implementation for date conversion
   * @param gregorianYear Gregorian year
   * @param gregorianMonth Gregorian month (1-12)
   * @param gregorianDay Gregorian day (1-31)
   * @returns Object with hijriYear, hijriMonth, hijriDay
   */
  export function gregorianToHijri(gregorianYear: number, gregorianMonth: number, gregorianDay: number): { 
    hijriYear: number; 
    hijriMonth: number; 
    hijriDay: number 
  } {
    // Julian date calculation
    gregorianMonth += 1; // Adjust from 0-based to 1-based month
    let julianDay = Math.floor((1461 * (gregorianYear + 4800 + Math.floor((gregorianMonth - 14) / 12))) / 4) +
      Math.floor((367 * (gregorianMonth - 2 - 12 * Math.floor((gregorianMonth - 14) / 12))) / 12) -
      Math.floor((3 * Math.floor((gregorianYear + 4900 + Math.floor((gregorianMonth - 14) / 12)) / 100)) / 4) +
      gregorianDay - 32075;
  
    // Lunar Hijri date calculation
    julianDay = julianDay - 1948440 + 10632;
    const n = Math.floor((julianDay - 1) / 10631);
    julianDay = julianDay - 10631 * n + 354;
    
    const j = Math.floor((10985 - julianDay) / 5316) *
      Math.floor((50 * julianDay) / 17719) +
      Math.floor(julianDay / 5670) *
      Math.floor((43 * julianDay) / 15238);
    
    julianDay = julianDay - Math.floor((30 - j) / 15) *
      Math.floor((17719 * j) / 50) -
      Math.floor(j / 16) *
      Math.floor((15238 * j) / 43) + 29;
    
    const hijriMonth = Math.floor((24 * julianDay) / 709);
    const hijriDay = julianDay - Math.floor((709 * hijriMonth) / 24);
    const hijriYear = 30 * n + j - 30;
  
    return {
      hijriYear,
      hijriMonth,
      hijriDay
    };
  }