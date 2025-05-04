// components/hero/CalendarYears.tsx
import React from 'react';
import { toPersianNum } from './utils/persianHelper';
import { calculateAllCalendarYears } from './data/calendarSystems';

interface CalendarYearsProps {
  persianYear: number;
}

const CalendarYears: React.FC<CalendarYearsProps> = ({ persianYear }) => {
  // Calculate all calendar years
  const years = calculateAllCalendarYears(persianYear);

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-center">
      {years.map((calendar, index) => (
        <div 
          key={index} 
          className="bg-gray-200 p-2 rounded-lg"
        >
          <h3 className="text-2xl font-bold text-blue-950">
            {toPersianNum(calendar.year)}
          </h3>
          <p className="text-xs text-blue-900">{calendar.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CalendarYears;