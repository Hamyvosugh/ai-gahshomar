"use client";

import { useState, useEffect } from 'react';
import { getPostsByType, getPostsByCountry } from '@/lib/blog';
import BlogCard from '@/components/blog/blog-card';
import BlogFilters from '@/components/blog/blog-filters';
import CountrySelector from '@/components/blog/country-selector';
import FilterModal from '@/components/ui/filter-modal';
import { PostMeta } from '@/lib/types';
import { Locale } from '@/lib/i18n-config';
import { Globe } from 'lucide-react';

interface JahannamehPageProps {
  params: {
    locale: Locale;
  };
}

export default function JahannamehPage({ params }: JahannamehPageProps) {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Categories and tags for filtering
  const categories = Array.from(new Set(posts.flatMap(post => post.categories)));
  const tags = Array.from(new Set(posts.flatMap(post => post.tags)));

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      
      if (selectedCountry) {
        const countryPosts = await getPostsByCountry(selectedCountry);
        setPosts(countryPosts);
        setFilteredPosts(countryPosts);
      } else {
        const jahannamehPosts = await getPostsByType('jahannameh');
        setPosts(jahannamehPosts);
        setFilteredPosts(jahannamehPosts);
      }
      
      setIsLoading(false);
    };
    
    fetchPosts();
  }, [selectedCountry]);

  const handleFilter = (filtered: PostMeta[]) => {
    setFilteredPosts(filtered);
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
  };

  const handleResetCountry = () => {
    setSelectedCountry(null);
  };

  if (!selectedCountry) {
    return <CountrySelector onCountrySelect={handleCountrySelect} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rtl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">جهان‌نامه - {selectedCountry}</h1>
          <button
            onClick={handleResetCountry}
            className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            <Globe size={18} className="ml-2" />
            تغییر کشور
          </button>
        </div>
        <p className="text-gray-600 mb-8">
          آشنایی با فرهنگ و تاریخ کشور {selectedCountry}
        </p>
        
        <BlogFilters 
          posts={posts} 
          onFilter={handleFilter} 
        />
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-600">هیچ مقاله‌ای برای کشور {selectedCountry} وجود ندارد.</p>
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