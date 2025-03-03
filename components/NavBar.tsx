import { Button } from '@/components/ui/button';
import { Cloud, Github } from 'lucide-react';
import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">SaaSBooks</span>
          </Link>
          <nav className="ml-10 hidden space-x-8 md:flex">
            <Link
              href="/features"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Documentation
            </Link>
            <div className="group relative">
              <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                <span>API Keys</span>
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="invisible absolute left-0 z-10 mt-2 w-48 rounded-md bg-white opacity-0 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="py-1">
                  <Link
                    href="/api-keys/openai"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    OpenAI
                  </Link>
                  <Link
                    href="/api-keys/anthropic"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Anthropic
                  </Link>
                  <Link
                    href="/api-keys/google"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Google AI
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/Illyism/saasbooks"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <Github className="mr-1 h-5 w-5" />
            <span className="hidden sm:inline">GitHub</span>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm" className="font-medium">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="font-medium">
              <Cloud className="mr-1 h-4 w-4" />
              <span>Free Trial</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
