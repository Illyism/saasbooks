import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCurrentSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import {
  DeleteStripeAccountButton,
  StripeAccountForm,
} from '@/lib/stripe/components';
import { StripeAccount } from '@prisma/client';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Connect Stripe - SaaSBooks',
  description: 'Connect your Stripe account to SaaSBooks',
};

export default async function StripeSettingsPage() {
  const { user: sessionUser } = await getCurrentSession();
  if (!sessionUser) redirect('/auth/login');

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    include: { stripeAccounts: { orderBy: { createdAt: 'desc' } } },
  });
  if (!user) redirect('/auth/login');

  const hasStripeAccounts = user.stripeAccounts.length > 0;

  return (
    <div className="container mx-auto max-w-4xl py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
          {hasStripeAccounts
            ? 'Manage Stripe Accounts'
            : 'Connect Stripe to SaaSBooks'}
        </h1>
        <p className="mx-auto max-w-2xl text-gray-500">
          {hasStripeAccounts
            ? 'View and manage your connected Stripe accounts or add a new one.'
            : 'Connect your Stripe account to see your financial data in SaaSBooks.'}
        </p>
      </div>

      {hasStripeAccounts ? (
        <>
          {/* Existing Accounts */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Stripe Accounts
              </h2>
              <Link href="/dashboard/stripe">
                <Button variant="outline" size="sm">
                  View Dashboard
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {user.stripeAccounts.map((account: StripeAccount) => (
                <div
                  key={account.id}
                  className="overflow-hidden rounded-lg border bg-white shadow"
                >
                  <div className="flex items-center border-b p-4">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-blue-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-900">
                          {account.name}
                        </h3>
                        <Badge className="ml-2" variant="outline">
                          Connected
                        </Badge>
                      </div>
                      {account.businessName && (
                        <p className="text-sm text-gray-500">
                          {account.businessName}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      Connected{' '}
                      {new Date(account.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 p-3">
                    <span className="text-sm text-gray-500">
                      Financial metrics and accounting data
                    </span>
                    <div className="flex items-center space-x-2">
                      <DeleteStripeAccountButton
                        accountId={account.id}
                        userId={user.id.toString()}
                        accountName={account.name}
                      />
                      <Link href="/dashboard/stripe">
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          View Data
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Account */}
          <div className="rounded-lg border bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Add Another Stripe Account
            </h2>
            <p className="mb-6 text-gray-500">
              Connect another Stripe account with the steps below:
            </p>
            <ConnectStripeFlow userId={user.id.toString()} />
          </div>
        </>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white shadow">
          <div className="p-6">
            <div className="mx-auto max-w-2xl">
              <ConnectStripeFlow
                userId={user.id.toString()}
                isFirstAccount={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ConnectStripeFlow({
  userId,
  isFirstAccount = false,
}: {
  userId: string;
  isFirstAccount?: boolean;
}) {
  return (
    <div className="space-y-8">
      {/* Step 1 */}
      <div className="relative pb-10">
        <div
          className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
          aria-hidden="true"
        ></div>
        <div className="relative flex items-start space-x-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
            1
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-medium text-gray-900">
              Generate API Key
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Create a secure read-only key for your accounting data.
            </p>
            <div className="mt-3">
              <a
                href="https://dashboard.stripe.com/apikeys/create?name=SaaSBooks&permissions[]=rak_balance_read&permissions[]=rak_balance_transaction_read&permissions[]=rak_balance_transaction_source_read&permissions[]=rak_charge_read&permissions[]=rak_refund_read&permissions[]=rak_payout_read&permissions[]=rak_payment_intent_read&permissions[]=rak_invoice_read&permissions[]=rak_tax_rate_read&permissions[]=rak_tax_id_read&permissions[]=rak_credit_note_read&permissions[]=rak_customer_read&permissions[]=rak_subscription_read&permissions[]=rak_dispute_read&permissions[]=rak_connected_account_read"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Generate API Key
              </a>
            </div>
            <div className="mt-3 rounded-md bg-blue-50 p-3 text-sm text-blue-700">
              <p className="font-medium">
                Access to revenue, subscriptions, fees, and payment data
              </p>
              <p className="mt-2">
                IMPORTANT: Ensure all permissions remain selected on the Stripe
                page.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="relative pb-10">
        <div
          className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
          aria-hidden="true"
        ></div>
        <div className="relative flex items-start space-x-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
            2
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-medium text-gray-900">Copy Your Key</h3>
            <p className="mt-1 text-sm text-gray-500">
              Copy the entire key (shown only once) that starts with
              "rk_live_..." or "sk_live_...".
            </p>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="relative">
        <div className="relative flex items-start space-x-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
            3
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-medium text-gray-900">
              Connect Account
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Paste your key below to enable financial reports and data access.
            </p>
            <div className="mt-3">
              <StripeAccountForm
                userId={userId}
                simplified={true}
                isFirstAccount={isFirstAccount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
