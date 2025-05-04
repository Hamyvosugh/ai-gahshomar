import React from 'react';

interface HolidaySelectProps {
  label: string;
  isHoliday: boolean;
  onChange: (isHoliday: boolean) => void;
}

const HolidaySelect: React.FC<HolidaySelectProps> = ({ label, isHoliday, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <div className="flex space-x-4 rtl:space-x-reverse">
      <label className="flex items-center">
        <input
          type="radio"
          value="yes"
          checked={isHoliday}
          onChange={() => onChange(true)}
          className="mr-2"
        />
        بله
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          value="no"
          checked={!isHoliday}
          onChange={() => onChange(false)}
          className="mr-2"
        />
        خیر
      </label>
    </div>
  </div>
);

export default HolidaySelect;