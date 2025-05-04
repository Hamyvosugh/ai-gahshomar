'use client';

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface GregorianDateInputProps {
  label: string;
  selectedDate: Date | null;  // Allowing null for date
  onChange: (date: Date | null) => void;  // Allowing null for date
}

const GregorianDateInput: React.FC<GregorianDateInputProps> = ({
  label,
  selectedDate,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="yyyy/MM/dd"
        className="border rounded p-2 w-full"
      />
    </div>
  );
};

export default GregorianDateInput;