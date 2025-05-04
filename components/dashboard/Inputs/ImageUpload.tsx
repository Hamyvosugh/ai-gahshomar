import React, { useState } from 'react';

interface ImageUploadProps {
  label: string;
  onChange: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, onChange }) => {
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      onChange(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
      {image && (
        <div className="mt-2">
          <p className="text-sm text-gray-600">File: {image.name}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;