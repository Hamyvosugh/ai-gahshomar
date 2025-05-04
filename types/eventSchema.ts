/**
 * Schema for calendar events data
 * Create this file in: src/types/eventSchema.ts
 */

export interface CalendarEvent {
    isPersonal?: boolean;
    id: string;
    date: string; // YYYY-MM-DD format
    title: string;
    description: string;
    isHoliday: boolean;
    country: string[]; // Array of country codes: 'iran', 'usa', 'germany', 'uae'
    blogUrl?: string;
    thumbnail?: string; // Optional image path
    categories?: string[]; // Optional array of categories
    tags?: string[]; // Optional array of tags
    type?: string; // Optional event type
    
  }
  
  export interface CountryOption {
    value: string; // Country code
    label: string; // Display name
    flag: string; // Emoji flag
  }
  
  // All available countries
  export const COUNTRIES: CountryOption[] = [
    { value: 'iran', label: 'ایران', flag: '🟢' },
    { value: 'usa', label: 'آمریکا', flag: '🇺🇸' },
    { value: 'germany', label: 'آلمان', flag: '🇩🇪' },
    { value: 'uae', label: 'امارات', flag: '🇦🇪' },
  ];
  
  // Default path for database
  export const EVENT_DATA_PATH = '/api/events';