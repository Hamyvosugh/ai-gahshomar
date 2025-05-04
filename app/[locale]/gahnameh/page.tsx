"use client";

import { useState, useEffect } from 'react';
import { getPostsByType } from '@/lib/blog';
import BlogCard from '@/components/blog/blog-card';
import BlogFilters from '@/components/blog/blog-filters';
import FilterModal from '@/components/ui/filter-modal';
import { PostMeta } from '@/lib/types';
import { Locale } from '@/lib/i18n-config';

interface GahnamehPageProps {
  params: {
    locale: Locale;
  };
}

export default function GahnamehPage({ params }: GahnamehPageProps) {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Categories and tags for filtering
  const categories = Array.from(new Set(posts.flatMap(post => post.categories)));
  const tags = Array.from(new Set(posts.flatMap(post => post.tags)));

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const gahnamehPosts = await getPostsByType('gahnameh');
      
      setPosts(gahnamehPosts);
      setFilteredPosts(gahnamehPosts);
      setIsLoading(false);
    };
    
    fetchPosts();
  }, []);

  const handleFilter = (filtered: PostMeta[]) => {
    setFilteredPosts(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rtl">
        <h1 className="text-3xl font-bold mb-2">گاهنامه</h1>
        <p className="text-gray-600 mb-8">
          مقالات و محتوای تاریخی-فرهنگی
        </p>
        
        <BlogFilters 
          posts={posts} 
          onFilter={handleFilter} 
        />
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-600">هیچ مقاله‌ای برای نمایش وجود ندارد.</p>
          </div>
        )}
      </div>
      
      <FilterModal
        posts={posts}
        onFilter={handleFilter}
        categories={categories}
        tags={tags}
      />
    </div>
  );
}