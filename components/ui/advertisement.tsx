// components/ui/advertisement.tsx
import Link from 'next/link';
import Image from 'next/image';

interface AdvertisementProps {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

export default function Advertisement({
  title,
  description,
  image,
  buttonText,
  buttonLink
}: AdvertisementProps) {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md my-8 rtl">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative h-48 md:h-auto">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <Link 
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}