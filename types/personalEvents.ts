// types/personalEvents.ts
export interface PersonalEvent {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    date: string; // YYYY-MM-DD format
    category?: string;
    is_persian: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface EventLimit {
    currentCount: number;
    maxAllowed: number;
    canAddMore: boolean;
  }
  
  export type EventCategory = 
    | 'birthday'
    | 'anniversary' 
    | 'reminder'
    | 'holiday'
    | 'other';
  
  export const eventCategories: { value: EventCategory; label: string }[] = [
    { value: 'birthday', label: 'تولد' },
    { value: 'anniversary', label: 'سالگرد' },
    { value: 'reminder', label: 'یادآور' },
    { value: 'holiday', label: 'تعطیلی' },
    { value: 'other', label: 'سایر' }
  ];