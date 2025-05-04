// components/ui/youtube-embed.tsx
interface YoutubeEmbedProps {
  id: string;
  title: string;
}

export default function YoutubeEmbed({ id, title }: YoutubeEmbedProps) {
  return (
    <div className="aspect-video my-8 rounded-lg overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}