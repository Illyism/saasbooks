import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { GrossVolumeManager } from './gross-volume-manager';

export const metadata: Metadata = {
  title: 'Stripe Dashboard - SaaSBooks',
  description: 'View your financial data from Stripe',
};

export default async function StripeDashboardPage() {
  const { user: sessionUser } = await getCurrentSession();

  if (!sessionUser) {
    redirect('/auth/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    include: {
      stripeAccounts: {
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!user) {
    redirect('/auth/login');
  }

  // Check if user has any Stripe accounts
  if (user.stripeAccounts.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="mb-6 text-2xl font-bold">Stripe Dashboard</h1>

        <div className="rounded-lg bg-white p-8 text-center shadow">
          <h2 className="mb-4 text-xl font-semibold">
            No Stripe Accounts Connected
          </h2>
          <p className="mb-6">
            Connect your Stripe account to view your financial data and metrics.
          </p>
          <Link
            href="/settings/stripe"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Connect Stripe Account
          </Link>
        </div>
      </div>
    );
  }

  const accounts = user.stripeAccounts;

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Stripe Dashboard</h1>

      <div className="mb-8">
        <GrossVolumeManager
          userId={user.id.toString()}
          accounts={accounts.map(account => ({
            id: account.id,
            name: account.name,
          }))}
        />
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">Account Management</h2>
        <p className="mb-4">
          You have {accounts.length} Stripe{' '}
          {accounts.length === 1 ? 'account' : 'accounts'} connected.
        </p>
        <Link
          href="/settings/stripe"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Manage Stripe Accounts
        </Link>
      </div>
    </div>
  );
}
