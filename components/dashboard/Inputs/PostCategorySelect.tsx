import React from 'react';

interface PostCategorySelectProps {
  label: string;
  selectedCategory: string;
  onChange: (category: string) => void;
}

const categories = [
  'جشن', 'بزرگداشت', 'جشنواره', 'مراسم', 'نمایش', 'نمایشگاه'
];

const PostCategorySelect: React.FC<PostCategorySelectProps> = ({ label, selectedCategory, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      value={selectedCategory}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2 w-full"
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
);

export default PostCategorySelect;