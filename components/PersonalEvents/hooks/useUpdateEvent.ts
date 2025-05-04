// components/PersonalEvents/hooks/useUpdateEvent.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PersonalEvent } from '@/types/personalEvents';

export function useUpdateEvent() {
  const supabase = createClientComponentClient();

  const updateEvent = async (
    eventId: string, 
    eventData: Partial<Omit<PersonalEvent, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
  ) => {
    try {
      const { data, error } = await supabase
        .from('personal_events')
        .update(eventData)
        .eq('id', eventId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  return { updateEvent };
}