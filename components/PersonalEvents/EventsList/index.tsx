// components/PersonalEvents/EventsList/index.tsx
'use client';

import { PersonalEvent } from '@/types/personalEvents';
import EventCard from './EventCard';
import EmptyState from './EmptyState';

interface EventsListProps {
  events: PersonalEvent[];
  onEdit: (event: PersonalEvent) => void;
  onDelete: (eventId: string) => void;
  loading: boolean;
}

export default function EventsList({ events, onEdit, onDelete, loading }: EventsListProps) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">در حال بارگذاری...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={() => onEdit(event)}
          onDelete={() => onDelete(event.id)}
        />
      ))}
    </div>
  );
}