import React from 'react';

interface SeoDescriptionProps {
  label: string;
  description: string;
  onChange: (description: string) => void;
}

const SeoDescription: React.FC<SeoDescriptionProps> = ({ label, description, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      value={description}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2 w-full h-32"
      placeholder="Enter SEO description"
    />
  </div>
);

export default SeoDescription;