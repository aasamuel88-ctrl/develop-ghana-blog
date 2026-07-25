'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError('You must be logged in');
      setLoading(false);
      return;
    }

    const slug = slugify(title);

    const { error: insertError } = await supabase.from('blog_posts').insert({
      title,
      slug,
      excerpt,
      content,
      category: category || null,
      status,
      author_id: user.id,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push('/admin/blog');
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">New Blog Post</h1>
        <Link href="/admin/blog" className="text-sm text-gray-600 hover:text-brand-red">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            placeholder="How to build a SaaS in Ghana"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="input min-h-[80px]"
            placeholder="Short summary for the blog listing..."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Content</label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input min-h-[240px] font-mono text-sm"
            placeholder="Write your article content here..."
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
              placeholder="Tutorials, Innovation, Tech Ghana..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              className="input"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={loading} size="lg">
            {loading ? 'Saving...' : 'Save Post'}
          </Button>
          <Link href="/admin/blog" className="btn-outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
