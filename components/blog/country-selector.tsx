
// components/blog/country-selector.tsx
import { useState } from 'react';

interface CountrySelectorProps {
  onCountrySelect: (country: string) => void;
}

export default function CountrySelector({ onCountrySelect }: CountrySelectorProps) {
  const countries = [
    'ایران',
    'آلمان',
    'آمریکا',
    'فرانسه',
    'انگلستان',
    'ژاپن',
    'چین',
    'روسیه',
    'ترکیه',
    'امارات',
    'هند',
    'اسپانیا',
    'ایتالیا',
    'استرالیا',
    'کانادا',
    'برزیل'
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8 rtl">
      <h2 className="text-2xl font-bold mb-6 text-center">لطفاً کشور مورد نظر خود را انتخاب کنید</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {countries.map(country => (
          <button
            key={country}
            onClick={() => onCountrySelect(country)}
            className="bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors text-center"
          >
            {country}
          </button>
        ))}
      </div>
    </div>
  );
}