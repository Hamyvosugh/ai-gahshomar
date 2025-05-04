import ReactMarkdown from 'react-markdown';

type Post = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default async function PostsPage() {
  const res = await fetch('http://localhost:1337/api/posts');
  const json = await res.json();
  const posts: Post[] = json.data;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
            <div className="mt-2 prose max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}