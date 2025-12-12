import { getCurrentSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const { user } = await getCurrentSession();
  if (user) {
    console.log('User is authenticated, redirecting to dashboard');
    redirect('/app/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to SaaSBooks
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Connect your Google account to get started
          </p>
        </div>
        <div>
          <a
            href="/auth/google"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign in with Google
          </a>
        </div>
      </div>
    </div>
  );
}
