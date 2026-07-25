import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/header';

export default async function SettingsPage() {
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
        title="Account Settings"
        description="Manage your profile information."
      />

      <div className="card max-w-xl">
        <h3 className="font-semibold">Profile</h3>
        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="text-gray-500">Full Name</dt>
            <dd className="mt-1 font-medium">{profile?.full_name || '—'}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Email</dt>
            <dd className="mt-1 font-medium">{user.email}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Role</dt>
            <dd className="mt-1 font-medium capitalize">{profile?.role || 'user'}</dd>
          </div>
        </dl>
        <p className="mt-6 text-xs text-gray-500">
          Profile editing form will be available in a future update.
        </p>
      </div>
    </div>
  );
}
