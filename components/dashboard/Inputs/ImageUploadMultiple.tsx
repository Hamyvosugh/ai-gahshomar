import React, { useState } from 'react';

interface ImageUploadMultipleProps {
  label: string;
  onChange: (files: File[]) => void;
}

const ImageUploadMultiple: React.FC<ImageUploadMultipleProps> = ({ label, onChange }) => {
  const [images, setImages] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImages(files);
    onChange(files);
  };

  const handleDelete = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onChange(newImages);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
      {images.length > 0 && (
        <div className="mt-2">
          {images.map((image, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{image.name}</span>
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploadMultiple;