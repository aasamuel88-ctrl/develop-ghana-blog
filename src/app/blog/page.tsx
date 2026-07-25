import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tech insights, tutorials, and innovation from Ghana',
};

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, category, created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold md:text-5xl">Blog</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Practical tutorials and insights for Ghanaian builders
        </p>
      </div>

      {!posts || posts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 py-20 text-center dark:border-gray-700">
          <p className="text-gray-500">No published articles yet. Check back soon.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group card transition hover:shadow-md"
            >
              {post.featured_image ? (
                <div className="mb-4 aspect-video overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="mb-4 flex aspect-video items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
                  <span className="text-4xl">📝</span>
                </div>
              )}

              {post.category && (
                <span className="text-xs font-medium uppercase tracking-wide text-brand-red">
                  {post.category}
                </span>
              )}

              <h2 className="mt-2 font-display text-xl font-semibold group-hover:text-brand-red">
                {post.title}
              </h2>

              {post.excerpt && (
                <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                  {post.excerpt}
                </p>
              )}

              <p className="mt-4 text-xs text-gray-500">
                {new Date(post.created_at).toLocaleDateString('en-GH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
