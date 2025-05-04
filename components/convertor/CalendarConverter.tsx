

// /components/convertor/CalendarConverter.tsx
'use client';
import React, { useState } from 'react';
import { toEnglishNumber, convertDate } from './utils';
import { ConvertedDate } from './types';
import ProgressIndicator from './ProgressIndicator';
import SlideCalendarSelect from './SlideCalendarSelect';
import SlideYearInput from './SlideYearInput';
import SlideMonthSelect from './SlideMonthSelect';
import SlideDaySelect from './SlideDaySelect';
import SlideResult from './SlideResult';
import ErrorAlert from './ErrorAlert';

const CalendarConverter: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [sourceCalendar, setSourceCalendar] = useState('');
  const [targetCalendar, setTargetCalendar] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [convertedDate, setConvertedDate] = useState<ConvertedDate | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => {
    setError(null);
  };

  const handleConvertDate = (targetCalId: string) => {
    if (!sourceCalendar || !targetCalId || !year || !month || !day) return;
    
    try {
      setTargetCalendar(targetCalId);
      const yearNum = parseInt(toEnglishNumber(year));
      const result = convertDate(sourceCalendar, targetCalId, yearNum, month, day);
      
      setConvertedDate({
        year: result.year,
        month: result.month,
        day: result.day,
        calendarName: targetCalId,
      });
      
      setCurrentSlide(6);
    } catch (err: unknown) {
      // فقط خطاها را در مرحله تبدیل نمایش می‌دهیم
      const errorObj = err as Error;
      setError(errorObj.message || 'خطای ناشناخته در تبدیل تاریخ');
    }
  };

  const resetConverter = () => {
    setCurrentSlide(1);
    setSourceCalendar('');
    setTargetCalendar('');
    setYear('');
    setMonth(0);
    setDay(0);
    setConvertedDate(null);
    clearError();
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case 1:
        return (
          <SlideCalendarSelect
            title="برای آغاز، گاه‌شمار بنیادین را برگزینید."
            onSelect={(calendarId) => {
              setSourceCalendar(calendarId);
              setCurrentSlide(2);
            }}
          />
        );
      
      case 2:
        return (
          <SlideYearInput
            year={year}
            setYear={setYear}
            onContinue={() => setCurrentSlide(3)}
            onBack={() => setCurrentSlide(1)}
          />
        );
      
      case 3:
        return (
          <SlideMonthSelect
            sourceCalendar={sourceCalendar}
            onSelect={(selectedMonth) => {
              setMonth(selectedMonth);
              setCurrentSlide(4);
            }}
            onBack={() => setCurrentSlide(2)}
          />
        );
      
      case 4:
        return (
          <SlideDaySelect
            sourceCalendar={sourceCalendar}
            year={parseInt(toEnglishNumber(year))}
            month={month}
            onSelect={(selectedDay) => {
              setDay(selectedDay);
              setCurrentSlide(5);
            }}
            onBack={() => setCurrentSlide(3)}
          />
        );
      
      case 5:
        return (
          <SlideCalendarSelect
            title="لطفاً تقویم مقصد را انتخاب کنید"
            onSelect={handleConvertDate}
            disabledCalendarId={sourceCalendar}
            onBack={() => setCurrentSlide(4)}
          />
        );
      
      case 6:
        return (
          <SlideResult
            sourceCalendar={sourceCalendar}
            targetCalendar={targetCalendar}
            year={year}
            month={month}
            day={day}
            convertedDate={convertedDate}
            onRestart={resetConverter}
            onBack={() => setCurrentSlide(5)}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-indigo-50 rounded-xl shadow-lg" dir="rtl">
      <h1 className="text-2xl font-bold mb-8 text-center text-blue-950">روزگردان ( تبدیل تاریخ )</h1>
      
      {error && <ErrorAlert message={error} onClose={clearError} />}
      
      <ProgressIndicator currentSlide={currentSlide} totalSlides={6} />
      
      {renderSlide()}
    </div>
  );
};

export default CalendarConverter;