import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/header';
import { StatsCard } from '@/components/dashboard/stats-card';
import { ShoppingBag, Download, Bookmark, User } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div>
      <DashboardHeader
        title={`Welcome, ${profile?.full_name || user.email?.split('@')[0] || 'User'}`}
        description="Manage your purchases, downloads, and account settings."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Purchases" value={0} icon={ShoppingBag} description="Products owned" />
        <StatsCard title="Downloads" value={0} icon={Download} description="Files available" />
        <StatsCard title="Saved" value={0} icon={Bookmark} description="Articles bookmarked" />
        <StatsCard
          title="Role"
          value={profile?.role === 'admin' ? 'Admin' : 'User'}
          icon={User}
          description="Account type"
        />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="card">
          <h3 className="font-semibold">Quick Actions</h3>
          <div className="mt-4 space-y-2">
            <Link href="/shop" className="block text-sm text-brand-red hover:underline">
              Browse Software Store →
            </Link>
            <Link href="/blog" className="block text-sm text-brand-red hover:underline">
              Read Latest Articles →
            </Link>
            <Link href="/dashboard/settings" className="block text-sm text-brand-red hover:underline">
              Update Profile →
            </Link>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold">Account</h3>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Role</dt>
              <dd className="capitalize">{profile?.role || 'user'}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
