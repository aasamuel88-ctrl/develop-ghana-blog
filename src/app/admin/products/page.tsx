import { requireAdmin } from '@/lib/auth';
import { AdminHeader } from '@/components/admin/header';
import Link from 'next/link';

export default async function AdminProductsPage() {
  await requireAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <AdminHeader
          title="Products"
          description="Manage digital products in the store."
        />
        <Link href="/admin/products/new" className="btn-primary">
          Add Product
        </Link>
      </div>

      <div className="card mt-6 py-12 text-center text-gray-500">
        Product management UI will be completed in the Marketplace phase.
        <br />
        Database table and RLS policies are already in place.
      </div>
    </div>
  );
}
