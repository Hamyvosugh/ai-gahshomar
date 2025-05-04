// app/[locale]/blog/layout.tsx
export default function BlogLayout({
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