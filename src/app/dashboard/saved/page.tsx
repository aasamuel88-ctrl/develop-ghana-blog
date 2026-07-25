import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/header';
import { EmptyState } from '@/components/dashboard/empty-state';
import { Bookmark } from 'lucide-react';

export default async function SavedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <div>
      <DashboardHeader
        title="Saved Articles"
        description="Articles you have bookmarked for later."
      />
      <EmptyState
        icon={Bookmark}
        title="No saved articles"
        description="Bookmark articles from the blog to read them later."
        actionLabel="Browse Blog"
        actionHref="/blog"
      />
    </div>
  );
}
