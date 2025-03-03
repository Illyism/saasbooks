import { getAuthenticatedUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getAuthenticatedUser();

  // If not authenticated, redirect to login
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.name || 'User'}!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Financial Summary</h2>
            <p className="text-gray-600 mb-4">
              Get insights into your financial metrics and start tracking your SaaS business performance.
            </p>
            <a href="/metrics" className="text-blue-600 hover:text-blue-800 font-medium">
              View metrics →
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Import Data</h2>
            <p className="text-gray-600 mb-4">
              Connect your Stripe and Mercury accounts to import your financial data.
            </p>
            <a href="/import" className="text-blue-600 hover:text-blue-800 font-medium">
              Import now →
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Transactions</h2>
            <p className="text-gray-600 mb-4">
              View and categorize your transactions to get better financial insights.
            </p>
            <a href="/transactions" className="text-blue-600 hover:text-blue-800 font-medium">
              View transactions →
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p className="text-gray-600 mb-4">
              Manage your account, customize categories, and set up integrations.
            </p>
            <a href="/settings" className="text-blue-600 hover:text-blue-800 font-medium">
              Go to settings →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 