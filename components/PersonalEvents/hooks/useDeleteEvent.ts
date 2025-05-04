// components/PersonalEvents/hooks/useDeleteEvent.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function useDeleteEvent() {
  const supabase = createClientComponentClient();

  const deleteEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('personal_events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  return { deleteEvent };
}