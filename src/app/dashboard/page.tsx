import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Welcome back, {user.user_metadata?.full_name || user.email}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="card">
          <h3 className="font-semibold">My Purchases</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            View and download your digital products.
          </p>
          <Link href="/dashboard/purchases" className="mt-4 inline-block text-sm font-medium text-brand-red hover:underline">
            View purchases →
          </Link>
        </div>

        <div className="card">
          <h3 className="font-semibold">Downloads</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Access your secure download links.
          </p>
          <Link href="/dashboard/downloads" className="mt-4 inline-block text-sm font-medium text-brand-red hover:underline">
            Go to downloads →
          </Link>
        </div>

        <div className="card">
          <h3 className="font-semibold">Profile</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Update your account settings.
          </p>
          <Link href="/dashboard/settings" className="mt-4 inline-block text-sm font-medium text-brand-red hover:underline">
            Edit profile →
          </Link>
        </div>
      </div>
    </div>
  );
}
