// test_supabase.js
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local', override: true });
import { createClient } from '@supabase/supabase-js';

// مقداردهی کلاینت Supabase از متغیرهای محیطی
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

console.log({ supabaseUrl, supabaseKey });

async function filterHolidays() {
  console.time('supabase-filter');
  
  const { data: results, error } = await supabase
    .from('calendar_events')
    .select('*')
    .contains('country', ['germany']);
  
  console.timeEnd('supabase-filter');
  
  if (error) {
    console.error('خطا در دریافت داده‌ها:', error);
  } else {
    console.log('تعداد نتایج:', results.length);
  }
}

filterHolidays();