// /components/convertor/SlideCalendarSelect.tsx
  import React from 'react';
  import { Calendar } from './types';
  import { calendars } from './constants';
  
  interface SlideCalendarSelectProps {
    title: string;
    onSelect: (calendarId: string) => void;
    disabledCalendarId?: string;
    onBack?: () => void;
  }
  
  const SlideCalendarSelect: React.FC<SlideCalendarSelectProps> = ({ 
    title, 
    onSelect, 
    disabledCalendarId,
    onBack 
  }) => {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-xl text-blue-950 mb-6 text-right w-full">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mb-8">
          {calendars.map((calendar: Calendar) => (
            <button
            key={calendar.id}
            className={`
              py-3 px-6 rounded-lg text-lg font-medium 
              transition-all duration-200 ease-in-out
              shadow-sm
              ${
                calendar.id === disabledCalendarId
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-600 hover:bg-slate-800 text-slate-100 active:bg-slate-900 focus:ring-2 focus:ring-slate-600 focus:ring-offset-1 focus:outline-none'
              }
            `}
            onClick={() => {
              if (calendar.id !== disabledCalendarId) {
                onSelect(calendar.id);
              }
            }}
            disabled={calendar.id === disabledCalendarId}
          >
            {calendar.name}
          </button>
          ))}
        </div>
        {onBack && (
          <div className="w-full">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg"
              onClick={onBack}
            >
              بازگشت
            </button>
          </div>
        )}
      </div>
    );
  };
  
  export default SlideCalendarSelect;
  