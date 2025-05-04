// /components/convertor/constants.ts
import { Calendar } from './types';
  
export const calendars: Calendar[] = [
  { 
    id: 'jalali', 
    name: 'هجری شمسی', 
    months: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'] 
  },
  { 
    id: 'gregorian', 
    name: 'میلادی',
    months: ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'] 
  },
  { 
    id: 'islamic', 
    name: 'هجری قمری',
    months: ['محرم', 'صفر', 'ربیع‌الاول', 'ربیع‌الثانی', 'جمادی‌الاول', 'جمادی‌الثانی', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذی‌القعده', 'ذی‌الحجه'] 
  },
  { id: 'elami', name: 'ایلامی', yearDifference: 3821, baseCalendar: 'jalali' },
  { id: 'zoroastrian', name: 'زرتشتی', yearDifference: 2359, baseCalendar: 'jalali' },
  { id: 'kurdish', name: 'کردی', yearDifference: 1321, baseCalendar: 'jalali' },
  { id: 'imperial', name: 'شاهنشاهی', yearDifference: 1180, baseCalendar: 'jalali' },
  { id: 'tabari', name: 'تبری', yearDifference: 132, baseCalendar: 'jalali' }
];
