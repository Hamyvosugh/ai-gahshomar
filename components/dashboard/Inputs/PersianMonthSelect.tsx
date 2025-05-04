import React from 'react';

interface PersianMonthSelectProps {
  label: string;
  selectedMonth: number;
  onChange: (month: number) => void;
}

const months = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'امرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

const PersianMonthSelect: React.FC<PersianMonthSelectProps> = ({ label, selectedMonth, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      value={selectedMonth}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border rounded p-2 w-full"
    >
      {months.map((month, index) => (
        <option key={index + 1} value={index + 1}>
          {month}
        </option>
      ))}
    </select>
  </div>
);

export default PersianMonthSelect;