'use client';
import React, { useState } from 'react';

// Types
interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  isHoliday: boolean;
  country: string[];
  blogUrl?: string;
}

// Persian month names
const persianMonths = [
  { value: 1, label: 'فروردین' },
  { value: 2, label: 'اردیبهشت' },
  { value: 3, label: 'خرداد' },
  { value: 4, label: 'تیر' },
  { value: 5, label: 'مرداد' },
  { value: 6, label: 'شهریور' },
  { value: 7, label: 'مهر' },
  { value: 8, label: 'آبان' },
  { value: 9, label: 'آذر' },
  { value: 10, label: 'دی' },
  { value: 11, label: 'بهمن' },
  { value: 12, label: 'اسفند' }
];

// Countries
const countries = [
  { value: 'iran', label: 'ایران' },
  { value: 'usa', label: 'آمریکا' },
  { value: 'germany', label: 'آلمان' },
  { value: 'uae', label: 'امارات' }
];

const CalendarEventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isHoliday: false,
    country: [] as string[],
    blogUrl: '',
    dateType: 'persian' as 'persian' | 'gregorian',
    // Persian date
    persianDay: 1,
    persianMonth: 1,
    persianYear: 1404,
    // Gregorian date
    gregorianDate: new Date().toISOString().split('T')[0]
  });

  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      country: selectedOptions
    });
  };

  const saveToFile = async () => {
    setStatus('saving');
    setErrorMessage('');

    let dateString = '';
    
    if (formData.dateType === 'persian') {
      const day = String(formData.persianDay).padStart(2, '0');
      const month = String(formData.persianMonth).padStart(2, '0');
      dateString = `${formData.persianYear}-${month}-${day}`;
    } else {
      dateString = formData.gregorianDate;
    }

    const event: CalendarEvent = {
      id: Math.random().toString(36).substr(2, 9),
      date: dateString,
      title: formData.title,
      description: formData.description,
      isHoliday: formData.isHoliday,
      country: formData.country,
      ...(formData.blogUrl && { blogUrl: formData.blogUrl })
    };

    try {
      const response = await fetch('/api/jason-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        // Reset form
        setFormData({
          title: '',
          description: '',
          isHoliday: false,
          country: [],
          blogUrl: '',
          dateType: 'persian',
          persianDay: 1,
          persianMonth: 1,
          persianYear: 1404,
          gregorianDate: new Date().toISOString().split('T')[0]
        });
      } else {
        throw new Error(result.error || 'Unknown error occurred');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">افزودن مناسبت جدید</h1>
      
      <div className="space-y-4">
        {/* Date Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">نوع تاریخ</label>
          <select
            name="dateType"
            value={formData.dateType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="persian">تاریخ شمسی</option>
            <option value="gregorian">تاریخ میلادی</option>
          </select>
        </div>

        {/* Date Fields */}
        {formData.dateType === 'persian' ? (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">روز</label>
              <input
                type="number"
                name="persianDay"
                value={formData.persianDay}
                onChange={handleInputChange}
                min="1"
                max="31"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ماه</label>
              <select
                name="persianMonth"
                value={formData.persianMonth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {persianMonths.map(month => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">سال</label>
              <input
                type="number"
                name="persianYear"
                value={formData.persianYear}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">تاریخ میلادی</label>
            <input
              type="date"
              name="gregorianDate"
              value={formData.gregorianDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">عنوان مناسبت</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="مثال: نوروز"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">توضیحات</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="توضیحات مربوط به این مناسبت"
          />
        </div>

        {/* Countries */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">کشورها</label>
          <select
            multiple
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            size={4}
          >
            {countries.map(country => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">برای انتخاب چند کشور، کلید Ctrl را نگه دارید</p>
        </div>

        {/* Is Holiday */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isHoliday"
            checked={formData.isHoliday}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="mr-2 text-sm font-medium text-gray-700">
            تعطیل رسمی
          </label>
        </div>

        {/* Blog URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">لینک بلاگ (اختیاری)</label>
          <input
            type="text"
            name="blogUrl"
            value={formData.blogUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="/blog/event-name"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={saveToFile}
            disabled={status === 'saving'}
            className={`px-6 py-2 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              status === 'saving'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            }`}
          >
            {status === 'saving' ? 'در حال ذخیره...' : 'ذخیره در فایل'}
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
          مناسبت با موفقیت اضافه شد!
        </div>
      )}
      
      {status === 'error' && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          خطا در ذخیره مناسبت: {errorMessage}
        </div>
      )}
    </div>
  );
};

export default CalendarEventForm;