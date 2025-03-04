import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  ArrowRight,
  BarChart,
  Clock,
  Cloud,
  Github,
  Key,
  Phone,
  Rocket,
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <main className="mt-16">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  <Github className="mr-1 h-4 w-4" />
                  Open Source
                </span>
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  <Cloud className="mr-1 h-4 w-4" />
                  Cloud Ready
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Financial Data for</span>
                <span className="block text-blue-600">SaaS Success</span>
              </h1>
              <p className="text-lg text-gray-600">
                SaaSBooks turns Stripe and Mercury data into insights for
                accounting, financial planning, and smarter business decisions.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="group font-medium">
                    Get Started
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
                    GitHub
                  </Button>
                </Link>
              </div>
              <div className="pt-4">
                <p className="text-sm text-gray-500">
                  3-day free trial • $19/mo (10,000 transactions)
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 p-8 shadow-lg">
              <div className="flex aspect-video items-center justify-center rounded-lg bg-white shadow-sm">
                <p className="text-gray-400">Dashboard Preview</p>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-xl bg-red-50 p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Why SaaS Founders Need Better Financial Tools
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0 rounded-full bg-red-100 p-2">
                  <Clock className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Manual Work Wastes Time
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Combining Stripe and Mercury data for accounting and
                    reporting takes hours away from growth tasks.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0 rounded-full bg-red-100 p-2">
                  <BarChart className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Data Without Context
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Most dashboards show raw numbers without the financial
                    context needed for planning.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0 rounded-full bg-red-100 p-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Accounting Complexity
                  </h3>
                  <p className="mt-2 text-gray-600">
                    SaaS financial management requires specialized tools that
                    most accounting software lacks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-blue-50 p-8 shadow-sm">
              <div className="flex h-full flex-col">
                <div className="mb-4">
                  <div className="w-fit rounded-full bg-blue-100 p-3">
                    <Cloud className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Cloud</h2>
                <p className="mb-6 text-gray-600">
                  Start in minutes with zero setup. We handle updates and
                  backups so you focus on accounting and finances.
                </p>
                <div className="mt-auto">
                  <Link href="/signup">
                    <Button className="w-full font-medium">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-purple-50 p-8 shadow-sm">
              <div className="flex h-full flex-col">
                <div className="mb-4">
                  <div className="w-fit rounded-full bg-purple-100 p-3">
                    <Key className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  Your API Keys
                </h2>
                <p className="mb-6 text-gray-600">
                  Keep control of your financial data and reduce costs by using
                  your own API keys with our platform.
                </p>
                <div className="mt-auto">
                  <Link href="/docs/api-keys">
                    <Button variant="outline" className="w-full font-medium">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-green-50 p-8 shadow-sm">
              <div className="flex h-full flex-col">
                <div className="mb-4">
                  <div className="w-fit rounded-full bg-green-100 p-3">
                    <Github className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  Self-Host
                </h2>
                <p className="mb-6 text-gray-600">
                  Deploy on your own servers for maximum security and
                  customization of your financial management tools.
                </p>
                <div className="mt-auto">
                  <Link
                    href="https://github.com/Illyism/saasbooks"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full font-medium">
                      GitHub
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 rounded-xl bg-gray-50 p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Plans
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                Choose how you want to use SaaSBooks for your accounting and
                financial management.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Cloud</h3>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    Popular
                  </span>
                </div>
                <p className="mt-4 text-gray-600">
                  Save time with our managed solution for SaaS accounting and
                  financial management.
                </p>
                <div className="mt-6">
                  <p className="text-5xl font-bold text-gray-900">
                    $19
                    <span className="text-xl font-normal text-gray-500">
                      /mo
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    10,000 transactions monthly
                  </p>
                </div>
                <ul className="mt-6 space-y-4">
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
                      Financial dashboards and reports
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
                      Accounting data integration
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
                      Use your own API keys
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
                    <span className="ml-3 text-gray-600">Fast support</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/signup">
                    <Button className="w-full font-medium">
                      Start Free Trial
                    </Button>
                  </Link>
                  <p className="mt-2 text-center text-sm text-gray-500">
                    No credit card required
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">Self-Hosted</h3>
                <p className="mt-4 text-gray-600">
                  Full control for teams with specific accounting and financial
                  data requirements.
                </p>
                <div className="mt-6">
                  <p className="text-5xl font-bold text-gray-900">Free</p>
                  <p className="mt-1 text-sm text-gray-500">MIT license</p>
                </div>
                <ul className="mt-6 space-y-4">
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
                      Customize accounting features
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
                      Financial data privacy
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
                <div className="mt-8">
                  <Link
                    href="https://github.com/Illyism/saasbooks"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full font-medium">
                      GitHub
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 overflow-hidden rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-gradient-to-br from-blue-400 to-blue-300 p-12 text-white">
                <div className="flex flex-col items-start space-y-8">
                  <div className="rounded-full bg-blue-200 p-3">
                    <Rocket className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold">Start now</h2>
                  <p className="text-lg">
                    Simplify your SaaS accounting and finances
                  </p>
                  <Link href="/signup">
                    <Button variant="black" size="lg">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-400 p-12 text-white">
                <div className="flex flex-col items-start space-y-8">
                  <div className="rounded-full bg-purple-300 p-3">
                    <Phone className="h-8 w-8 text-purple-700" />
                  </div>
                  <h2 className="text-3xl font-bold">Talk to us</h2>
                  <p className="text-lg">
                    See how our financial tools work with a demo
                  </p>
                  <Link href="/schedule">
                    <Button variant="black" size="lg">
                      Schedule Call
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
