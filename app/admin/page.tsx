// app/admin/page.tsx

import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// مقداردهی اولیه Supabase client (Server Component)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // یا از ANON KEY استفاده کنید
);

export default async function AdminPage() {
  // دریافت آخرین ۱۰ پست و تعداد کل
  const { data: posts, count } = await supabase
    .from('posts')
    .select('id, title', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">داشبورد ادمین</h1>
      {/* نمایش تعداد کل پست‌ها */}
      <p className="mb-6">تعداد کل پست‌ها: {count}</p>

      {/* لیست آخرین پست‌ها */}
      <h2 className="text-xl font-semibold mb-2">آخرین پست‌ها</h2>
      <ul className="space-y-2">
        {posts?.map(post => (
          <li key={post.id}>
            <Link href={`/admin/posts/${post.id}`} className="text-blue-600 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
