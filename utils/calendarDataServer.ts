// utils/calendarDataServer.ts
'use server';
import { unstable_cache } from 'next/cache';
import { getMonthEventsFromDb, getHolidaysFromDb } from './calendarDbService';

export const getCachedMonthEvents = unstable_cache(
  async (year: number, month: number, isPersian: boolean, country: string) => {
    return getMonthEventsFromDb(year, month, isPersian, country);
  },
  ['calendar-events'],
  {
    revalidate: 3600,
    tags: ['calendar-events']
  }
);

export const getCachedHolidays = unstable_cache(
  async (year: number, month: number, isPersian: boolean, country: string) => {
    return getHolidaysFromDb(year, month, isPersian, country);
  },
  ['calendar-holidays'],
  {
    revalidate: 3600,
    tags: ['calendar-holidays']
  }
);