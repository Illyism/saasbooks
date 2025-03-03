import Link from 'next/link';
import { getAuthenticatedUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getAuthenticatedUser();
  
  // If user is already logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }
  
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Financial clarity for</span>
            <span className="block text-blue-600">SaaS businesses</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            SaaSBooks turns your Stripe and Mercury data into actionable financial insights without the accounting headache.
          </p>
          <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/register"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:py-4 md:px-10 md:text-lg"
              >
                Get started
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                href="/login"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-blue-600 hover:bg-gray-50 md:py-4 md:px-10 md:text-lg"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-24">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What SaaSBooks does
          </h2>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Auto-categorize transactions</h3>
              <p className="text-gray-600">
                Automatically categorize Stripe and Mercury transactions for better financial clarity.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Calculate SaaS metrics</h3>
              <p className="text-gray-600">
                Track MRR, customer acquisition costs, and burn rate to understand your business.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Generate visualizations</h3>
              <p className="text-gray-600">
                See your business health at a glance with beautiful charts and reports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
