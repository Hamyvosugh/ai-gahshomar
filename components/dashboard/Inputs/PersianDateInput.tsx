import React from 'react';

interface PersianDateInputProps {
  label: string;
  day: number;
  month: number;
  year: number;
  onChange: (day: number, month: number, year: number) => void;
}

const PersianDateInput: React.FC<PersianDateInputProps> = ({ label, day, month, year, onChange }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'امرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  const years = Array.from({ length: 50 }, (_, i) => 1400 + i);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, type: 'day' | 'month' | 'year') => {
    const value = Number(e.target.value);
    console.log(`Changing ${type}: ${value}`);
    if (type === 'day') {
      onChange(value, month, year);
    } else if (type === 'month') {
      onChange(day, value, year);
    } else if (type === 'year') {
      onChange(day, month, value);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex space-x-2 rtl:space-x-reverse">
        <select
          value={day}
          onChange={(e) => handleSelectChange(e, 'day')}
          className="border rounded p-2"
        >
          {days.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select
          value={month}
          onChange={(e) => handleSelectChange(e, 'month')}
          className="border rounded p-2"
        >
          {months.map((m, i) => (
            <option key={i + 1} value={i + 1}>{m}</option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => handleSelectChange(e, 'year')}
          className="border rounded p-2"
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PersianDateInput;