import React from 'react';

interface GregorianMonthSelectProps {
  label: string;
  selectedMonth: number;
  onChange: (month: number) => void;
}

const months = [
  'ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن',
  'جولای', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'
];

const GregorianMonthSelect: React.FC<GregorianMonthSelectProps> = ({ label, selectedMonth, onChange }) => (
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

export default GregorianMonthSelect;