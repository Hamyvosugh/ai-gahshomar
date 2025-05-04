'use client';
import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { CalendarEvent } from '@/types/eventSchema';

interface EventPopupProps {
  event: CalendarEvent;
  isPersianCalendar: boolean;
  onClose: () => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ event, isPersianCalendar, onClose }) => {
  if (!event) return null;
  
  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
      <div className="relative bg-black/90 border border-ai-primary/30 rounded-xl p-6 max-w-md w-full backdrop-blur-md">
        <button 
          className="absolute top-4 right-4 text-orange-600 hover:text-green-600 "
          onClick={onClose}
        >
          <X className="h-7 w-7 " />
        </button>
        
        <div className="mb-4">
          <span className={`absolute top-4 left-4 px-3 py-1 text-xs text-black rounded-full ${event.isHoliday ? 'bg-gray-500 text-ai-secondary' : 'bg-gray-100 text-ai-primary'}`}>
            {event.isHoliday ? (isPersianCalendar ? 'تعطیل رسمی' : 'Holiday') : (isPersianCalendar ? 'فراخور' : 'Event')}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 pt-6">{event.title}</h3>
        <p className="text-gray-300 mb-6 ">{event.description}</p>
        
        {event.blogUrl && (
          <a 
            href={event.blogUrl}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-ai-primary to-ai-secondary text-green-600 rounded-lg hover:opacity-90 transition-opacity"
          >
            {isPersianCalendar ? 'مشاهده بیشتر' : 'Read More'}
            <ExternalLink className="h-4 w-4 mr-2" />
          </a>
        )}
      </div>
    </div>
  );
};

export default EventPopup;