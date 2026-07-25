import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/header';
import { EmptyState } from '@/components/dashboard/empty-state';
import { ShoppingBag } from 'lucide-react';

export default async function PurchasesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <div>
      <DashboardHeader
        title="My Purchases"
        description="Digital products you have purchased."
      />
      <EmptyState
        icon={ShoppingBag}
        title="No purchases yet"
        description="When you buy software from the store, it will appear here."
        actionLabel="Browse Store"
        actionHref="/shop"
      />
    </div>
  );
}
