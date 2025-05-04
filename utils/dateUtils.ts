// utils/dateUtils.ts

// Persian month names
export const persianMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  
  // Persian day names
  export const persianDayNames = [
    'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'
  ];
  
  /**
   * Converts Gregorian date to Persian (Jalali) date
   * This is a simplified version - for production use a library like moment-jalaali
   * @param date - JavaScript Date object
   * @returns Object containing Persian date components
   */
  export const gregorianToPersian = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      calendar: 'persian',
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric'
    };
    
    // Get raw Persian date string (e.g., "1402/11/16")
    const persianDateStr = new Intl.DateTimeFormat('fa-IR', options).format(date);
    
    // Parse the components
    const parts = persianDateStr.split('/');
    const persianYear = parseInt(parts[0].replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))));
    const persianMonth = parseInt(parts[1].replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))));
    const persianDay = parseInt(parts[2].replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))));
    
    return {
      year: persianYear,
      month: persianMonth,
      day: persianDay,
      monthName: persianMonths[persianMonth - 1],
      dayName: persianDayNames[date.getDay()],
      formatted: `${persianDay} ${persianMonths[persianMonth - 1]} ${persianYear}`
    };
  };
  
  /**
   * Formats a time with Persian digits
   * @param hours - Hours (0-23)
   * @param minutes - Minutes (0-59)
   * @param seconds - Seconds (0-59)
   * @returns Object with formatted time components
   */
  export const formatPersianTime = (hours: number, minutes: number, seconds: number) => {
    // Convert to 12-hour format
    const hour12 = hours % 12 || 12;
    const period = hours >= 12 ? 'ب.ظ' : 'ق.ظ';
    
    // Format with leading zeros
    const hourStr = hour12.toString().padStart(2, '0');
    const minuteStr = minutes.toString().padStart(2, '0');
    const secondStr = seconds.toString().padStart(2, '0');
    
    // Convert to Persian digits if needed
    const toPersianDigits = (str: string) => {
      const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return str.replace(/[0-9]/g, (match) => persianDigits[parseInt(match)]);
    };
    
    return {
      hour: hourStr,
      minute: minuteStr,
      second: secondStr,
      period,
      hourPersian: toPersianDigits(hourStr),
      minutePersian: toPersianDigits(minuteStr),
      secondPersian: toPersianDigits(secondStr)
    };
  };
  
  /**
   * Calculates sunrise and sunset times based on date and approximate location
   * This is a simplified calculation - for production use SunCalc library
   * @param date - Date object
   * @param latitude - Latitude (optional)
   * @param longitude - Longitude (optional)
   * @returns Object with sunrise, sunset and daylight information
   */
  export const calculateSunTimes = (date: Date, latitude?: number, longitude?: number) => {
    // Default to Tehran coordinates if not provided
    const lat = latitude || 35.6892;
    const lng = longitude || 51.3890;
    
    const month = date.getMonth();
    
    // Very simplified approximation based on season
    // In production, use a proper solar calculation library
    let sunrise, sunset, daylightHours, daylightMinutes;
    
    if (month >= 2 && month <= 4) { // Spring
      sunrise = '06:00';
      sunset = '19:00';
      daylightHours = 13;
      daylightMinutes = 0;
    } else if (month >= 5 && month <= 7) { // Summer
      sunrise = '05:30';
      sunset = '20:00';
      daylightHours = 14;
      daylightMinutes = 30;
    } else if (month >= 8 && month <= 10) { // Fall
      sunrise = '06:30';
      sunset = '18:00';
      daylightHours = 11;
      daylightMinutes = 30;
    } else { // Winter
      sunrise = '07:00';
      sunset = '17:00';
      daylightHours = 10;
      daylightMinutes = 0;
    }
    
    // Check if it's currently daytime
    const currentHour = date.getHours();
    const sunriseHour = parseInt(sunrise.split(':')[0]);
    const sunsetHour = parseInt(sunset.split(':')[0]);
    const isDaytime = currentHour >= sunriseHour && currentHour < sunsetHour;
    
    return {
      sunrise,
      sunset,
      daylight: `${daylightHours}h ${daylightMinutes}m`,
      isDaytime
    };
  };