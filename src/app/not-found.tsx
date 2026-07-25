import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-6xl font-bold text-brand-red">404</h1>
      <h2 className="mt-4 font-display text-2xl font-semibold">Page not found</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  );
}
