import { getAuthenticatedUser } from '@/lib/auth';
import Link from 'next/link';
import LogoutButton from '../auth/LogoutButton';

export default async function NavBar() {
  const user = await getAuthenticatedUser();

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link
                href={user ? '/app/dashboard' : '/'}
                className="text-xl font-bold text-blue-600"
              >
                SaaSBooks
              </Link>
            </div>
            {user && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/app/dashboard"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/stripe"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Stripe
                </Link>
                <Link
                  href="/app/transactions"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Transactions
                </Link>
                <Link
                  href="/app/metrics"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Metrics
                </Link>
                <Link
                  href="/settings/stripe"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  Settings
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-700">
                  {user.name || user.email}
                </div>
                <LogoutButton />
              </div>
            ) : (
              <div className="flex items-center">
                <Link
                  href="/auth/login"
                  className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Sign in with Google
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
