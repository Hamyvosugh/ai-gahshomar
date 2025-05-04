import { toJalaali, toGregorian, jalaaliMonthLength } from 'jalaali-js';


// Types
interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD format
  title: string;
  description: string;
  isHoliday: boolean;
  country: string[];
  blogUrl?: string;
}

// Event data for Iran
const iranEvents: CalendarEvent[] = [
  {
    id: '1',
    date: '1404-01-01',
    title: 'نوروز',
    description: ' ۱ فروردین',
    isHoliday: true,
    country: ['iran'],
    blogUrl: '/blog/nowruz'
  },
  {
    id: '1',
    date: '1404-01-02',
    title: 'اول نوروز',
    description: 'جشن باستانی نوروز، آغاز سال نو در تقویم ایرانی',
    isHoliday: true,
    country: ['iran'],
    blogUrl: '/blog/nowruz'
  },
  {
    id: '1',
    date: '1404-01-03',
    title: 'نوروز',
    description: 'جشن باستانی نوروز، آغاز سال نو در تقویم ایرانی',
    isHoliday: true,
    country: ['iran'],
    blogUrl: '/blog/nowruz'
  },
  {
    id: '2',
    date: '1404-01-04',
    title: 'روز دوم نوروز',
    description: 'دومین روز از تعطیلات نوروزی',
    isHoliday: true,
    country: ['iran'],
    blogUrl: '/blog/nowruz-day2'
  },
  {
    id: '3',
    date: '1404-01-13',
    title: 'سیزده بدر',
    description: 'روز طبیعت، رسم دیرینه در فرهنگ ایرانی برای گذراندن روز سیزدهم فروردین در دامان طبیعت',
    isHoliday: true,
    country: ['iran'],
    blogUrl: '/blog/sizdah-bedar'
  },
  {
    id: '4',
    date: '1404-03-14',
    title: 'ولادت امام حسن مجتبی (ع)',
    description: 'جشن ولادت امام حسن مجتبی (ع)، دومین امام شیعیان',
    isHoliday: false,
    country: ['iran'],
    blogUrl: '/blog/imam-hassan-birth'
  },
  {
    id: '5',
    date: '1404-03-15',
    title: 'نیمه شعبان، ولادت امام زمان (عج)',
    description: 'سالروز ولادت حضرت مهدی (عج)، دوازدهمین امام شیعیان',
    isHoliday: true,
    country: ['iran'],
    blogUrl: '/blog/imam-mahdi-birth'
  },
  {
    id: '6',
    date: '1404-07-29',
    title: 'اربعین حسینی',
    description: 'چهلمین روز شهادت امام حسین (ع) و یاران ایشان در کربلا',
    isHoliday: true,
    country: ['iran', 'uae'],
    blogUrl: '/blog/arbaeen'
  },
  {
    id: '7',
    date: '1404-07-08',
    title: 'روز مولانا',
    description: 'بزرگداشت مولانا جلال‌الدین محمد بلخی، شاعر و عارف بزرگ ایرانی',
    isHoliday: false,
    country: ['iran'],
    blogUrl: '/blog/rumi-day'
  },
  {
    id: '8',
    date: '1404-08-01',
    title: 'روز آبان',
    description: 'جشن آبانگان، از جشن‌های ایران باستان',
    isHoliday: false,
    country: ['iran'],
    blogUrl: '/blog/aban-festival'
  },
  {
    id: '9',
    date: '1404-09-30',
    title: 'شب یلدا',
    description: 'شب چله، بلندترین شب سال و جشن باستانی ایرانیان',
    isHoliday: false,
    country: ['iran'],
    blogUrl: '/blog/yalda-night'
  },
  {
    id: '10',
    date: '1404-11-22',
    title: 'پیروزی انقلاب اسلامی',
    description: 'سالروز پیروزی انقلاب اسلامی ایران در سال ۱۳۵۷',
    isHoliday: true,
    country: ['iran'],
    blogUrl: '/blog/islamic-revolution'
  },
  {
    id: '11',
    date: '1404-12-29',
    title: 'روز ملی شدن صنعت نفت',
    description: 'سالروز ملی شدن صنعت نفت ایران',
    isHoliday: true,
    country: ['iran'],
    blogUrl: '/blog/oil-nationalization'
  },

  {
    id: '11',
    date: '1404-02-10',
    title: ' آغاز ساخت گاهشمار ۲',
    description: 'سالروز شروع ساخت گاهشمار دوم',
    isHoliday: false,
    country: ['iran'],
    blogUrl: '/blog/oil-nationalization'
  },
  {
    "id": "opy33nk22",
    "date": "1404-02-01",
    "title": "تست",
    "description": "آزمون",
    "isHoliday": true,
    "country": [
      "iran"
    ]
  }
];

/**
 * Convert date to format based on calendar type
 */
function formatDate(year: number, month: number, day: number, isPersian: boolean): string {
  if (isPersian) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  } else {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }
}

/**
 * Convert Persian date to Gregorian date format
 */
function persianToGregorian(jYear: number, jMonth: number, jDay: number): string {
  const { gy, gm, gd } = toGregorian(jYear, jMonth, jDay);
  return formatDate(gy, gm, gd, false);
}

/**
 * Convert Gregorian date to Persian date format
 */
function gregorianToPersian(gYear: number, gMonth: number, gDay: number): string {
  const { jy, jm, jd } = toJalaali(gYear, gMonth, gDay);
  return formatDate(jy, jm, jd, true);
}

/**
 * Get all events for a specific month
 */
export function getMonthEvents(year: number, month: number, isPersian: boolean, country: string): CalendarEvent[] {
  // Combine all events
  const allEvents = [...iranEvents, ...usaEvents, ...germanyEvents, ...uaeEvents];
  
  // Filter events by country
  const countryEvents = allEvents.filter(event => event.country.includes(country));
  
  // Filter events by month and year
  return countryEvents.filter(event => {
    const [eventYear, eventMonth] = event.date.split('-').map(Number);
    
    // If calendar type matches event date type, direct comparison
    if ((isPersian && event.date.startsWith('14')) || (!isPersian && !event.date.startsWith('14'))) {
      return eventYear === year && eventMonth === month;
    } 
    // Convert dates for comparison
    else if (isPersian) {
      // Convert gregorian event date to persian
      const persianDate = toJalaali(parseInt(event.date.split('-')[0]), 
                                 parseInt(event.date.split('-')[1]), 
                                 parseInt(event.date.split('-')[2]));
      return persianDate.jy === year && persianDate.jm === month;
    } else {
      // Convert persian event date to gregorian
      const gregorianDate = toGregorian(parseInt(event.date.split('-')[0]), 
                                    parseInt(event.date.split('-')[1]), 
                                    parseInt(event.date.split('-')[2]));
      return gregorianDate.gy === year && gregorianDate.gm === month;
    }
  });
}

/**
 * Get all holidays for a specific month
 */
export function getHolidays(year: number, month: number, isPersian: boolean, country: string): string[] {
  // Get events for the month
  const monthEvents = getMonthEvents(year, month, isPersian, country);
  
  // Filter holidays and return their dates
  return monthEvents
    .filter(event => event.isHoliday)
    .map(event => event.date);
}

// Event data for Germany
const germanyEvents: CalendarEvent[] = [
  {
    id: 'de1',
    date: '2025-01-06',
    title: 'عید ظهور',
    description: 'عید ظهور مسیح، تعطیل رسمی در بخش‌هایی از آلمان',
    isHoliday: true,
    country: ['germany'],
    blogUrl: '/blog/epiphany'
  },
  {
    id: 'de2',
    date: '2025-04-18',
    title: 'جمعه نیک',
    description: 'به یادبود مصلوب شدن عیسی مسیح',
    isHoliday: true,
    country: ['germany'],
    blogUrl: '/blog/good-friday'
  },
  {
    id: 'de3',
    date: '2025-05-01',
    title: 'روز جهانی کارگر',
    description: 'روز کارگر، تعطیلی رسمی در آلمان',
    isHoliday: true,
    country: ['germany'],
    blogUrl: '/blog/labor-day'
  },
  {
    id: 'de4',
    date: '2025-10-03',
    title: 'روز وحدت آلمان',
    description: 'سالروز وحدت دوباره دو آلمان در سال ۱۹۹۰',
    isHoliday: true,
    country: ['germany'],
    blogUrl: '/blog/german-unity'
  },
  {
    id: 'de5',
    date: '2025-12-31',
    title: 'شب سال نو',
    description: 'جشن پایان سال میلادی',
    isHoliday: false,
    country: ['germany', 'usa'],
    blogUrl: '/blog/new-years-eve'
  },
  {
    id: "ydt1hyacw",
    date: "1404-02-12",
    title: "روزی سوم از ساخت گاهشمار جدید",
    description: "روز بسیار سختی بود و چالش های زیادی داشت",
    isHoliday: true,
    country: [
      "iran"
    ]
  }
];

// Event data for UAE
const uaeEvents: CalendarEvent[] = [
  {
    id: 'ae1',
    date: '2025-01-01',
    title: 'سال نو میلادی',
    description: 'آغاز سال نو میلادی',
    isHoliday: true,
    country: ['uae'],
    blogUrl: '/blog/new-year-uae'
  },
  {
    id: 'ae2',
    date: '2025-04-10',
    title: 'عید فطر',
    description: 'پایان ماه مبارک رمضان و آغاز عید فطر',
    isHoliday: true, 
    country: ['uae', 'iran'],
    blogUrl: '/blog/eid-al-fitr'
  },
  {
    id: 'ae3',
    date: '2025-06-17',
    title: 'عید قربان',
    description: 'عید قربان، از اعیاد مهم اسلامی',
    isHoliday: true,
    country: ['uae', 'iran'],
    blogUrl: '/blog/eid-al-adha'
  },
  {
    id: 'ae4',
    date: '2025-07-19',
    title: 'سال نو هجری قمری',
    description: 'آغاز سال نو در تقویم هجری قمری',
    isHoliday: true,
    country: ['uae'],
    blogUrl: '/blog/islamic-new-year'
  },
  {
    id: 'ae5',
    date: '2025-12-02',
    title: 'روز ملی امارات',
    description: 'سالروز تأسیس امارات متحده عربی',
    isHoliday: true,
    country: ['uae'],
    blogUrl: '/blog/uae-national-day'
  }
];

// Event data for USA
const usaEvents: CalendarEvent[] = [
  {
    id: 'us1',
    date: '2025-01-01',
    title: 'سال نو میلادی',
    description: 'آغاز سال نو میلادی، تعطیلات رسمی در آمریکا',
    isHoliday: true,
    country: ['usa', 'germany'],
    blogUrl: '/blog/new-year'
  },
  {
    id: 'us2',
    date: '2025-01-20',
    title: 'روز مارتین لوتر کینگ',
    description: 'گرامیداشت مارتین لوتر کینگ جونیور، فعال حقوق مدنی آمریکایی',
    isHoliday: true,
    country: ['usa'],
    blogUrl: '/blog/mlk-day'
  },
  {
    id: 'us3',
    date: '2025-02-14',
    title: 'روز ولنتاین',
    description: 'روز عشق و دوستی',
    isHoliday: false,
    country: ['usa', 'germany'],
    blogUrl: '/blog/valentine-day'
  },
  {
    id: 'us4',
    date: '2025-05-26',
    title: 'روز یادبود',
    description: 'روز بزرگداشت خدمات نظامیان آمریکایی',
    isHoliday: true,
    country: ['usa'],
    blogUrl: '/blog/memorial-day'
  },
  {
    id: 'us5',
    date: '2025-07-04',
    title: 'روز استقلال آمریکا',
    description: 'سالروز استقلال ایالات متحده آمریکا',
    isHoliday: true,
    country: ['usa'],
    blogUrl: '/blog/independence-day'
  },
  {
    id: 'us6',
    date: '2025-11-27',
    title: 'روز شکرگزاری',
    description: 'جشن سنتی شکرگزاری در آمریکا',
    isHoliday: true,
    country: ['usa'],
    blogUrl: '/blog/thanksgiving'
  },
  {
    id: 'us7',
    date: '2025-12-25',
    title: 'کریسمس',
    description: 'جشن میلاد مسیح',
    isHoliday: true,
    country: ['usa', 'germany'],
    blogUrl: '/blog/christmas'
  }
];