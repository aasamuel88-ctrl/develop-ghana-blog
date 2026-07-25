import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt || undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-brand-red dark:text-gray-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      {post.category && (
        <p className="mt-8 text-sm font-medium uppercase tracking-wide text-brand-red">
          {post.category}
        </p>
      )}

      <h1 className="mt-2 font-display text-4xl font-bold leading-tight md:text-5xl">
        {post.title}
      </h1>

      <p className="mt-4 text-sm text-gray-500">
        {new Date(post.created_at).toLocaleDateString('en-GH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      {post.featured_image && (
        <div className="mt-10 overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg mt-10 max-w-none dark:prose-invert">
        {post.content?.split('\n').map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
