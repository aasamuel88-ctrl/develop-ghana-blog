import type { Metadata } from 'next';
import { Poppins, Open_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-opensans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Develop Ghana Lab',
    template: '%s | Develop Ghana Lab',
  },
  description: 'Empowering Ghana through technology, software, and digital knowledge.',
  keywords: ['Ghana', 'tech', 'software', 'blog', 'marketplace', 'SaaS'],
  authors: [{ name: 'Develop Ghana Lab' }],
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    siteName: 'Develop Ghana Lab',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${openSans.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
