import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { formatGHS } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Digital software and tools for Ghanaian creators and businesses',
};

export default async function ShopPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from('products')
    .select('id, title, slug, short_description, price, currency, image_url, category')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold md:text-5xl">Software Store</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Digital products priced in GHS with local payment support
        </p>
      </div>

      {!products || products.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 py-20 text-center dark:border-gray-700">
          <p className="text-gray-500">No products available yet. Check back soon.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="group card transition hover:shadow-md"
            >
              {product.image_url ? (
                <div className="mb-4 aspect-video overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="mb-4 flex aspect-video items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
                  <span className="text-4xl">📦</span>
                </div>
              )}

              {product.category && (
                <span className="text-xs font-medium uppercase tracking-wide text-brand-red">
                  {product.category}
                </span>
              )}

              <h2 className="mt-2 font-display text-xl font-semibold group-hover:text-brand-red">
                {product.title}
              </h2>

              {product.short_description && (
                <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {product.short_description}
                </p>
              )}

              <p className="mt-4 text-lg font-bold text-brand-red">
                {formatGHS(product.price)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
