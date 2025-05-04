import React from 'react';

interface TypeSelectProps {
  label: string;
  selectedType: string;
  onChange: (type: string) => void;
}

const types = [
  'گاه‌شمار', 'گاه‌نامه', 'دانشنامه', 'جهان‌نامه', 'شهر‌نامه'
];

const TypeSelect: React.FC<TypeSelectProps> = ({ label, selectedType, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      value={selectedType}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2 w-full"
    >
      {types.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  </div>
);

export default TypeSelect;