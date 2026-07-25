import { requireAdmin } from '@/lib/auth';
import { AdminHeader } from '@/components/admin/header';
import Link from 'next/link';

export default async function AdminBlogPage() {
  await requireAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <AdminHeader
          title="Blog Posts"
          description="Create and manage blog content."
        />
        <Link href="/admin/blog/new" className="btn-primary">
          New Post
        </Link>
      </div>

      <div className="card mt-6 py-12 text-center text-gray-500">
        Blog CMS UI will be completed in the next phase.
        <br />
        Database table and RLS policies are already in place.
      </div>
    </div>
  );
}
