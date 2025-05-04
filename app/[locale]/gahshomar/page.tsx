"use client";

import { useState, useEffect } from 'react';
import { getPostsByMonth } from '@/lib/blog';
import { getCurrentPersianMonth, getPersianMonthName, isToday } from '@/lib/jalali-calendar';
import BlogCard from '@/components/blog/blog-card';
import BlogFilters from '@/components/blog/blog-filters';
import MonthSelector from '@/components/ui/month-selector';
import FilterModal from '@/components/ui/filter-modal';
import { PostMeta } from '@/lib/types';
import { Locale } from '@/lib/i18n-config';

interface GahshomarPageProps {
  params: {
    locale: Locale;
  };
}

export default function GahshomarPage({ params }: GahshomarPageProps) {
  const [month, setMonth] = useState(getCurrentPersianMonth());
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostMeta[]>([]);
  const [todaysPosts, setTodaysPosts] = useState<PostMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Categories and tags for filtering
  const categories = Array.from(new Set(posts.flatMap(post => post.categories)));
  const tags = Array.from(new Set(posts.flatMap(post => post.tags)));

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const monthPosts = await getPostsByMonth(month);
      
      // Find today's posts
      const todayEvents = monthPosts.filter(post => 
        post.eventDate && isToday(post.eventDate)
      );
      
      setPosts(monthPosts);
      setFilteredPosts(monthPosts);
      setTodaysPosts(todayEvents);
      setIsLoading(false);
    };
    
    fetchPosts();
  }, [month]);

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
  };

  const handleFilter = (filtered: PostMeta[]) => {
    setFilteredPosts(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rtl">
        <h1 className="text-3xl font-bold mb-2">گاهشمار</h1>
        <p className="text-gray-600 mb-8">
          رویدادها و مناسبت‌های ماه {getPersianMonthName(month)}
        </p>
        
        <BlogFilters 
          posts={posts} 
          onFilter={handleFilter} 
        />
        
        {/* Today's Events */}
        {todaysPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">رویدادهای امروز</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {todaysPosts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}
        
        {/* All Month Events */}
        <h2 className="text-xl font-bold mb-4">همه رویدادهای {getPersianMonthName(month)}</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-600">هیچ رویدادی برای نمایش وجود ندارد.</p>
          </div>
        )}
      </div>
      
      <MonthSelector
        currentMonth={month}
        onMonthChange={handleMonthChange}
      />
      
      <FilterModal
        posts={posts}
        onFilter={handleFilter}
        categories={categories}
        tags={tags}
      />
    </div>
  );
}