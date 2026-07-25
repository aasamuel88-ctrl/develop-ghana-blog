import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Develop Ghana Lab',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold">About Develop Ghana Lab</h1>
      <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
        Our mission is to empower Ghana through accessible technology, software, and digital knowledge.
      </p>
    </div>
  );
}
