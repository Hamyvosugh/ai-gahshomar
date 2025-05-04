// components/PersonalEvents/EventManager/index.tsx - Updated
'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { usePersonalEvents } from '../hooks/usePersonalEvents';
import { useDeleteEvent } from '../hooks/useDeleteEvent';
import AddEventForm from '../AddEventForm';
import EventsList from '../EventsList';
import { PersonalEvent, EventLimit } from '@/types/personalEvents';

export default function PersonalEventManager() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<PersonalEvent | null>(null);
  const [eventLimit, setEventLimit] = useState<EventLimit>({ 
    currentCount: 0, 
    maxAllowed: 10, 
    canAddMore: true 
  });
  
  const { events, loading, error, fetchEvents, checkEventLimit } = usePersonalEvents();
  const { deleteEvent } = useDeleteEvent();

  useEffect(() => {
    const loadEventLimit = async () => {
      const limit = await checkEventLimit();
      setEventLimit(limit);
    };
    loadEventLimit();
  }, [events, checkEventLimit]);

  const handleAddClick = () => {
    if (eventLimit.canAddMore) {
      setIsFormOpen(true);
      setEditingEvent(null);
    }
  };

  const handleEditClick = (event: PersonalEvent) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteClick = async (eventId: string) => {
    if (window.confirm('آیا از حذف این مناسبت اطمینان دارید؟')) {
      const { success, error } = await deleteEvent(eventId);
      if (success) {
        fetchEvents();
      } else {
        alert(`خطا در حذف مناسبت: ${error}`);
      }
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingEvent(null);
    fetchEvents();
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingEvent(null);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            مناسبت‌های شخصی
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {eventLimit.currentCount} از {eventLimit.maxAllowed} مناسبت
          </p>
        </div>
        <button
          onClick={handleAddClick}
          disabled={!eventLimit.canAddMore}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-5 h-5 ml-2" />
          افزودن مناسبت
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {isFormOpen ? (
        <div className="mb-6">
          <AddEventForm
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
            canAdd={eventLimit.canAddMore}
            eventCount={{
              current: eventLimit.currentCount,
              max: eventLimit.maxAllowed
            }}
          />
        </div>
      ) : (
        <EventsList
          events={events}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          loading={loading}
        />
      )}
    </div>
  );
}