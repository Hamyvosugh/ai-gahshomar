// /components/convertor/ProgressIndicator.tsx
import React from 'react';
import { toPersianNumber } from './utils';

interface ProgressIndicatorProps {
  currentSlide: number;
  totalSlides: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentSlide, totalSlides }) => {
  return (
    <div className="flex justify-between mb-8">
      {Array.from({ length: totalSlides }, (_, i) => i + 1).map(step => (
        <div 
          key={step}
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentSlide === step
              ? 'bg-blue-950 text-white'
              : currentSlide > step
              ? 'bg-green-900/50 text-white'
              : 'bg-gray-300 text-gray-700'
          }`}
        >
          {toPersianNumber(step)}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;