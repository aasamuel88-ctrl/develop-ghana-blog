import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tech insights and tutorials from Ghana',
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold">Blog</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Latest insights from Ghana&apos;s tech scene. Content management system coming in the next phase.
      </p>
    </div>
  );
}
