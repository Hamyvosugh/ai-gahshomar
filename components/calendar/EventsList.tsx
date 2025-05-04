import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { CalendarEvent } from '@/types/eventSchema';

interface EventsListProps {
  isPersianCalendar: boolean;
  events: CalendarEvent[];
}

const EventsList: React.FC<EventsListProps> = ({ isPersianCalendar, events }) => {
  // Function to extract day from date string (format: 'YYYY-MM-DD')
  const extractDay = (dateStr: string): string => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      // Get day part and convert to Persian digits if needed
      const day = parts[2];
      if (isPersianCalendar) {
        // Convert Western digits to Persian digits
        return day.replace(/[0-9]/g, (d) => {
          const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
          return persianDigits[parseInt(d)];
        });
      }
      return day;
    }
    return '';
  };

  return (
<div className=" lg:w-[35vw]  backdrop-blur-sm rounded-b-xl lg:rounded-bl-none p-4 border-b border-r border-gray-700/50 lg:border-l-0 mt-4 lg:mt-0">
<h3 className="text-lg font-bold mb-4 flex items-center">
    <CalendarIcon className="h-5 w-5 ml-2 text-ai-primary" />
    {isPersianCalendar ? 'فراخورهای ماه' : 'Events This Month'}
  </h3>
      
      {events.length > 0 ? (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar lg:grid lg:grid-cols-2 lg:gap-3">
          {events.map((event, index) => (
            <a
            key={`${event.id}-${index}`}
            href={event.isPersonal ? '#' : event.blogUrl}
            onClick={event.isPersonal ? (e) => e.preventDefault() : undefined}
            className={`block p-3 rounded-lg border border-gray-700/50 transition-all group relative h-[120px] overflow-hidden ${
              event.isPersonal 
                ? ' bg-blue-200 text-purple-950 hover:bg-blue-300 cursor-default' 
                : 'bg-indigo-50 text-blue-950 hover:bg-indigo-200'
            }`}
          >
            {/* Day number display */}
            <div className="absolute top-2 left-2 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium text-gray-800">
              {extractDay(event.date)}
            </div>
            
            <div className="flex flex-col h-full">
              <div className="mb-1">
                <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                  event.isPersonal
                    ? 'bg-red-600/80 text-purple-200'
                    : event.isHoliday 
                      ? 'bg-red-900/80 text-white' 
                      : 'bg-blue-800/70 text-gray-200'
                }`}>
                  {event.isPersonal 
                    ? (isPersianCalendar ? 'شخصی' : 'Personal')
                    : event.isHoliday 
                      ? (isPersianCalendar ? 'تعطیل' : 'Holiday') 
                      : (isPersianCalendar ? 'مناسبت' : 'Event')
                  }
                </span>
              </div>
              <h4 className="font-medium text-black transition-colors mb-0">{event.title}</h4>
              <p className="text-sm text-gray-500 line-clamp-2 ">
                {event.description && event.description.length > 50 
                  ? event.description.substring(0, 50) + '...' 
                  : event.description}
              </p>
            </div>
          </a>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          {isPersianCalendar ? 'رویدادی در این ماه وجود ندارد' : 'No events this month'}
        </div>
      )}
    </div>
  );
};

export default EventsList;