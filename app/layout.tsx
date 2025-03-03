import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '../components/nav/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SaaSBooks - Financial Insights for SaaS',
  description:
    'Turn your Stripe and Mercury data into actionable financial insights without the accounting headache.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
