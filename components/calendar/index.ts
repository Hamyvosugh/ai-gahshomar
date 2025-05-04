// src/components/Calendar/index.ts
// Main component
export { default as PersianCalendar } from './PersianCalendar';

// Sub-components
export { default as CalendarHeader } from './CalendarHeader';
export { default as CalendarNavigation } from './CalendarNavigation';
export { default as CalendarGrid } from './CalendarGrid';
export { default as CountrySelector } from './CountrySelector';
export { default as EventsList } from './EventsList';
export { default as EventPopup } from './EventPopup';

// Types, constants, and utilities
export * from '@/utils/calendarData';
export * from './CalendarUtils';