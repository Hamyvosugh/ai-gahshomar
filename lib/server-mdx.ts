// lib/server-mdx.ts
// Functions for server-side MDX operations
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Post, PostMeta } from './types';
import { addIdsToHeadings } from './mdx-utils';

// Path to blog content directory
const contentDirectory = path.join(process.cwd(), 'content', 'blog');

/**
 * Get a single post by slug
 */
export async function getPostBySlugFromFS(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File not found for slug ${slug}: ${filePath}`);
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);
    
    // Add IDs to headings in the content
    const processedContent = addIdsToHeadings(content);
    
    // Ensure tags and categories are arrays
    const tags = Array.isArray(data.tags) ? data.tags : [];
    const categories = Array.isArray(data.categories) ? data.categories : [];
    
    return {
      ...data,
      slug,
      content: processedContent,
      readingTime: Math.ceil(stats.minutes),
      tags,
      categories
    } as Post;
  } catch (error) {
    console.error(`Error getting post for slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get all posts with metadata
 */
export async function getAllPostsFromFS(): Promise<PostMeta[]> {
  try {
    if (!fs.existsSync(contentDirectory)) {
      console.error(`Content directory does not exist: ${contentDirectory}`);
      return [];
    }
    
    const files = fs.readdirSync(contentDirectory);
    const posts = files
      .filter(file => file.endsWith('.mdx'))
      .map(file => {
        const slug = file.replace(/\.mdx$/, '');
        const filePath = path.join(contentDirectory, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        
        const { data, content } = matter(fileContents);
        const stats = readingTime(content);
        
        // Ensure tags and categories are arrays
        const tags = Array.isArray(data.tags) ? data.tags : [];
        const categories = Array.isArray(data.categories) ? data.categories : [];
        
        return {
          ...data,
          slug,
          readingTime: Math.ceil(stats.minutes),
          tags,
          categories
        } as PostMeta;
      });
    
    // Sort by date, newest first
    return posts.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) return -1;
      if (new Date(a.date) < new Date(b.date)) return 1;
      return 0;
    });
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}