// components/PersonalEvents/AddEventForm/index.tsx
'use client';

import { useState } from 'react';
import { useAddEvent } from '../hooks/useAddEvent';
import { eventCategories } from '@/types/personalEvents';
import DatePicker from './DatePicker';
import CategorySelector from './CategorySelector';

interface AddEventFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  canAdd: boolean;
  eventCount: { current: number; max: number };
}

export default function AddEventForm({ onSuccess, onCancel, canAdd, eventCount }: AddEventFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState<string>('other');
  const [isPersian, setIsPersian] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { addEvent } = useAddEvent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canAdd) return;

    setLoading(true);
    setError(null);

    try {
      const { error } = await addEvent({
        title,
        description,
        date,
        category,
        is_persian: isPersian
      });

      if (error) throw new Error(error);
      
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در افزودن مناسبت');
    } finally {
      setLoading(false);
    }
  };

  if (!canAdd) {
    return (
      <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-600 dark:text-red-400 font-medium">
          شما به حداکثر تعداد مناسبت‌های مجاز ({eventCount.max}) رسیده‌اید.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          برای افزودن مناسبت‌های بیشتر، نیاز به خرید توکن دارید.
        </p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          disabled
        >
          خرید توکن (به زودی)
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Event Limit Status */}
      <div className="text-sm text-gray-600 dark:text-gray-400 text-left">
        تعداد مناسبت‌ها: {eventCount.current} از {eventCount.max}
      </div>

      {/* Title Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          عنوان مناسبت
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="مثال: تولد علی"
        />
      </div>

      {/* Description Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          توضیحات (اختیاری)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="توضیحات اضافی..."
        />
      </div>

      {/* Date Picker */}
      <DatePicker
        value={date}
        onChange={setDate}
        isPersian={isPersian}
        onCalendarTypeChange={setIsPersian}
      />

      {/* Category Selector */}
      <CategorySelector
        value={category}
        onChange={setCategory}
      />

      {/* Error Message */}
      {error && (
        <div className="text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 space-x-reverse">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          disabled={loading}
        >
          انصراف
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={loading}
        >
          {loading ? 'در حال ذخیره...' : 'ذخیره'}
        </button>
      </div>
    </form>
  );
}