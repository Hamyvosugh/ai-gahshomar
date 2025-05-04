import { getAllPosts } from '@/lib/mdx';
import { getCurrentPersianMonth, getPersianMonthName } from '@/lib/jalali-calendar';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Book, Globe, MapPin } from 'lucide-react';
import { PostMeta } from '@/lib/types';
import { Locale, i18nConfig } from '@/lib/i18n-config';

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default async function Home({ params: { locale } }: PageProps) {
  const allPosts = await getAllPosts();
  
  // Get recent posts for each type (limit to 4 per type)
  const gahshomarPosts = allPosts
    .filter((post: PostMeta) => post.type === 'gahshomar')
    .slice(0, 4);
    
  const gahnamehPosts = allPosts
    .filter((post: PostMeta) => post.type === 'gahnameh')
    .slice(0, 4);
    
  const daneshnamehPosts = allPosts
    .filter((post: PostMeta) => post.type === 'daneshnameh')
    .slice(0, 4);
    
  const jahannamehPosts = allPosts
    .filter((post: PostMeta) => post.type === 'jahannameh')
    .slice(0, 4);
    
  const shahrnamehPosts = allPosts
    .filter((post: PostMeta) => post.type === 'shahrnameh')
    .slice(0, 4);
  
  // Get the current Persian month
  const currentMonth = getCurrentPersianMonth();
  const currentMonthName = getPersianMonthName(currentMonth);
  
  const translations = {
    fa: {
      welcome: 'به گاهشمار فرهنگی خوش آمدید',
      intro: 'مرجع تاریخی و فرهنگی برای مناسبت‌ها، رویدادها و آشنایی با فرهنگ ایران و جهان',
      sections: 'بخش‌های وب‌سایت',
      gahshomar: 'گاهشمار',
      gahshomarDesc: 'رویدادها و مناسبت‌های مهم بر اساس ماه‌های شمسی',
      gahnameh: 'گاهنامه',
      gahnamehDesc: 'مقالات و محتوای تاریخی-فرهنگی',
      daneshnameh: 'دانشنامه',
      daneshnamehDesc: 'مقالات علمی و آموزشی',
      jahannameh: 'جهان‌نامه',
      jahannamehDesc: 'آشنایی با فرهنگ و تاریخ کشورهای جهان',
      shahrnameh: 'شهرنامه',
      shahrnamehDesc: 'آشنایی با فرهنگ و تاریخ استان‌های ایران',
      currentEvents: 'رویدادهای این ماه',
      viewAll: 'مشاهده همه',
      latestArticles: 'آخرین مقالات',
    },
    en: {
      welcome: 'Welcome to Cultural Calendar',
      intro: 'A historical and cultural reference for events, occasions, and learning about the culture of Iran and the world',
      sections: 'Website Sections',
      gahshomar: 'Calendar',
      gahshomarDesc: 'Important events and occasions based on Persian solar months',
      gahnameh: 'Chronicles',
      gahnamehDesc: 'Historical and cultural articles',
      daneshnameh: 'Encyclopedia',
      daneshnamehDesc: 'Scientific and educational articles',
      jahannameh: 'World Guide',
      jahannamehDesc: 'Learn about the culture and history of countries around the world',
      shahrnameh: 'City Guide',
      shahrnamehDesc: 'Learn about the culture and history of Iranian provinces',
      currentEvents: 'Events This Month',
      viewAll: 'View All',
      latestArticles: 'Latest Articles',
    },
  };

  // Fix for the locale indexing issue
  const validLocale = (i18nConfig.locales.includes(locale) ? locale : i18nConfig.defaultLocale) as keyof typeof translations;
  const t = translations[validLocale];
  
  return (
    <div className="rtl">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.welcome}</h1>
          <p className="text-xl max-w-3xl mx-auto">{t.intro}</p>
        </div>
      </section>
      
      {/* Sections Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.sections}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Calendar size={24} className="text-blue-600 ml-2" />
                <h3 className="text-xl font-bold">{t.gahshomar}</h3>
              </div>
              <p className="text-gray-600 mb-4">{t.gahshomarDesc}</p>
              <Link href={`/${locale}/gahshomar`} className="text-blue-600 hover:text-blue-800 font-medium">
                {t.viewAll} &larr;
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Book size={24} className="text-green-600 ml-2" />
                <h3 className="text-xl font-bold">{t.gahnameh}</h3>
              </div>
              <p className="text-gray-600 mb-4">{t.gahnamehDesc}</p>
              <Link href={`/${locale}/gahnameh`} className="text-green-600 hover:text-green-800 font-medium">
                {t.viewAll} &larr;
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Book size={24} className="text-yellow-600 ml-2" />
                <h3 className="text-xl font-bold">{t.daneshnameh}</h3>
              </div>
              <p className="text-gray-600 mb-4">{t.daneshnamehDesc}</p>
              <Link href={`/${locale}/daneshnameh`} className="text-yellow-600 hover:text-yellow-800 font-medium">
                {t.viewAll} &larr;
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Globe size={24} className="text-purple-600 ml-2" />
                <h3 className="text-xl font-bold">{t.jahannameh}</h3>
              </div>
              <p className="text-gray-600 mb-4">{t.jahannamehDesc}</p>
              <Link href={`/${locale}/jahannameh`} className="text-purple-600 hover:text-purple-800 font-medium">
                {t.viewAll} &larr;
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <MapPin size={24} className="text-red-600 ml-2" />
                <h3 className="text-xl font-bold">{t.shahrnameh}</h3>
              </div>
              <p className="text-gray-600 mb-4">{t.shahrnamehDesc}</p>
              <Link href={`/${locale}/shahrnameh`} className="text-red-600 hover:text-red-800 font-medium">
                {t.viewAll} &larr;
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Current Month Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">{t.currentEvents} - {currentMonthName}</h2>
            <Link href={`/${locale}/gahshomar`} className="text-blue-600 hover:text-blue-800 font-medium">
              {t.viewAll} &larr;
            </Link>
          </div>
          
          // Update for home page - Replace the links in the Current Events and Latest Articles sections

// Current Events Section - Fixed Links
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  {gahshomarPosts.map((post: PostMeta) => (
    // Note: Locale is already available in the params passed to the page component
    <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform hover:scale-[1.02]">
        <div className="relative h-48">
          <Image 
            src={post.coverImage} 
            alt={post.title}
            fill
            className="object-cover"
          />
          {post.eventDate && (
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm rounded-bl-lg">
              {post.eventDate}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold mb-2 line-clamp-2">{post.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
        </div>
      </article>
    </Link>
  ))}
</div>

// Latest Articles Section - Fixed Links
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  {gahnamehPosts.map((post: PostMeta) => (
    // This approach works because the locale is already available in the params in server components
    <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform hover:scale-[1.02]">
        <div className="relative h-48">
          <Image 
            src={post.coverImage} 
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold mb-2 line-clamp-2">{post.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
        </div>
      </article>
    </Link>
  ))}
</div>
        </div>
      </section>
    </div>
  );
}