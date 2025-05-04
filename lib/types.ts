export type PostType = 'gahshomar' | 'gahnameh' | 'daneshnameh' | 'jahannameh' | 'shahrnameh';

export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  type: PostType;
  excerpt: string;
  author: {
    name: string;
    title: string;
    image: string;
  };
  coverImage: string;
  metaImage?: string; // SEO image (falls back to coverImage)
  metaDescription?: string;
  readingTime?: number;
  tags?: string[];
  categories?: string[];
  
  // For Jahannameh (world guide)
  country?: string;
  
  // For Shahrnameh (city guide)
  province?: string;
  
  // For Gahshomar (calendar)
  eventDate?: string; // Persian date like "2 اردیبهشت"
  
  // Advertisement data
  adTop?: {
    title: string;
    description: string;
    image: string;
    buttonText: string;
    buttonLink: string;
  };
  adBottom?: {
    title: string;
    description: string;
    image: string;
    buttonText: string;
    buttonLink: string;
  };
}

export interface Post extends PostMeta {
  content: string;
}