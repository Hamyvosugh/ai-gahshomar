// app/api/calendar/route.ts
import { NextResponse } from 'next/server';
import { getMonthEvents, getHolidays } from '@/utils/calendarData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const year = parseInt(searchParams.get('year') || '0');
  const month = parseInt(searchParams.get('month') || '0');
  const isPersian = searchParams.get('isPersian') === 'true';
  const country = searchParams.get('country') || 'iran';
  
  const events = await getMonthEvents(year, month, isPersian, country);
  const holidays = await getHolidays(year, month, isPersian, country);
  
  return NextResponse.json({ events, holidays });
}