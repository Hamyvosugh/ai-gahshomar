// /components/convertor/types.ts
export interface Calendar {
    id: string;
    name: string;
    months?: string[];
    yearDifference?: number;
    baseCalendar?: string;
  }
  
  export interface ConvertedDate {
    year: number;
    month: number;
    day: number;
    calendarName: string;
  }
  
  
  
  
  
  
  
  
  