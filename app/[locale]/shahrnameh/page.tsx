"use client";

import { useState, useEffect } from 'react';
import { getPostsByType, getPostsByProvince } from '@/lib/blog';
import BlogCard from '@/components/blog/blog-card';
import BlogFilters from '@/components/blog/blog-filters';
import ProvinceSelector from '@/components/blog/province-selector';
import FilterModal from '@/components/ui/filter-modal';
import { PostMeta } from '@/lib/types';
import { Locale } from '@/lib/i18n-config';
import { MapPin } from 'lucide-react';

interface ShahrnamehPageProps {
  params: {
    locale: Locale;
  };
}

export default function ShahrnamehPage({ params }: ShahrnamehPageProps) {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  // Categories and tags for filtering
  const categories = Array.from(new Set(posts.flatMap(post => post.categories)));
  const tags = Array.from(new Set(posts.flatMap(post => post.tags)));

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      
      if (selectedProvince) {
        const provincePosts = await getPostsByProvince(selectedProvince);
        setPosts(provincePosts);
        setFilteredPosts(provincePosts);
      } else {
        const shahrnamehPosts = await getPostsByType('shahrnameh');
        setPosts(shahrnamehPosts);
        setFilteredPosts(shahrnamehPosts);
      }
      
      setIsLoading(false);
    };
    
    fetchPosts();
  }, [selectedProvince]);

  const handleFilter = (filtered: PostMeta[]) => {
    setFilteredPosts(filtered);
  };

  const handleProvinceSelect = (province: string) => {
    setSelectedProvince(province);
  };

  const handleResetProvince = () => {
    setSelectedProvince(null);
  };

  if (!selectedProvince) {
    return <ProvinceSelector onProvinceSelect={handleProvinceSelect} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rtl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">شهرنامه - {selectedProvince}</h1>
          <button
            onClick={handleResetProvince}
            className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            <MapPin size={18} className="ml-2" />
            تغییر استان
          </button>
        </div>
        <p className="text-gray-600 mb-8">
          آشنایی با فرهنگ و تاریخ استان {selectedProvince}
        </p>
        
        <BlogFilters 
          posts={posts} 
          onFilter={handleFilter} 
        />
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-600">هیچ مقاله‌ای برای استان {selectedProvince} وجود ندارد.</p>
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