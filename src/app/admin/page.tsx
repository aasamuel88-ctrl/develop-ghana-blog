import { requireAdmin } from '@/lib/auth';
import { AdminHeader } from '@/components/admin/header';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Users, Package, FileText, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default async function AdminPage() {
  const { supabase } = await requireAdmin();

  const [
    { count: userCount },
    { count: productCount },
    { count: postCount },
    { count: orderCount },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
  ]);

  return (
    <div>
      <AdminHeader
        title="Admin Overview"
        description="Manage users, products, content, and payments."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Users" value={userCount ?? 0} icon={Users} />
        <StatsCard title="Products" value={productCount ?? 0} icon={Package} />
        <StatsCard title="Blog Posts" value={postCount ?? 0} icon={FileText} />
        <StatsCard title="Orders" value={orderCount ?? 0} icon={CreditCard} />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="card">
          <h3 className="font-semibold">Quick Links</h3>
          <div className="mt-4 space-y-2 text-sm">
            <Link href="/admin/products" className="block text-brand-red hover:underline">
              Manage Products →
            </Link>
            <Link href="/admin/blog" className="block text-brand-red hover:underline">
              Manage Blog Posts →
            </Link>
            <Link href="/admin/users" className="block text-brand-red hover:underline">
              View Users →
            </Link>
            <Link href="/admin/payments" className="block text-brand-red hover:underline">
              Payment Overview →
            </Link>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold">System Status</h3>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Database schema is active. Blog CMS and Marketplace modules are next.
          </p>
        </div>
      </div>
    </div>
  );
}
