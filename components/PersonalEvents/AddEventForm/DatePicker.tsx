'use client';

import { useState, useEffect } from 'react';
import { toPersianDigits } from '@/utils/utils';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  isPersian: boolean;
  onCalendarTypeChange: (isPersian: boolean) => void;
}

export default function DatePicker({
  value,
  onChange,
  isPersian,
  onCalendarTypeChange,
}: DatePickerProps) {
  // state for Gregorian
  const [inputValue, setInputValue] = useState(value);
  // state for Persian components
  const [persianDay, setPersianDay] = useState('');
  const [persianMonth, setPersianMonth] = useState('');
  const [persianYear, setPersianYear] = useState('');

  // Sync external value to internal state when switching modes or updating value
  useEffect(() => {
    if (!isPersian) {
      setInputValue(value);
    } else if (value) {
      // assume incoming value is YYYY-MM-DD
      const [y, m, d] = value.split('-');
      setPersianYear(y);
      setPersianMonth(m);
      setPersianDay(d);
    }
  }, [isPersian, value]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handlePersianPartChange = (
    part: 'day' | 'month' | 'year',
    newVal: string
  ) => {
    let d = persianDay;
    let m = persianMonth;
    let y = persianYear;
    if (part === 'day') d = newVal;
    if (part === 'month') m = newVal;
    if (part === 'year') y = newVal;
    setPersianDay(d);
    setPersianMonth(m);
    setPersianYear(y);

    if (d && m && y) {
      // pad day and month
      const dd = d.padStart(2, '0');
      const mm = m.padStart(2, '0');
      const formatted = `${y}-${mm}-${dd}`;
      onChange(formatted);
    }
  };

  const persianMonths = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          تاریخ
        </label>
        <div className="flex items-center space-x-2 space-x-reverse">
          <button
            type="button"
            onClick={() => onCalendarTypeChange(true)}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              isPersian
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            شمسی
          </button>
          <button
            type="button"
            onClick={() => onCalendarTypeChange(false)}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              !isPersian
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            میلادی
          </button>
        </div>
      </div>

      {/* Persian input fields */}
      {isPersian ? (
        <div className="flex space-x-2 space-x-reverse">
          <input
            type="text"
            placeholder="روز"
            value={persianDay}
            onChange={(e) => handlePersianPartChange('day', e.target.value)}
            maxLength={2}
            required
            className="w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={persianMonth}
            onChange={(e) => handlePersianPartChange('month', e.target.value)}
            required
            className="w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">ماه</option>
            {persianMonths.map((m) => (
              <option key={m} value={m}>
                {toPersianDigits(m)}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="سال"
            value={persianYear}
            onChange={(e) => handlePersianPartChange('year', e.target.value)}
            maxLength={4}
            required
            className="w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      ) : (
        <input
          type="date"
          value={inputValue}
          onChange={handleDateChange}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          dir="ltr"
        />
      )}

      {isPersian && value && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          تاریخ شمسی: {toPersianDigits(value)}
        </p>
      )}
    </div>
  );
}
