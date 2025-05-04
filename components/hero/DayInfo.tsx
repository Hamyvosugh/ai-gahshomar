// components/hero/DayInfo.tsx
import React from 'react';
import { 
  toPersianNum, 
  getPersianMonthName, 
  getPersianWeekDay,
  getAncientPersianWeekDay 
} from './utils/persianHelper';

interface DayInfoProps {
  persianDate: { year: number; month: number; day: number };
  weekDay: number;
}

const DayInfo: React.FC<DayInfoProps> = ({ persianDate, weekDay }) => {
  const ancientDayName = getAncientPersianWeekDay(weekDay);
  const modernDayName = getPersianWeekDay(weekDay);
  const monthName = getPersianMonthName(persianDate.month);

  return (
    <div className="text-center p-4 rounded-lg mb-4">
      <h2 className="text-2xl font-bold mb-1">
        {ancientDayName} ({modernDayName})
      </h2>
      <h1 className="text-4xl font-bold">
        {toPersianNum(persianDate.day)} {monthName}
      </h1>
    </div>
  );
};

export default DayInfo;