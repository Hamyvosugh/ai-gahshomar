// /components/convertor/SlideYearInput.tsx
  import React from 'react';
  import { toEnglishNumber } from './utils';
  
  interface SlideYearInputProps {
    year: string;
    setYear: (year: string) => void;
    onContinue: () => void;
    onBack: () => void;
  }
  
  const SlideYearInput: React.FC<SlideYearInputProps> = ({ year, setYear, onContinue, onBack }) => {
    const handleYearInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      // Allow both English and Persian digits
      if (/^[0-9۰-۹]*$/.test(input)) {
        setYear(input);
      }
    };
  
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-xl text-blue-950 mb-6 text-right w-full"> سال خود را بنویسید  </h2>
        <div className="w-full">
          <input
            type="text"
            value={year}
            onChange={handleYearInput}
            className="w-full text-2xl text-black p-4 border-2 border-gray-300 rounded-lg text-center mb-8 focus:border-blue-500 focus:outline-none"
            placeholder=" تنها عدد سال را وارد کنید "
            dir="rtl"
          />
          <div className="flex justify-between w-full">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg"
              onClick={onBack}
            >
              بازگشت
            </button>
            <button
              className={`bg-blue-950/90 hover:bg-green-900/60 text-white py-2 px-6 rounded-lg ${!year ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => year ? onContinue() : null}
              disabled={!year}
            >
              ادامه
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default SlideYearInput;
  