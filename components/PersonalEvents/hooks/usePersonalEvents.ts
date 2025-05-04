// components/PersonalEvents/hooks/usePersonalEvents.ts
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PersonalEvent, EventLimit } from '@/types/personalEvents';

export function usePersonalEvents() {
  const [events, setEvents] = useState<PersonalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        console.log('Current user:', user);
        console.log('User error:', userError);

      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('personal_events')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const checkEventLimit = async (): Promise<EventLimit> => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      console.log('User in checkEventLimit:', user);
      console.log('User error in checkEventLimit:', userError);

      if (!user) throw new Error('Not authenticated');

      // Get current event count
      const { count } = await supabase
        .from('personal_events')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Get user tokens (if exists)
      const { data: userData } = await supabase
        .from('users')
        .select('tokens')
        .eq('id', user.id)
        .single();

      const maxAllowed = userData?.tokens || 10;
      const currentCount = count || 0;

      return {
        currentCount,
        maxAllowed,
        canAddMore: currentCount < maxAllowed
      };
    } catch (err) {
        console.error('Error checking event limit:', err);
        return { currentCount: 0, maxAllowed: 10, canAddMore: true };
    }
  };

  return { events, loading, error, fetchEvents, checkEventLimit };
}