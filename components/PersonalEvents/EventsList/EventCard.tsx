// components/PersonalEvents/EventsList/EventCard.tsx
'use client';

import { PersonalEvent } from '@/types/personalEvents';
import { eventCategories } from '@/types/personalEvents';
import { toPersianDigits } from '@/utils/utils';
import { Calendar, Edit2, Trash2 } from 'lucide-react';


interface EventCardProps {
  event: PersonalEvent;
  onEdit: () => void;
  onDelete: () => void;
}


export default function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const getCategoryLabel = (value: string) => {
    const category = eventCategories.find(cat => cat.value === value);
    return category?.label || 'سایر';
  };

  const formatDate = (dateStr: string, isPersian: boolean) => {
    if (isPersian) {
      return toPersianDigits(dateStr);
    }
    return dateStr;
  };

  return (
    <div className="bg-red dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            {event.title}
          </h3>
          {event.description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              {event.description}
            </p>
          )}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(event.date, event.is_persian)}
              <span className="mr-2 text-xs">
                ({event.is_persian ? 'شمسی' : 'میلادی'})
              </span>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {getCategoryLabel(event.category || '')}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mr-4">
          <button
            onClick={onEdit}
            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="ویرایش"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}