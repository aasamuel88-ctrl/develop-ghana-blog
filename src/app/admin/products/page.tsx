import { requireAdmin } from '@/lib/auth';
import { AdminHeader } from '@/components/admin/header';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { formatGHS } from '@/lib/utils';

export default async function AdminProductsPage() {
  const { supabase } = await requireAdmin();

  const { data: products } = await supabase
    .from('products')
    .select('id, title, slug, price, status, category, created_at')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AdminHeader
          title="Products"
          description="Manage digital products in the store."
        />
        <Link href="/admin/products/new" className="btn-primary inline-flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      <div className="card mt-6 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(products || []).map((product) => (
              <tr key={product.id} className="border-b border-gray-100 dark:border-gray-800">
                <td className="px-4 py-3 font-medium">{product.title}</td>
                <td className="px-4 py-3">{formatGHS(product.price)}</td>
                <td className="px-4 py-3">{product.category || '—'}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.status === 'published'
                        ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-brand-red hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {(!products || products.length === 0) && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                  No products yet. Add your first digital product.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
