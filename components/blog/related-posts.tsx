"use client";

import Link from 'next/link';
import Image from 'next/image';
import { PostMeta } from '@/lib/types';
import { useParams } from 'next/navigation';

interface RelatedPostsProps {
  posts: PostMeta[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  const params = useParams();
  const locale = params.locale || 'fa';
  
  if (posts.length === 0) return null;

  return (
    <div className="my-12 rtl">
      <h2 className="text-2xl font-bold mb-6">مطالب مرتبط</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
            <article className="bg-white rounded-lg shadow-md overflow-hidden h-full hover:shadow-lg transition-transform hover:scale-[1.02]">
              <div className="relative h-40">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}