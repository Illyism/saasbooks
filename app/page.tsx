import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Calculator,
  CreditCard,
  DollarSign,
  FileText,
  Github,
  LineChart,
  PieChart,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <main className="mt-16">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  <DollarSign className="mr-1 h-4 w-4" />
                  SaaS Accounting
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                  <Calculator className="mr-1 h-4 w-4" />
                  Financial Analytics
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                The missing link between Stripe and your accountant
              </h1>
              <p className="text-lg text-gray-600">
                SaaSBooks automates the tedious process of getting data from
                Stripe and Mercury into QuickBooks or Xero, while adding the
                SaaS metrics your accountant doesn't track.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/auth/login">
                  <Button size="lg" className="group font-medium">
                    Try for Free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link
                  href="https://github.com/Illyism/saasbooks"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="font-medium">
                    <Github className="mr-2 h-4 w-4" />
                    Star on GitHub
                  </Button>
                </Link>
              </div>
              <div className="pt-4">
                <p className="text-sm text-gray-500">
                  7-day free trial • $19/mo after • Cancel anytime
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 p-8 shadow-lg">
              <div className="relative overflow-hidden rounded-lg bg-white p-6 shadow-md">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-100/80"></div>
                <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-indigo-100/50"></div>

                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">
                      Financial Overview
                    </h3>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      +24% MRR
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <div className="mb-1 text-xs text-gray-500">
                        Monthly Revenue
                      </div>
                      <div className="text-xl font-bold text-gray-900">
                        $42,658
                      </div>
                    </div>
                    <div className="rounded-lg bg-indigo-50 p-3">
                      <div className="mb-1 text-xs text-gray-500">
                        Annual Run Rate
                      </div>
                      <div className="text-xl font-bold text-gray-900">
                        $511,896
                      </div>
                    </div>
                  </div>

                  <div className="h-24 rounded-lg bg-gray-100">
                    <div className="flex h-full items-end justify-between p-2">
                      <div className="h-1/3 w-8 rounded-t bg-blue-400"></div>
                      <div className="h-2/3 w-8 rounded-t bg-blue-500"></div>
                      <div className="h-1/2 w-8 rounded-t bg-blue-600"></div>
                      <div className="h-4/5 w-8 rounded-t bg-indigo-500"></div>
                      <div className="h-full w-8 rounded-t bg-indigo-600"></div>
                      <div className="h-3/4 w-8 rounded-t bg-indigo-700"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 rounded-xl bg-red-50 p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Traditional Accounting Software is Failing SaaS Companies
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 inline-block rounded-full bg-red-100 p-3">
                  <BarChart3 className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Days of Manual Work
                </h3>
                <p className="mt-2 text-gray-600">
                  Reconciling Stripe and bank data takes days every month.
                  You're exporting CSVs, fixing formulas, and manually updating
                  QuickBooks or Xero.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 inline-block rounded-full bg-red-100 p-3">
                  <PieChart className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Missing SaaS Metrics
                </h3>
                <p className="mt-2 text-gray-600">
                  QuickBooks and Xero don't track crucial SaaS metrics like MRR,
                  churn, CAC, or LTV, forcing you to maintain separate
                  spreadsheets for investor reporting.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 inline-block rounded-full bg-red-100 p-3">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Error-Prone Reconciliation
                </h3>
                <p className="mt-2 text-gray-600">
                  Manual data entry leads to mistakes. When tax time arrives,
                  you discover missing transactions, duplicate entries, and
                  costly reporting errors.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                AI Automation Saves You Time & Money
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                SaaSBooks uses AI to automatically reconcile transactions,
                categorize expenses, and generate the reports your accountant
                and investors need.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <LineChart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  SaaS Metrics Dashboard
                </h3>
                <p className="text-gray-600">
                  Track MRR, ARR, LTV, CAC, churn rate, and all the metrics that
                  matter for SaaS growth and investor reporting.
                </p>
              </div>

              <div className="rounded-xl border border-indigo-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                  <CreditCard className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Stripe + Mercury Integration
                </h3>
                <p className="text-gray-600">
                  Automatic sync with your payment processor and bank account.
                  Export clean, categorized data to QuickBooks or Xero with one
                  click.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <FileText className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Accounting Software Integration
                </h3>
                <p className="text-gray-600">
                  Prepare your data for QuickBooks and Xero with automated
                  categorization. Your accountant will thank you (and charge you
                  less).
                </p>
              </div>

              <div className="rounded-xl border border-amber-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  <Wallet className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Expense Categorization
                </h3>
                <p className="text-gray-600">
                  Smart AI categorizes your expenses automatically, saving you
                  hours of manual work every month.
                </p>
              </div>

              <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Github className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Open Source
                </h3>
                <p className="text-gray-600">
                  Full transparency with our open-source codebase. Self-host or
                  use our cloud service - your choice, your control.
                </p>
              </div>

              <div className="rounded-xl border border-pink-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                  <DollarSign className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Investor-Ready Data
                </h3>
                <p className="text-gray-600">
                  Impress investors with beautiful, accurate financial metrics
                  and forecasts that show your growth potential.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 p-8 shadow-sm">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Pricing That Makes Sense
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                No complicated tiers. No hidden fees. Just simple pricing for
                your SaaS finances.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                  <h3 className="text-2xl font-bold">Cloud Solution</h3>
                  <p className="mt-2 opacity-90">Hassle-free SaaS accounting</p>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <p className="text-5xl font-bold text-gray-900">
                      $19
                      <span className="text-xl font-normal text-gray-500">
                        /mo
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Up to 10,000 transactions monthly
                    </p>
                  </div>
                  <ul className="mb-8 space-y-4">
                    <li className="flex items-start">
                      <svg
                        className="h-6 w-6 flex-shrink-0 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-gray-600">
                        All SaaS metrics and dashboards
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-6 w-6 flex-shrink-0 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-gray-600">
                        Stripe + Mercury integrations
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-6 w-6 flex-shrink-0 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-gray-600">
                        Automatic expense categorization
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-6 w-6 flex-shrink-0 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-gray-600">
                        Tax-ready financial reports
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-6 w-6 flex-shrink-0 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-gray-600">Email support</span>
                    </li>
                  </ul>
                  <Link href="/auth/login">
                    <Button className="w-full font-medium">
                      Start 7-Day Free Trial
                    </Button>
                  </Link>
                  <p className="mt-2 text-center text-sm text-gray-500">
                    Full access for 7 days
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white">
                  <h3 className="text-2xl font-bold">Self-Hosted</h3>
                  <p className="mt-2 opacity-90">Maximum control & privacy</p>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <p className="text-5xl font-bold text-gray-900">Free</p>
                    <p className="mt-1 text-sm text-gray-500">
                      Open source MIT license
                    </p>
                  </div>
                  <ul className="mb-8 space-y-4">
                    <li className="flex items-start">
                      <svg
                        className="h-6 w-6 flex-shrink-0 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-gray-600">
                        Full source code access
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-6 w-6 flex-shrink-0 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-gray-600">
                        Unlimited transactions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-6 w-6 flex-shrink-0 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-gray-600">
                        Complete data privacy
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-6 w-6 flex-shrink-0 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-gray-600">
                        Customizable features
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-6 w-6 flex-shrink-0 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-gray-600">
                        Community support
                      </span>
                    </li>
                  </ul>
                  <Link
                    href="https://github.com/Illyism/saasbooks"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full font-medium">
                      <Github className="mr-2 h-4 w-4" />
                      Star on GitHub
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg">
            <div className="px-8 py-12 text-center text-white md:px-16 md:py-16">
              <h2 className="text-3xl font-bold md:text-4xl">
                Save 20+ hours every month on financial admin
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
                SaaSBooks works alongside QuickBooks & Xero, automating the
                tedious parts of reconciliation and giving you the SaaS metrics
                they don't provide.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/auth/login">
                  <Button size="lg" variant="secondary" className="font-medium">
                    Start 7-Day Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link
                  href="https://github.com/Illyism/saasbooks"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent font-medium text-white hover:bg-white/10 hover:text-white"
                  >
                    View on GitHub
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm opacity-80">
                Easy export to QuickBooks/Xero • All SaaS metrics included •
                Cancel anytime
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
