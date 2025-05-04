// /components/convertor/utils.ts
import jalaali from 'jalaali-js';
import { calendars } from './constants';

// ثابت‌های پیام خطا به زبان فارسی
const ERROR_MESSAGES = {
  INVALID_YEAR: 'سال وارد شده معتبر نیست',
  INVALID_MONTH: 'ماه وارد شده معتبر نیست (باید بین ۱ تا ۱۲ باشد)',
  INVALID_DAY: 'روز وارد شده معتبر نیست',
  CALENDAR_NOT_FOUND: 'تقویم مورد نظر یافت نشد',
  CONVERSION_ERROR: 'خطا در تبدیل تاریخ رخ داده است',
  NEGATIVE_YEAR: ' شما سال دوری را انتخاب کرده اید . نتیجه قابل قبولی این برابریابی به دست نمیدهد.. از شما میخواهیم که بازگردید و سال را به جلوتر بیاورید، حداقل به این میزان:  ',
};

// Convert English numbers to Persian
export const toPersianNumber = (num: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/[0-9]/g, function(match) {
    return persianDigits[parseInt(match)];
  });
};

// Convert Persian or English numbers to English
export const toEnglishNumber = (num: string): string => {
  return num.replace(/[۰-۹]/g, function(match) {
    return String(["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"].indexOf(match));
  });
};

// تبدیل تاریخ میلادی به هجری قمری
const gregorianToIslamic = (gy: number, gm: number, gd: number) => {
  // الگوریتم تبدیل گرگوری به اسلامی (هجری قمری)
  const jd = gregorianToJulianDay(gy, gm, gd);
  return julianDayToIslamic(jd);
};

// تبدیل تاریخ هجری قمری به میلادی
const islamicToGregorian = (iy: number, im: number, id: number) => {
  // الگوریتم تبدیل اسلامی (هجری قمری) به گرگوری
  const jd = islamicToJulianDay(iy, im, id);
  return julianDayToGregorian(jd);
};

// تبدیل تاریخ گرگوری به روز ژولیانی
const gregorianToJulianDay = (year: number, month: number, day: number) => {
  // اصلاح شماره ماه (ژانویه و فوریه به سال قبل تعلق می‌گیرند)
  let y = year;
  let m = month;
  if (m < 3) {
    y -= 1;
    m += 12;
  }

  // محاسبه روز ژولیانی
  const a = Math.floor(y / 100);
  const b = Math.floor(a / 4);
  const c = 2 - a + b;
  const e = Math.floor(365.25 * (y + 4716));
  const f = Math.floor(30.6001 * (m + 1));
  return c + day + e + f - 1524.5;
};

// تبدیل روز ژولیانی به تاریخ گرگوری
const julianDayToGregorian = (jd: number) => {
  const z = Math.floor(jd + 0.5);
  const a = Math.floor((z - 1867216.25) / 36524.25);
  const b = z + 1 + a - Math.floor(a / 4);
  const c = b + 1524;
  const d = Math.floor((c - 122.1) / 365.25);
  const e = Math.floor(365.25 * d);
  const f = Math.floor((c - e) / 30.6001);

  const day = c - e - Math.floor(30.6001 * f);
  let month = f - 1;
  if (month > 12) month -= 12;
  let year = d - 4716;
  if (month < 3) year += 1;

  return { gy: year, gm: month, gd: Math.floor(day) };
};

// تبدیل تاریخ هجری قمری به روز ژولیانی
const islamicToJulianDay = (year: number, month: number, day: number) => {
  // کم کردن ۱ روز از ورودی برای تصحیح اختلاف شروع روز
  const adjustedDay = Math.max(1, day - 1);
  return Math.floor((11 * year + 3) / 30) + Math.floor(354 * year) + Math.floor(30 * month) - Math.floor((month - 1) / 2) + adjustedDay + 1948440 - 385;
};

// تبدیل روز ژولیانی به تاریخ هجری قمری
const julianDayToIslamic = (jd: number) => {
  const jd1 = Math.floor(jd) + 0.5;
  const year = Math.floor((30 * (jd1 - 1948440) + 10646) / 10631);
  const month = Math.min(12, Math.ceil((jd1 - (29 + islamicToJulianDay(year, 1, 1))) / 29.5) + 1);
  // اضافه کردن ۱ روز برای تصحیح اختلاف شروع روز در تقویم هجری قمری
  const day = Math.floor(jd1 - islamicToJulianDay(year, month, 1)) + 2;
  
  // تصحیح روز در صورت تجاوز از تعداد روزهای ماه
  const daysInMonth = month % 2 === 1 ? 30 : (month === 12 ? ((year * 11 + 14) % 30 < 11 ? 30 : 29) : 29);
  if (day > daysInMonth) {
    if (month === 12) {
      return { year: year + 1, month: 1, day: 1 };
    } else {
      return { year, month: month + 1, day: 1 };
    }
  }
  
  return { year, month, day };
};

// دریافت تعداد روزهای ماه در تقویم مشخص
export const getDaysInMonth = (year: number, month: number, calendarType: string): number => {
  if (calendarType === 'jalali') {
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    return jalaali.isLeapJalaaliYear(year) ? 30 : 29;
  } else if (calendarType === 'gregorian') {
    return new Date(year, month, 0).getDate();
  } else if (calendarType === 'islamic') {
    // در تقویم هجری قمری، ماه‌های فرد ۳۰ روزه و ماه‌های زوج ۲۹ روزه هستند
    // اما این قاعده کلی است و استثناهایی هم دارد
    if (month === 12) {
      // محاسبه سال کبیسه اسلامی (تقریبی)
      const isLeapYear = (year * 11 + 14) % 30 < 11;
      return isLeapYear ? 30 : 29;
    }
    return month % 2 === 1 ? 30 : 29;
  }
  
  // برای تقویم‌های سفارشی بر اساس تقویم جلالی
  return getDaysInMonth(year, month, 'jalali');
};

// اعتبارسنجی ورودی‌ها
const validateDateInputs = (year: number, month: number, day: number, calendarType: string): string | null => {
  if (isNaN(year) || year < 0) {
    return ERROR_MESSAGES.NEGATIVE_YEAR;
  }
  
  if (isNaN(month) || month < 1 || month > 12) {
    return ERROR_MESSAGES.INVALID_MONTH;
  }
  
  if (isNaN(day) || day < 1) {
    return ERROR_MESSAGES.INVALID_DAY;
  }
  
  const daysInMonth = getDaysInMonth(year, month, calendarType);
  if (day > daysInMonth) {
    return `${ERROR_MESSAGES.INVALID_DAY} (حداکثر ${toPersianNumber(daysInMonth)} روز برای ماه ${toPersianNumber(month)})`;
  }
  
  return null;
};

// تبدیل تاریخ بین تقویم‌ها
export const convertDate = (sourceCalendar: string, targetCalendar: string, year: number, month: number, day: number) => {
  // اعتبارسنجی ورودی‌ها
  const validationError = validateDateInputs(year, month, day, sourceCalendar);
  if (validationError) {
    throw new Error(validationError);
  }

  let gregorianDate, jalaliDate;
  
  try {
    // ابتدا به تاریخ گرگوری به عنوان واسط تبدیل کنید
    if (sourceCalendar === 'jalali') {
      gregorianDate = jalaali.toGregorian(year, month, day);
    } else if (sourceCalendar === 'gregorian') {
      gregorianDate = { gy: year, gm: month, gd: day };
    } else if (sourceCalendar === 'islamic') {
      // استفاده از الگوریتم دقیق‌تر برای تبدیل اسلامی به گرگوری
      gregorianDate = islamicToGregorian(year, month, day);
    } else {
      // تقویم‌های سفارشی بر اساس جلالی
      const calendar = calendars.find(c => c.id === sourceCalendar);
      if (calendar && calendar.yearDifference && calendar.baseCalendar === 'jalali') {
        // اصلاح خط با بررسی معتبر بودن سال پس از کسر تفاوت سال
        const adjustedYear = year - calendar.yearDifference;
        if (adjustedYear < 0) {
          throw new Error(`${ERROR_MESSAGES.NEGATIVE_YEAR} (${toPersianNumber(year)} - ${toPersianNumber(calendar.yearDifference)} = ${toPersianNumber(adjustedYear)})`);
        }
        gregorianDate = jalaali.toGregorian(adjustedYear, month, day);
      } else {
        // حالت پیش‌فرض
        if (!calendar) {
          throw new Error(ERROR_MESSAGES.CALENDAR_NOT_FOUND);
        }
        gregorianDate = { gy: year, gm: month, gd: day };
      }
    }
    
    // سپس از گرگوری به تقویم هدف تبدیل کنید
    if (targetCalendar === 'jalali') {
      jalaliDate = jalaali.toJalaali(gregorianDate.gy, gregorianDate.gm, gregorianDate.gd);
      return { year: jalaliDate.jy, month: jalaliDate.jm, day: jalaliDate.jd };
    } else if (targetCalendar === 'gregorian') {
      return { year: gregorianDate.gy, month: gregorianDate.gm, day: gregorianDate.gd };
    } else if (targetCalendar === 'islamic') {
      // استفاده از الگوریتم دقیق‌تر برای تبدیل گرگوری به اسلامی
      const islamicDate = gregorianToIslamic(gregorianDate.gy, gregorianDate.gm, gregorianDate.gd);
      return { year: islamicDate.year, month: islamicDate.month, day: islamicDate.day };
    } else {
      // تقویم‌های سفارشی بر اساس جلالی
      const calendar = calendars.find(c => c.id === targetCalendar);
      if (calendar && calendar.yearDifference && calendar.baseCalendar === 'jalali') {
        jalaliDate = jalaali.toJalaali(gregorianDate.gy, gregorianDate.gm, gregorianDate.gd);
        return { year: jalaliDate.jy + calendar.yearDifference, month: jalaliDate.jm, day: jalaliDate.jd };
      } else {
        // حالت پیش‌فرض
        if (!calendar) {
          throw new Error(ERROR_MESSAGES.CALENDAR_NOT_FOUND);
        }
        return { year: gregorianDate.gy, month: gregorianDate.gm, day: gregorianDate.gd };
      }
    }
  } catch (error: unknown) {
    // تبدیل error به نوع Error برای دسترسی به خصوصیت message
    const errorObj = error as Error;
    
    if (errorObj.message && (
        errorObj.message.includes(ERROR_MESSAGES.NEGATIVE_YEAR) || 
        errorObj.message.includes(ERROR_MESSAGES.INVALID_MONTH) || 
        errorObj.message.includes(ERROR_MESSAGES.INVALID_DAY) ||
        errorObj.message.includes(ERROR_MESSAGES.CALENDAR_NOT_FOUND))) {
      throw error;
    }
    throw new Error(`${ERROR_MESSAGES.CONVERSION_ERROR}: ${errorObj.message || 'خطای ناشناخته'}`);
  }
};

// تابع نمایش خطا به کاربر
export const showPersianError = (error: Error) => {
  // این تابع می‌تواند به روش‌های مختلف پیاده‌سازی شود (مثلاً نمایش toast یا alert)
  console.error(`خطا: ${error.message}`);
  return error.message;
};