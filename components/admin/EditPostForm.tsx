// components/admin/EditPostForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  thumbnail_url: string;
  post_type: string;
  event_date: string | null;
  country: string | null;
  province: string | null;
  tags: string[];
  categories: string[];
  content: string;
}

export default function EditPostForm({ initialPost }: { initialPost: Post }) {
  const router = useRouter();
  const [title, setTitle] = useState(initialPost.title);
  const [excerpt, setExcerpt] = useState(initialPost.excerpt);
  const [slug, setSlug] = useState(initialPost.slug);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialPost.thumbnail_url);
  const [postType, setPostType] = useState(initialPost.post_type);
  const [eventDate, setEventDate] = useState(initialPost.event_date || '');
  const [country, setCountry] = useState(initialPost.country || '');
  const [province, setProvince] = useState(initialPost.province || '');
  const [tags, setTags] = useState(initialPost.tags.join(','));
  const [categories, setCategories] = useState(initialPost.categories.join(','));
  const [content, setContent] = useState(initialPost.content);
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

    const res = await fetch(`/api/admin/posts/${initialPost.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.push('/admin/posts');
    } else {
      const data = await res.json();
      setError(data.error || 'خطا در به‌روزرسانی پست');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {/* فیلدها مشابه NewPostPage */}
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
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
            value={eventDate}
            onChange={e => setEventDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        )}
        {postType === 'جهان نامه' && (
          <input
            type="text"
            value={country}
            onChange={e => setCountry(e.target.value)}
            className="w-full border p-2 rounded"
          />
        )}
        {postType === 'شهرنامه' && (
          <input
            type="text"
            value={province}
            onChange={e => setProvince(e.target.value)}
            className="w-full border p-2 rounded"
          />
        )}
        <input
          type="text"
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={categories}
          onChange={e => setCategories(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full border p-2 rounded h-48"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        به‌روزرسانی
      </button>
    </form>
  );
}
