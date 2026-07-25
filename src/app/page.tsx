import Link from 'next/link';
import { ArrowRight, Code2, BookOpen, ShoppingBag, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-gray-900 to-brand-black opacity-90" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 text-center">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            Empowering Ghana Through<br />
            <span className="text-brand-gold">Tech & Innovation</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Premium software, practical tutorials, and digital tools built for Ghanaian creators, students, and businesses.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-red px-8 py-4 text-base font-semibold text-white transition hover:bg-red-700"
            >
              Explore Blog
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-brand-gold px-8 py-4 text-base font-semibold text-white transition hover:bg-brand-gold hover:text-brand-black"
            >
              Shop Software
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpen, title: 'Tech Blog', desc: 'Practical tutorials and insights for Ghanaian developers.' },
            { icon: ShoppingBag, title: 'Software Store', desc: 'Digital products priced in GHS with local payment support.' },
            { icon: Code2, title: 'Developer Tools', desc: 'Templates, kits, and utilities built for real use cases.' },
            { icon: Zap, title: 'Fast Delivery', desc: 'Instant digital downloads after successful payment.' },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
              <item.icon className="h-10 w-10 text-brand-red" />
              <h3 className="mt-4 font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 dark:bg-gray-950 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold">Ready to build with us?</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Join the growing community of Ghanaian builders using Develop Ghana Lab.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-brand-red px-8 py-4 font-semibold text-white transition hover:bg-red-700"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
