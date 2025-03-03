import { getAuthenticatedUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getAuthenticatedUser();

  // If user is already logged in, redirect to dashboard
  if (user) {
    redirect('/app/dashboard');
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Financial clarity for</span>
            <span className="block text-blue-600">SaaS businesses</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            SaaSBooks turns your Stripe and Mercury data into actionable
            financial insights without the accounting headache.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/auth/login"
              className="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white shadow-md transition duration-300 hover:bg-blue-700"
            >
              Sign In
            </a>
            <a
              href="/app/dashboard"
              className="rounded-lg bg-gray-100 px-6 py-3 text-center font-semibold text-gray-800 shadow-md transition duration-300 hover:bg-gray-200"
            >
              Go to Dashboard
            </a>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What SaaSBooks does
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="mb-2 text-xl font-bold">
                Auto-categorize transactions
              </h3>
              <p className="text-gray-600">
                Automatically categorize Stripe and Mercury transactions for
                better financial clarity.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="mb-2 text-xl font-bold">Calculate SaaS metrics</h3>
              <p className="text-gray-600">
                Track MRR, customer acquisition costs, and burn rate to
                understand your business.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="mb-2 text-xl font-bold">
                Generate visualizations
              </h3>
              <p className="text-gray-600">
                See your business health at a glance with beautiful charts and
                reports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
