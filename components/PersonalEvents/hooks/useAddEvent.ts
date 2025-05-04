// components/PersonalEvents/hooks/useAddEvent.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PersonalEvent } from '@/types/personalEvents';

export function useAddEvent() {
  const supabase = createClientComponentClient();

  const addEvent = async (eventData: Omit<PersonalEvent, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('personal_events')
        .insert([{ ...eventData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  return { addEvent };
}