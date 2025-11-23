import type { Metadata } from 'next';
import { Inter_Tight, Cairo, Aref_Ruqaa } from 'next/font/google';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';

const interTight = Inter_Tight({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
const cairo = Cairo({
  weight: ['400', '500', '600', '700'],
  subsets: ['arabic', 'latin'],
  display: 'swap',
});
const arefRuqaa = Aref_Ruqaa({
  weight: ['400', '700'],
  subsets: ['arabic', 'latin'],
  display: 'swap',
});

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
      <body className={interTight.className}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
