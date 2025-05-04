import React, { useState } from 'react';

interface PromotionInputProps {
  label: string;
  title: string;
  description: string;
  buttonText: string;
  link: string;
  onChange: (field: string, value: string) => void;
}

const PromotionInput: React.FC<PromotionInputProps> = ({
  label,
  title,
  description,
  buttonText,
  link,
  onChange
}) => {
  const handleFieldChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="mb-2">
        <input
          type="text"
          value={title}
          onChange={handleFieldChange('title')}
          className="border rounded p-2 w-full"
          placeholder="Enter promotion title"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          value={description}
          onChange={handleFieldChange('description')}
          className="border rounded p-2 w-full"
          placeholder="Enter promotion description"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          value={buttonText}
          onChange={handleFieldChange('buttonText')}
          className="border rounded p-2 w-full"
          placeholder="Enter button text"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          value={link}
          onChange={handleFieldChange('link')}
          className="border rounded p-2 w-full"
          placeholder="Enter link"
        />
      </div>
    </div>
  );
};

export default PromotionInput;