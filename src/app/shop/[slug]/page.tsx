import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatGHS } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from('products')
    .select('title, short_description')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.title,
    description: product.short_description || undefined,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-brand-red dark:text-gray-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          {product.image_url ? (
            <div className="overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex aspect-square items-center justify-center rounded-3xl bg-gray-100 dark:bg-gray-800">
              <span className="text-6xl">📦</span>
            </div>
          )}
        </div>

        <div>
          {product.category && (
            <p className="text-sm font-medium uppercase tracking-wide text-brand-red">
              {product.category}
            </p>
          )}

          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">
            {product.title}
          </h1>

          <p className="mt-4 text-3xl font-bold text-brand-red">
            {formatGHS(product.price)}
          </p>

          {product.short_description && (
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              {product.short_description}
            </p>
          )}

          {product.description && (
            <div className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
              {product.description.split('\n').map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          <div className="mt-10">
            <button
              disabled
              className="btn-primary w-full opacity-70 sm:w-auto"
              title="Payment integration coming in the next phase"
            >
              Buy Now — {formatGHS(product.price)}
            </button>
            <p className="mt-3 text-xs text-gray-500">
              Paystack & Flutterwave integration coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
