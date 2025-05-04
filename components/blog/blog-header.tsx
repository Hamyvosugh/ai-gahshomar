
// components/blog/blog-header.tsx
import Image from 'next/image';
import { formatPersianDate } from '@/lib/jalali-calendar';
import { PostMeta } from '@/lib/types';
import { Clock } from 'lucide-react';

interface BlogHeaderProps {
  post: PostMeta;
}

export default function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <div className="mb-8 rtl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
      
      <div className="flex items-center mb-6">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image
            src={post.author.image}
            alt={post.author.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-medium">{post.author.name}</p>
          <p className="text-gray-600 text-sm">{post.author.title}</p>
        </div>
        <div className="mr-auto flex items-center text-gray-500 text-sm">
          <span className="mr-4">{formatPersianDate(post.date)}</span>
          {post.readingTime && (
            <span className="flex items-center">
              <Clock size={16} className="mr-1" />
              {post.readingTime} دقیقه خواندن
            </span>
          )}
        </div>
      </div>
      
      <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
