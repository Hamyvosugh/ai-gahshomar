// components/PersonalEvents/EventsList/EmptyState.tsx
'use client';

import { Calendar } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-4">
        <Calendar className="w-8 h-8 text-neutral-400" />
      </div>
      <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
        هیچ مناسبتی ثبت نشده است
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400">
        برای شروع، اولین مناسبت خود را اضافه کنید
      </p>
    </div>
  );
}