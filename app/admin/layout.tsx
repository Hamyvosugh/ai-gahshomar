// app/admin/layout.tsx
import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import Link from 'next/link';

export const metadata = {
  title: 'داشبورد ادمین',
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // بررسی کوکی احراز هویت
  const cookieStore = cookies();
  const auth = (await cookieStore).get('Authorization')?.value;


  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* سایدبار */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">پنل ادمین</h2>
        <nav className="space-y-2">
          <Link href="/admin" className="block py-2 px-3 rounded hover:bg-gray-200">
            داشبورد
          </Link>
          <Link href="/admin/posts" className="block py-2 px-3 rounded hover:bg-gray-200">
            مدیریت پست‌ها
          </Link>
          <Link href="/admin/posts/new" className="block py-2 px-3 rounded hover:bg-gray-200">
            ایجاد پست جدید
          </Link>
        </nav>
      </aside>

      {/* محتوای اصلی */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}