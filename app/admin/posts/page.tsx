// app/admin/posts/page.tsx

import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// مقداردهی اولیه Supabase client (Server Component)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function PostsListPage() {
  // دریافت همه پست‌ها
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, published_at, post_type')
    .order('published_at', { ascending: false });

  if (error) {
    return <div className="text-red-500">خطا در دریافت پست‌ها: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">مدیریت پست‌ها</h1>
      <Link
        href="/admin/posts/new"
        className="inline-block mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + ایجاد پست جدید
      </Link>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">عنوان</th>
            <th className="p-2 border">تاریخ انتشار</th>
            <th className="p-2 border">نوع</th>
            <th className="p-2 border">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => (
            <tr key={post.id}>
              <td className="p-2 border">{post.title}</td>
              <td className="p-2 border">
                {new Date(post.published_at!).toLocaleDateString('fa-IR')}
              </td>
              <td className="p-2 border">{post.post_type}</td>
              <td className="p-2 border space-x-4">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="text-blue-600 hover:underline"
                >
                  ویرایش
                </Link>
                {/* دکمه حذف با فرم Action مخصوص */}
                <form action={`/admin/posts/${post.id}/delete`} method="POST" className="inline">
                  <button
                    type="submit"
                    className="text-red-600 hover:underline"
                  >
                    حذف
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
