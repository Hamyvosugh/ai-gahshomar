
// components/blog/share-buttons.tsx
import { Twitter, Facebook, Linkedin, Link2 } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  };
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('لینک در کلیپ بورد کپی شد');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="my-8 rtl">
      <h3 className="font-bold mb-3">اشتراک گذاری:</h3>
      <div className="flex space-x-4 space-x-reverse">
        <a 
          href={shareLinks.twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-full transition-colors"
        >
          <Twitter size={20} />
        </a>
        <a 
          href={shareLinks.facebook} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-full transition-colors"
        >
          <Facebook size={20} />
        </a>
        <a 
          href={shareLinks.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-full transition-colors"
        >
          <Linkedin size={20} />
        </a>
        <button 
          onClick={copyToClipboard}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-full transition-colors"
        >
          <Link2 size={20} />
        </button>
      </div>
    </div>
  );
}
