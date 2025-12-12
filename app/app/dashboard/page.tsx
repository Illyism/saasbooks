import VerifyDriveButton from '@/app/settings/drive/verify-button';
import { getAuthenticatedUser } from '@/lib/auth';
import { DriveService } from '@/lib/drive';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getAuthenticatedUser();

  // If not authenticated, redirect to login
  if (!user) {
    console.log('Not authenticated, redirecting to login');
    redirect('/auth/login');
  }

  // Ensure the user has a README file in their SaaSBooks folder
  if (user.id) {
    await DriveService.ensureUserReadmeExists(user.id);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold">
          Welcome, {user.name || 'User'}!
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Financial Summary</h2>
            <p className="mb-4 text-gray-600">
              Get insights into your financial metrics and start tracking your
              SaaS business performance.
            </p>
            <a
              href="/app/metrics"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              View metrics →
            </a>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Import Data</h2>
            <p className="mb-4 text-gray-600">
              Connect your Stripe and Mercury accounts to import your financial
              data.
            </p>
            <a
              href="/app/import"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              Import now →
            </a>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Transactions</h2>
            <p className="mb-4 text-gray-600">
              View and categorize your transactions to get better financial
              insights.
            </p>
            <a
              href="/app/transactions"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              View transactions →
            </a>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Google Drive</h2>
            <p className="mb-4 text-gray-600">
              Verify your Google Drive folder and ensure your files are being
              saved correctly.
            </p>
            <div className="mt-4">
              <VerifyDriveButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
