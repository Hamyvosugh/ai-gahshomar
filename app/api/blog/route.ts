// app/api/blog/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { PostMeta } from '@/lib/types';

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (slug) {
      // Get specific post
      const post = await getPost(slug);
      return NextResponse.json(post);
    } else {
      // Get all posts
      const posts = await getAllPosts();
      return NextResponse.json(posts);
    }
  } catch (error) {
    console.error('Error in blog API:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

async function getPost(slug: string) {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);
    
    return {
      ...data,
      slug,
      content,
      readingTime: Math.ceil(stats.minutes)
    };
  } catch (error) {
    return null;
  }
}

async function getAllPosts() {
  try {
    const files = fs.readdirSync(contentDirectory);
    const posts = files
      .filter(file => file.endsWith('.mdx'))
      .map(file => {
        const slug = file.replace(/\.mdx$/, '');
        const filePath = path.join(contentDirectory, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        
        const { data, content } = matter(fileContents);
        const stats = readingTime(content);
        
        return {
          ...data,
          slug,
          readingTime: Math.ceil(stats.minutes)
        };
      });
    
    // Sort by date, newest first
    return posts.sort((a: any, b: any) => {
      if (new Date(a.date) > new Date(b.date)) return -1;
      if (new Date(a.date) < new Date(b.date)) return 1;
      return 0;
    });
  } catch (error) {
    return [];
  }
}