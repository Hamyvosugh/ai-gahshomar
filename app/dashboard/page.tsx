// app/dashboard/page.tsx
'use client';

import { DashboardClient } from './DashboardClient';

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <DashboardClient />
     </div>
    </main>
  );
}