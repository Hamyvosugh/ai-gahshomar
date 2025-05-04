

// components/blog/blog-content.tsx
import { MDXRemote } from 'next-mdx-remote';
import Advertisement from '@/components/ui/advertisement';
import YoutubeEmbed from '@/components/ui/youtube-embed';
import ImageSlider from '@/components/ui/image-slider';
import { PostMeta } from '@/lib/types';

interface BlogContentProps {
  post: PostMeta;
  content: string;
}

export default function BlogContent({ post, content }: BlogContentProps) {
  // MDX components
  const components = {
    YoutubeEmbed,
    ImageSlider,
    figure: (props: any) => (
      <figure className="my-8">
        {props.children}
      </figure>
    ),
    figcaption: (props: any) => (
      <figcaption className="text-center text-sm text-gray-500 mt-2">
        {props.children}
      </figcaption>
    ),
  };

  return (
    <div className="mx-auto max-w-3xl rtl">
      {post.adTop && (
        <Advertisement
          title={post.adTop.title}
          description={post.adTop.description}
          image={post.adTop.image}
          buttonText={post.adTop.buttonText}
          buttonLink={post.adTop.buttonLink}
        />
      )}
      
      <div className="prose prose-lg prose-blue max-w-none">
        <MDXRemote
          compiledSource={content}
          components={components}
        />
      </div>
      
      {post.adBottom && (
        <Advertisement
          title={post.adBottom.title}
          description={post.adBottom.description}
          image={post.adBottom.image}
          buttonText={post.adBottom.buttonText}
          buttonLink={post.adBottom.buttonLink}
        />
      )}
    </div>
  );
}