import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇬🇭</span>
              <span className="font-display text-lg font-bold">
                Develop<span className="text-brand-red">Ghana</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Empowering Ghana through accessible technology and digital knowledge.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Product</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/blog" className="hover:text-brand-red">Blog</Link></li>
              <li><Link href="/shop" className="hover:text-brand-red">Shop</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/about" className="hover:text-brand-red">About</Link></li>
              <li><Link href="/contact" className="hover:text-brand-red">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/privacy" className="hover:text-brand-red">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-brand-red">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 dark:border-gray-800">
          © {new Date().getFullYear()} Develop Ghana Lab. Built for Ghana 🇬🇭
        </div>
      </div>
    </footer>
  );
}
