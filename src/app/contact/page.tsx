import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Develop Ghana Lab',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold">Contact Us</h1>
      <p className="mt-6 text-gray-600 dark:text-gray-400">
        Have questions? Reach out via WhatsApp or email. Full contact form coming soon.
      </p>
      <a
        href="https://wa.me/233240801950"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-8 inline-flex"
      >
        Chat on WhatsApp
      </a>
    </div>
  );
}
