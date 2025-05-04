import React from 'react';

interface ContentTextProps {
  label: string;
  content: string;
  onChange: (content: string) => void;
}

const ContentText: React.FC<ContentTextProps> = ({ label, content, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2 w-full h-48"
      placeholder="Enter content"
    />
  </div>
);

export default ContentText;