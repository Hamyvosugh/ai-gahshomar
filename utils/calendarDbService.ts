// utils/calendarDbService.ts
import { createClient } from '@supabase/supabase-js';
import { CalendarEvent } from '@/types/eventSchema';
import { unstable_cache } from 'next/cache';

// Supabase Client with Service Role (for server-side only)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * تبدیل داده‌های دیتابیس به فرمت CalendarEvent
 */
function dbRowToCalendarEvent(row: any): CalendarEvent {
  return {
    id: row.id,
    date: row.date,
    title: row.title,
    description: row.description,
    isHoliday: row.is_holiday,
    country: row.country,
    blogUrl: row.blog_url
  };
}

/**
 * دریافت رویدادهای یک ماه خاص با کش کردن
 * کش برای 1 ساعت معتبر است
 */
export const getMonthEventsFromDb = unstable_cache(
  async (year: number, month: number, isPersian: boolean, country: string) => {
    try {
      // تعیین فرمت تاریخ بر اساس نوع تقویم
      let datePattern: string;
      if (isPersian) {
        // برای تاریخ شمسی: 1404-01-XX
        datePattern = `${year}-${String(month).padStart(2, '0')}-%`;
      } else {
        // برای تاریخ میلادی: 2025-01-XX
        datePattern = `${year}-${String(month).padStart(2, '0')}-%`;
      }

      // کوئری با فیلتر کشور
      const { data, error } = await supabaseAdmin
        .from('calendar_events')
        .select('*')
        .like('date', datePattern)
        .contains('country', [country])
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching events from DB:', error);
        return [];
      }

      return data.map(dbRowToCalendarEvent);
    } catch (error) {
      console.error('Error in getMonthEventsFromDb:', error);
      return [];
    }
  },
  ['calendar-events'],
  {
    revalidate: 3600, // کش برای 1 ساعت
    tags: ['calendar-events']
  }
);

/**
 * دریافت تعطیلات یک ماه خاص
 */
export const getHolidaysFromDb = unstable_cache(
  async (year: number, month: number, isPersian: boolean, country: string) => {
    try {
      let datePattern: string;
      if (isPersian) {
        datePattern = `${year}-${String(month).padStart(2, '0')}-%`;
      } else {
        datePattern = `${year}-${String(month).padStart(2, '0')}-%`;
      }

      const { data, error } = await supabaseAdmin
        .from('calendar_events')
        .select('date')
        .like('date', datePattern)
        .contains('country', [country])
        .eq('is_holiday', true);

      if (error) {
        console.error('Error fetching holidays from DB:', error);
        return [];
      }

      return data.map(row => row.date);
    } catch (error) {
      console.error('Error in getHolidaysFromDb:', error);
      return [];
    }
  },
  ['calendar-holidays'],
  {
    revalidate: 3600, // کش برای 1 ساعت
    tags: ['calendar-holidays']
  }
);

/**
 * دریافت همه رویدادها (برای مهاجرت داده‌ها)
 */
export async function getAllEventsFromDb() {
  try {
    const { data, error } = await supabaseAdmin
      .from('calendar_events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching all events from DB:', error);
      return [];
    }

    return data.map(dbRowToCalendarEvent);
  } catch (error) {
    console.error('Error in getAllEventsFromDb:', error);
    return [];
  }
}

/**
 * وارد کردن رویداد جدید
 */
export async function insertEvent(event: CalendarEvent) {
  try {
    const { data, error } = await supabaseAdmin
      .from('calendar_events')
      .insert({
        id: event.id,
        date: event.date,
        title: event.title,
        description: event.description,
        is_holiday: event.isHoliday,
        country: event.country,
        blog_url: event.blogUrl
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting event:', error);
      return null;
    }

    return dbRowToCalendarEvent(data);
  } catch (error) {
    console.error('Error in insertEvent:', error);
    return null;
  }
}

/**
 * به‌روزرسانی رویداد
 */
export async function updateEvent(id: string, event: Partial<CalendarEvent>) {
  try {
    const updateData: any = {};
    
    if (event.date) updateData.date = event.date;
    if (event.title) updateData.title = event.title;
    if (event.description) updateData.description = event.description;
    if (event.isHoliday !== undefined) updateData.is_holiday = event.isHoliday;
    if (event.country) updateData.country = event.country;
    if (event.blogUrl) updateData.blog_url = event.blogUrl;

    const { data, error } = await supabaseAdmin
      .from('calendar_events')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating event:', error);
      return null;
    }

    return dbRowToCalendarEvent(data);
  } catch (error) {
    console.error('Error in updateEvent:', error);
    return null;
  }
}

/**
 * حذف رویداد
 */
export async function deleteEvent(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from('calendar_events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteEvent:', error);
    return false;
  }
}

/**
 * اسکریپت مهاجرت داده‌ها از فایل به دیتابیس
 */
export async function migrateEventsToDb(events: CalendarEvent[]) {
  console.log(`Starting migration of ${events.length} events...`);
  
  let successCount = 0;
  let errorCount = 0;

  for (const event of events) {
    const result = await insertEvent(event);
    if (result) {
      successCount++;
    } else {
      errorCount++;
      console.error(`Failed to migrate event: ${event.id}`);
    }
  }

  console.log(`Migration completed: ${successCount} success, ${errorCount} errors`);
  return { successCount, errorCount };
}