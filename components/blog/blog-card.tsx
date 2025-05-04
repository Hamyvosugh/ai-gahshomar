"use client";

import Link from 'next/link';
import Image from 'next/image';
import { PostMeta } from '@/lib/types';
import { formatPersianDate, getDaysUntilEvent, isToday } from '@/lib/jalali-calendar';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';

interface BlogCardProps {
  post: PostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
  const params = useParams();
  const locale = params.locale || 'fa';
  const daysDiff = post.eventDate ? getDaysUntilEvent(post.eventDate) : null;
  const isEventToday = post.eventDate ? isToday(post.eventDate) : false;
  
  return (
    <Link href={`/${locale}/blog/${post.slug}`}>
      <article 
        className={cn(
          "bg-white rounded-lg shadow-md overflow-hidden h-full transition-transform hover:scale-[1.02] hover:shadow-lg",
          isEventToday && "ring-2 ring-blue-500"
        )}
      >
        <div className="relative h-48">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
          {post.type === 'gahshomar' && post.eventDate && (
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm rounded-bl-lg rtl">
              {post.eventDate}
            </div>
          )}
          {post.type === 'jahannameh' && post.country && (
            <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 text-sm rounded-bl-lg rtl">
              {post.country}
            </div>
          )}
          {post.type === 'shahrnameh' && post.province && (
            <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-sm rounded-bl-lg rtl">
              {post.province}
            </div>
          )}
        </div>
        
        <div className="p-4 rtl">
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-600 mb-4 text-sm line-clamp-2">{post.excerpt}</p>
          
          {post.type === 'gahshomar' && daysDiff !== null && (
            <div className={cn(
              "text-sm font-medium mb-3 px-2 py-1 rounded-md inline-block",
              isEventToday 
                ? "bg-blue-100 text-blue-800" 
                : daysDiff > 0 
                  ? "bg-green-100 text-green-800" 
                  : "bg-gray-100 text-gray-800"
            )}>
              {isEventToday 
                ? "امروز" 
                : daysDiff > 0 
                  ? `${daysDiff} روز مانده` 
                  : `${Math.abs(daysDiff)} روز گذشته`}
            </div>
          )}
          
          <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
            <span>{formatPersianDate(post.date)}</span>
            {post.readingTime && (
              <span>{post.readingTime} دقیقه خواندن</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}