// components/hero/data/avestanDays.ts

export interface AvestanDay {
    id: number;
    name: string;
    description: string;
  }
  
  export const avestanDays: AvestanDay[] = [
    { id: 1, name: 'هرمزد', description: 'نام خداوند، هستی بخش دانا' },
    { id: 2, name: 'بهمن', description: 'پندار و خرد نیک' },
    { id: 3, name: 'اردیبهشت', description: 'بهترین راستی' },
    { id: 4, name: 'شهریور', description: 'شهریاری نیرومند' },
    { id: 5, name: 'سپندارمذ', description: 'فروتنی' },
    { id: 6, name: 'خرداد', description: 'تندرستی و رسایی' },
    { id: 7, name: 'امرداد', description: 'بی‌مرگی' },
    { id: 8, name: 'دی به آذر', description: 'آفریدگار' },
    { id: 9, name: 'آذر', description: 'آتش' },
    { id: 10, name: 'آبان', description: 'آب' },
    { id: 11, name: 'خور', description: 'آفتاب' },
    { id: 12, name: 'ماه', description: 'ماه' },
    { id: 13, name: 'تیر', description: 'ستارهٔ تیر' },
    { id: 14, name: 'گوش', description: 'جهان، هستی و زندگی' },
    { id: 15, name: 'دی به مهر', description: 'آفریدگار' },
    { id: 16, name: 'مهر', description: 'دوستی و پیمان' },
    { id: 17, name: 'سروش', description: 'فرمانبرداری' },
    { id: 18, name: 'رَشن', description: 'دادگری' },
    { id: 19, name: 'فروردین', description: 'فروهر، پیشرو' },
    { id: 20, name: 'ورهرام', description: 'پیروزی' },
    { id: 21, name: 'رام', description: 'خوشی' },
    { id: 22, name: 'باد', description: 'باد' },
    { id: 23, name: 'دی به دین', description: 'آفریدگار' },
    { id: 24, name: 'دین', description: 'وجدان بینش درونی' },
    { id: 25, name: 'ارد', description: 'خوشبختی دارائی' },
    { id: 26, name: 'اشتاد', description: 'راستی' },
    { id: 27, name: 'آسمان', description: 'آسمان' },
    { id: 28, name: 'زامیاد', description: 'زمین' },
    { id: 29, name: 'مهراسپند', description: 'گفتار نیک' },
    { id: 30, name: 'انیران', description: 'نور جاوید، فروغ و روشنایی بی‌پایان' },
    { id: 31, name: 'ایران', description: 'این نام پیشنهاد گاهشمار است چرا که روز ۳۱ در گاهشمار باستانی ایران وجود نداشته است' },
  ];
  
  /**
   * Get Avestan day data for a specific day of month
   * @param dayOfMonth - Day of month (1-31)
   * @returns AvestanDay object
   */
  export function getAvestanDayForDate(dayOfMonth: number): AvestanDay {
    // Ensure the day is within bounds (1-31)
    const normalizedDay = Math.max(1, Math.min(31, dayOfMonth));
    
    // Subtract 1 for zero-based array index
    return avestanDays[normalizedDay - 1];
  }