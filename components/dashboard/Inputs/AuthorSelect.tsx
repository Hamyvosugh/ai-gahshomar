import React from 'react';

interface AuthorSelectProps {
  label: string;
  selectedAuthor: string;
  onChange: (author: string) => void;
}

const authors = [
  'Author_01', 'Author_02', 'Author_03', 'Author_04', 'Author_05'
];

const AuthorSelect: React.FC<AuthorSelectProps> = ({ label, selectedAuthor, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      value={selectedAuthor}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2 w-full"
    >
      {authors.map((author) => (
        <option key={author} value={author}>
          {author}
        </option>
      ))}
    </select>
  </div>
);

export default AuthorSelect;