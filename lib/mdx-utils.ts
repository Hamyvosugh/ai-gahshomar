// lib/mdx-utils.ts
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

export async function serializeMDX(content: string) {
  return serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      // Cast rehypeHighlight to any to avoid TypeScript errors with incompatible versions
      rehypePlugins: [[rehypeHighlight as any, {}]],
    },
  });
}

export function extractHeadings(content: string): TOCHeading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: TOCHeading[] = [];
  
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    
    // Generate an ID from the heading text
    // (similar to how GitHub does it for markdown)
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
      
    headings.push({ id, text, level });
  }
  
  return headings;
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = words / wordsPerMinute;
  
  return Math.ceil(minutes);
}

// Function to process the MDX content and add IDs to headings
export function addIdsToHeadings(content: string): string {
  return content.replace(
    /^(#{1,6})\s+(.+)$/gm,
    (match, hashes, text) => {
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
        
      return `${hashes} ${text} {#${id}}`;
    }
  );
}