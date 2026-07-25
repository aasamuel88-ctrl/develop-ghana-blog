'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        setError('Post not found');
        setFetching(false);
        return;
      }

      setTitle(data.title);
      setExcerpt(data.excerpt || '');
      setContent(data.content || '');
      setCategory(data.category || '');
      setStatus(data.status);
      setFetching(false);
    };
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({
        title,
        excerpt,
        content,
        category: category || null,
        status,
      })
      .eq('id', id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    router.push('/admin/blog');
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm('Delete this post permanently?')) return;

    const supabase = createClient();
    await supabase.from('blog_posts').delete().eq('id', id);
    router.push('/admin/blog');
    router.refresh();
  };

  if (fetching) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-red border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Edit Post</h1>
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
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="input min-h-[80px]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Content</label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input min-h-[240px] font-mono text-sm"
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
            {loading ? 'Saving...' : 'Update Post'}
          </Button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-2xl border border-red-300 px-6 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
