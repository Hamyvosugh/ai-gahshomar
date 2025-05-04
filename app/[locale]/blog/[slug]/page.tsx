// app/[locale]/blog/[slug]/page.tsx
import { getPostBySlugFromFS } from '@/lib/server-mdx';
import { getRelatedPosts } from '@/lib/blog';
import { extractHeadings } from '@/lib/mdx-utils';
import BlogHeader from '@/components/blog/blog-header';
import BlogContent from '@/components/blog/blog-content';
import RelatedPosts from '@/components/blog/related-posts';
import ShareButtons from '@/components/blog/share-buttons';
import TableOfContents from '@/components/blog/table-of-contents';
import { Locale } from '@/lib/i18n-config';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    slug: string;
    locale: Locale;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = params;
  
  // Use the direct filesystem function instead of fetch
  const post = await getPostBySlugFromFS(slug);
  
  if (!post) {
    return notFound();
  }
  
  const relatedPosts = await getRelatedPosts(post);
  
  const headings = extractHeadings(post.content);
  
  // Get the canonical URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gahshomar.example.com';
  const canonicalUrl = `${baseUrl}/${locale}/blog/${slug}`;
  
  return (
    <article className="container mx-auto px-4 py-8">
      <BlogHeader post={post} />
      
      <div className="flex flex-col md:flex-row md:gap-8">
        <aside className="md:w-1/4">
          <TableOfContents headings={headings} />
          <ShareButtons title={post.title} url={canonicalUrl} />
        </aside>
        
        <div className="md:w-3/4">
          <BlogContent post={post} content={post.content} />
        </div>
      </div>
      
      <RelatedPosts posts={relatedPosts} />
    </article>
  );
}