'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priceGhs, setPriceGhs] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        setError('Product not found');
        setFetching(false);
        return;
      }

      setTitle(data.title);
      setShortDescription(data.short_description || '');
      setDescription(data.description || '');
      setCategory(data.category || '');
      setPriceGhs((data.price / 100).toFixed(2));
      setStatus(data.status);
      setFetching(false);
    };
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const priceInPesewas = Math.round(parseFloat(priceGhs || '0') * 100);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from('products')
      .update({
        title,
        short_description: shortDescription || null,
        description: description || null,
        category: category || null,
        price: priceInPesewas,
        status,
      })
      .eq('id', id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    router.push('/admin/products');
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm('Delete this product permanently?')) return;

    const supabase = createClient();
    await supabase.from('products').delete().eq('id', id);
    router.push('/admin/products');
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
        <h1 className="font-display text-2xl font-bold">Edit Product</h1>
        <Link href="/admin/products" className="text-sm text-gray-600 hover:text-brand-red">
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
          <label className="mb-2 block text-sm font-medium">Short Description</label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Full Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input min-h-[160px]"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium">Price (GHS)</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={priceGhs}
              onChange={(e) => setPriceGhs(e.target.value)}
              className="input"
            />
          </div>

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
            {loading ? 'Saving...' : 'Update Product'}
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
