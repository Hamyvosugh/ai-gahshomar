// components/PersonalEvents/hooks/usePersonalEventsForCalendar.ts
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PersonalEvent } from '@/types/personalEvents';

export function usePersonalEventsForCalendar(year: number, month: number, isPersian: boolean) {
  const [personalEvents, setPersonalEvents] = useState<PersonalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchPersonalEvents = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setPersonalEvents([]);
          setLoading(false);
          return;
        }

        // Format the date range for the query
        const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
        const daysInMonth = isPersian ? 
          (month <= 6 ? 31 : month <= 11 ? 30 : 29) : // Persian months
          new Date(year, month, 0).getDate(); // Gregorian months
        
        const endDate = `${year}-${String(month).padStart(2, '0')}-${String(daysInMonth).padStart(2, '0')}`;

        const { data, error } = await supabase
          .from('personal_events')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_persian', isPersian)
          .gte('date', startDate)
          .lte('date', endDate)
          .order('date', { ascending: true });

        if (error) throw error;
        setPersonalEvents(data || []);
      } catch (err) {
        console.error('Error fetching personal events:', err);
        setPersonalEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalEvents();
  }, [year, month, isPersian, supabase]);

  return { personalEvents, loading };
}