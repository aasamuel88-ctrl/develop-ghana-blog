import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Digital software and tools for Ghanaian creators',
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold">Software Store</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Digital products priced in GHS. Marketplace features coming in the next phase.
      </p>
    </div>
  );
}
