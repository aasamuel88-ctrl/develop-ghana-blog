import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/header';
import { EmptyState } from '@/components/dashboard/empty-state';
import { Download } from 'lucide-react';

export default async function DownloadsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <div>
      <DashboardHeader
        title="Downloads"
        description="Secure download links for your purchased products."
      />
      <EmptyState
        icon={Download}
        title="No downloads available"
        description="After a successful payment, download links will appear here."
        actionLabel="Browse Store"
        actionHref="/shop"
      />
    </div>
  );
}
