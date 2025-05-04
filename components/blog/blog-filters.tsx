
// components/blog/blog-filters.tsx
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { PostMeta } from '@/lib/types';

interface BlogFiltersProps {
  posts: PostMeta[];
  onFilter: (filtered: PostMeta[]) => void;
  selectedCategories?: string[];
  selectedTags?: string[];
}

export default function BlogFilters({ posts, onFilter, selectedCategories = [], selectedTags = [] }: BlogFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Extract all unique categories and tags
  const categories = Array.from(new Set(posts.flatMap(post => post.categories)));
  const tags = Array.from(new Set(posts.flatMap(post => post.tags)));

  useEffect(() => {
    let filtered = [...posts];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.excerpt.toLowerCase().includes(term)
      );
    }
    
    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(post => 
        post.categories.some(category => selectedCategories.includes(category))
      );
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => 
        post.tags.some(tag => selectedTags.includes(tag))
      );
    }
    
    onFilter(filtered);
  }, [searchTerm, selectedCategories, selectedTags, posts]);

  return (
    <div className="mb-8 rtl">
      <div className="relative">
        <input
          type="text"
          placeholder="جستجو در محتوا..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm"
        />
        <Search className="absolute top-3 right-3 text-gray-400" size={20} />
      </div>
      
      {(selectedCategories.length > 0 || selectedTags.length > 0 || searchTerm) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {searchTerm && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
              <span>جستجو: {searchTerm}</span>
              <button
                onClick={() => setSearchTerm('')}
                className="ml-2 text-blue-800 hover:text-blue-600"
              >
                &times;
              </button>
            </div>
          )}
          
          {selectedCategories.map(category => (
            <div key={category} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {category}
            </div>
          ))}
          
          {selectedTags.map(tag => (
            <div key={tag} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
