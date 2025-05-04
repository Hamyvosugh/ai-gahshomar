// app/[locale]/blog/[slug]/layout.tsx
export default function BlogPostLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div>
        {children}
      </div>
    );
  }