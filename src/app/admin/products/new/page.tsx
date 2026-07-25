'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { slugify } from '@/lib/utils';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priceGhs, setPriceGhs] = useState('');
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

    const priceInPesewas = Math.round(parseFloat(priceGhs || '0') * 100);

    const { error: insertError } = await supabase.from('products').insert({
      title,
      slug: slugify(title),
      short_description: shortDescription || null,
      description: description || null,
      category: category || null,
      price: priceInPesewas,
      currency: 'GHS',
      status,
      created_by: user.id,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push('/admin/products');
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Add Product</h1>
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
            placeholder="Ghana POS System"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Short Description</label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="input"
            placeholder="One-line summary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Full Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input min-h-[160px]"
            placeholder="Detailed product description..."
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
              placeholder="299.00"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
              placeholder="Business, Education..."
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
            {loading ? 'Saving...' : 'Save Product'}
          </Button>
          <Link href="/admin/products" className="btn-outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
