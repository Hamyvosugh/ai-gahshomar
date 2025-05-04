// /components/convertor/SlideResult.tsx
import React from 'react';
import { Calendar, ConvertedDate } from './types';
import { calendars } from './constants';
import { toPersianNumber } from './utils';

interface SlideResultProps {
  sourceCalendar: string;
  targetCalendar: string;
  year: string;
  month: number;
  day: number;
  convertedDate: ConvertedDate | null;
  onRestart: () => void;
  onBack: () => void;
}

const SlideResult: React.FC<SlideResultProps> = ({
  sourceCalendar,
  targetCalendar,
  year,
  month,
  day,
  convertedDate,
  onBack,
  onRestart
}) => {
  if (!convertedDate) return null;
  
  const sourceCalendarObj = calendars.find(c => c.id === sourceCalendar);
  const sourceMonths = sourceCalendarObj?.months || 
                       calendars.find(c => c.id === 'jalali')?.months || [];
  
  const targetCalendarObj = calendars.find(c => c.id === targetCalendar);
  const targetMonths = targetCalendarObj?.months || 
                       calendars.find(c => c.id === 'jalali')?.months || [];
  
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl text-blue-950 mb-6 text-right w-full">نتیجه تبدیل</h2>
      <div className="bg-(--back1) border border-green-300 rounded-lg p-6 w-full mb-8">
        <div className="mb-4 text-center">
          <div className="text-lg  mb-2">تاریخ انتخابی  شما از گاه‌شماری {sourceCalendarObj?.name}:</div>
          <div className="text-2xl font-bold">
            {toPersianNumber(day)} {sourceMonths[month - 1]} {toPersianNumber(year)}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-lg mb-2">  در گاه‌شماری {targetCalendarObj?.name} برابر است با:</div>
          <div className="text-2xl font-bold">
            {toPersianNumber(convertedDate.day)} {targetMonths[convertedDate.month - 1]} {toPersianNumber(convertedDate.year)}
          </div>
        </div>
      </div>



      <div className="flex justify-between w-full">
        <button
          className="bg-green-900/60 hover:bg-orange-700/60 text-white py-3 px-8 rounded-lg text-lg"
          onClick={onRestart}
        >
          تبدیل جدید
        </button>
        <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg"
            onClick={onBack}
          >
            بازگشت
          </button>
      </div>






    </div>
  );
};

export default SlideResult;
