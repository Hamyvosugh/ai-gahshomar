// lib/mdx.ts
import { Post, PostMeta } from './types';

// Base URL for API requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // Use an absolute URL for server-side API requests
    const url = new URL(`/api/blog`, API_BASE_URL);
    url.searchParams.append('slug', slug);
    
    const response = await fetch(url.toString(), {
      next: { revalidate: 60 } // revalidate cache every 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    
    const post = await response.json();
    return post;
  } catch (error) {
    console.error(`Error getting post for slug ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    // Use an absolute URL for server-side API requests
    const url = new URL('/api/blog', API_BASE_URL);
    
    const response = await fetch(url.toString(), {
      next: { revalidate: 60 } // revalidate cache every 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}