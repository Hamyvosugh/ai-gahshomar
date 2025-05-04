// lib/blog.ts
import { PostMeta, PostType, Post } from './types';
import { getCurrentPersianMonth, getPersianMonthName } from './jalali-calendar';
import { getAllPostsFromFS, getPostBySlugFromFS } from './server-mdx';

// Export the direct functions for server components to use
export { getPostBySlugFromFS as getPostBySlug, getAllPostsFromFS as getAllPosts };

export async function getPostsByType(type: PostType): Promise<PostMeta[]> {
  const allPosts = await getAllPostsFromFS();
  return allPosts.filter(post => post.type === type);
}

export async function getPostsByMonth(month: number): Promise<PostMeta[]> {
  const allPosts = await getAllPostsFromFS();
  const gahshomarPosts = allPosts.filter(post => post.type === 'gahshomar');
  
  // Filter posts by the Persian month in eventDate
  return gahshomarPosts.filter(post => {
    if (!post.eventDate) return false;
    
    const monthName = post.eventDate.split(' ')[1];
    const months = [
      'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];
    
    const postMonth = months.indexOf(monthName) + 1;
    return postMonth === month;
  });
}

export async function getPostsByCountry(country: string): Promise<PostMeta[]> {
  const allPosts = await getAllPostsFromFS();
  const jahannamehPosts = allPosts.filter(post => post.type === 'jahannameh');
  
  return jahannamehPosts.filter(post => post.country === country);
}

export async function getPostsByProvince(province: string): Promise<PostMeta[]> {
  const allPosts = await getAllPostsFromFS();
  const shahrnamehPosts = allPosts.filter(post => post.type === 'shahrnameh');
  
  return shahrnamehPosts.filter(post => post.province === province);
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  const allPosts = await getAllPostsFromFS();
  return allPosts.filter(post => post.tags && post.tags.includes(tag));
}

export async function getPostsByCategory(category: string): Promise<PostMeta[]> {
  const allPosts = await getAllPostsFromFS();
  return allPosts.filter(post => post.categories && post.categories.includes(category));
}

export async function getRelatedPosts(post: PostMeta, limit = 3): Promise<PostMeta[]> {
  const allPosts = await getAllPostsFromFS();
  
  // Ensure tags and categories are defined in the post
  const postTags = post.tags || [];
  const postCategories = post.categories || [];
  
  // Exclude the current post
  const otherPosts = allPosts.filter(p => p.slug !== post.slug);
  
  // Score posts by relevance (same type, tags, categories)
  const scoredPosts = otherPosts.map(p => {
    let score = 0;
    
    // Same type gets a high score
    if (p.type === post.type) score += 5;
    
    // Same country or province (if applicable)
    if (post.country && p.country === post.country) score += 3;
    if (post.province && p.province === post.province) score += 3;
    
    // Matching tags and categories - with null checks
    const sharedTags = (p.tags || []).filter(tag => postTags.includes(tag));
    const sharedCategories = (p.categories || []).filter(cat => postCategories.includes(cat));
    
    score += sharedTags.length * 2;
    score += sharedCategories.length * 1;
    
    return { post: p, score };
  });
  
  // Sort by score (highest first) and take the top 'limit' posts
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}