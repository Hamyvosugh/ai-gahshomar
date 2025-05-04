// app/admin/posts/new/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [slug, setSlug] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [postType, setPostType] = useState('گاهشمار');
  const [eventDate, setEventDate] = useState('');
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');
  const [tags, setTags] = useState('');
  const [categories, setCategories] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const payload = {
      title,
      excerpt,
      slug,
      thumbnail_url: thumbnailUrl,
      post_type: postType,
      event_date: eventDate || null,
      country: country || null,
      province: province || null,
      tags: tags.split(',').map(tag => tag.trim()),
      categories: categories.split(',').map(cat => cat.trim()),
      content,
    };

    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.push('/admin/posts');
    } else {
      const data = await res.json();
      setError(data.error || 'خطا در ایجاد پست');
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ایجاد پست جدید</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="عنوان"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="شناسه (اسلاگ)"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="خلاصه"
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="لینک تصویر کاور"
          value={thumbnailUrl}
          onChange={e => setThumbnailUrl(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <select
          value={postType}
          onChange={e => setPostType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option>گاهشمار</option>
          <option>گاهنامه</option>
          <option>دانشنامه</option>
          <option>جهان نامه</option>
          <option>شهرنامه</option>
        </select>
        {postType === 'گاهشمار' && (
          <input
            type="date"
            placeholder="تاریخ مناسبت"
            value={eventDate}
            onChange={e => setEventDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        )}
        {postType === 'جهان نامه' && (
          <input
            type="text"
            placeholder="نام کشور"
            value={country}
            onChange={e => setCountry(e.target.value)}
            className="w-full border p-2 rounded"
          />
        )}
        {postType === 'شهرنامه' && (
          <input
            type="text"
            placeholder="نام استان"
            value={province}
            onChange={e => setProvince(e.target.value)}
            className="w-full border p-2 rounded"
          />
        )}
        <input
          type="text"
          placeholder="تگ‌ها (با کاما جدا کنید)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="دسته‌بندی‌ها (با کاما جدا کنید)"
          value={categories}
          onChange={e => setCategories(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="محتوای MDX"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full border p-2 rounded h-48"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ارسال
        </button>
      </form>
    </div>
  );
}
