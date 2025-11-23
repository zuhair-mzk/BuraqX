import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Buraq X - Your Muslim Community Concierge',
  description: 'Find trusted Muslim providers, freelancers, masajid, and community services. From STEM tutoring to wedding services, connect with vetted professionals in your area.',
  keywords: ['muslim', 'halal', 'services', 'community', 'toronto', 'tutoring', 'freelancer', 'masjid', 'wedding'],
  authors: [{ name: 'Buraq X Team' }],
  openGraph: {
    title: 'Buraq X - Your Muslim Community Concierge',
    description: 'Find trusted Muslim providers, freelancers, masajid, and community services.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
