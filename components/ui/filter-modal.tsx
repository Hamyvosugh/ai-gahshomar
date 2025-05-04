// components/ui/filter-modal.tsx
import { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { PostMeta } from '@/lib/types';

interface FilterModalProps {
  posts: PostMeta[];
  onFilter: (filtered: PostMeta[]) => void;
  categories: string[];
  tags: string[];
}

export default function FilterModal({ posts, onFilter, categories, tags }: FilterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (selectedCategories.length === 0 && selectedTags.length === 0) {
      onFilter(posts);
      return;
    }

    let filtered = [...posts];
    
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
  }, [selectedCategories, selectedTags, posts]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        aria-label="فیلترها"
      >
        <Filter size={24} />
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto rtl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-lg">فیلترها</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <h4 className="font-medium mb-2">دسته‌بندی‌ها</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCategories.includes(category)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">برچسب‌ها</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedTags.includes(tag)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              {(selectedCategories.length > 0 || selectedTags.length > 0) && (
                <div className="flex justify-between items-center border-t pt-4">
                  <button
                    onClick={clearFilters}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    پاک کردن فیلترها
                  </button>
                  <span className="text-sm text-gray-600">
                    {`${
                      posts.length -
                      (
                        posts.filter(post => 
                          (selectedCategories.length === 0 || post.categories.some(category => selectedCategories.includes(category))) &&
                          (selectedTags.length === 0 || post.tags.some(tag => selectedTags.includes(tag)))
                        ).length
                      )
                    } مورد فیلتر شده`}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex justify-end p-4 border-t">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                اعمال فیلترها
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}