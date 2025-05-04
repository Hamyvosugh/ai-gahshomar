

// components/blog/province-selector.tsx
import { useState } from 'react';

interface ProvinceSelectorProps {
  onProvinceSelect: (province: string) => void;
}

export default function ProvinceSelector({ onProvinceSelect }: ProvinceSelectorProps) {
  const provinces = [
    'تهران',
    'اصفهان',
    'فارس',
    'خراسان رضوی',
    'آذربایجان شرقی',
    'آذربایجان غربی',
    'گیلان',
    'مازندران',
    'کرمان',
    'خوزستان',
    'هرمزگان',
    'کردستان',
    'همدان',
    'لرستان',
    'سیستان و بلوچستان',
    'یزد',
    'بوشهر',
    'اردبیل',
    'قم',
    'زنجان',
    'قزوین',
    'گلستان',
    'کرمانشاه',
    'چهارمحال و بختیاری',
    'سمنان',
    'ایلام',
    'کهگیلویه و بویراحمد',
    'خراسان جنوبی',
    'خراسان شمالی',
    'البرز'
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8 rtl">
      <h2 className="text-2xl font-bold mb-6 text-center">لطفاً استان مورد نظر خود را انتخاب کنید</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {provinces.map(province => (
          <button
            key={province}
            onClick={() => onProvinceSelect(province)}
            className="bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors text-center"
          >
            {province}
          </button>
        ))}
      </div>
    </div>
  );
}