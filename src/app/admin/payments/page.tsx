import { requireAdmin } from '@/lib/auth';
import { AdminHeader } from '@/components/admin/header';

export default async function AdminPaymentsPage() {
  await requireAdmin();

  return (
    <div>
      <AdminHeader
        title="Payments"
        description="Order and payment overview (Paystack / Flutterwave ready)."
      />

      <div className="card mt-6 py-12 text-center text-gray-500">
        Payment management will be available after the payment integration phase.
        <br />
        Orders table is ready.
      </div>
    </div>
  );
}
