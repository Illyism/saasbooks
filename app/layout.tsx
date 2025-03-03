import NavBar from '@/components/nav/NavBar';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'SaaSBooks - Financial clarity for SaaS businesses',
  description:
    'SaaSBooks turns your Stripe and Mercury data into actionable financial insights.',
};

// Load Poppins font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="bg-background min-h-screen font-sans antialiased">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
