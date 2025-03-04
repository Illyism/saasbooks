import { Button } from '@/components/ui/button';
import { ArrowRight, Cloud, Github, Key, Phone, Rocket, X } from 'lucide-react';
import Link from 'next/link';

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            SaaSBooks Design System
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-500">
            A comprehensive guide to our UI components and design patterns
          </p>
        </div>

        {/* Typography */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Typography</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Headings
              </h3>
              <div className="space-y-6 rounded-xl bg-gray-50 p-6">
                <div>
                  <h1 className="text-5xl font-bold text-gray-900">
                    Heading 1
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    text-5xl font-bold
                  </p>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">
                    Heading 2
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    text-4xl font-bold
                  </p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    Heading 3
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    text-3xl font-bold
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">
                    Heading 4
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    text-2xl font-bold
                  </p>
                </div>
                <div>
                  <h5 className="text-xl font-bold text-gray-900">Heading 5</h5>
                  <p className="mt-1 text-sm text-gray-500">
                    text-xl font-bold
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Body Text
              </h3>
              <div className="space-y-6 rounded-xl bg-gray-50 p-6">
                <div>
                  <p className="text-lg text-gray-900">Large Text</p>
                  <p className="mt-1 text-sm text-gray-500">text-lg</p>
                </div>
                <div>
                  <p className="text-base text-gray-900">Base Text</p>
                  <p className="mt-1 text-sm text-gray-500">text-base</p>
                </div>
                <div>
                  <p className="text-sm text-gray-900">Small Text</p>
                  <p className="mt-1 text-sm text-gray-500">text-sm</p>
                </div>
                <div>
                  <p className="text-xs text-gray-900">Extra Small Text</p>
                  <p className="mt-1 text-sm text-gray-500">text-xs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Colors */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Colors</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Primary Colors
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div>
                  <div className="h-24 rounded-lg bg-blue-600"></div>
                  <p className="mt-2 font-medium">Blue 600</p>
                  <p className="text-sm text-gray-500">Primary</p>
                </div>
                <div>
                  <div className="h-24 rounded-lg bg-black"></div>
                  <p className="mt-2 font-medium">Black</p>
                  <p className="text-sm text-gray-500">Text & Buttons</p>
                </div>
                <div>
                  <div className="h-24 rounded-lg border bg-white"></div>
                  <p className="mt-2 font-medium">White</p>
                  <p className="text-sm text-gray-500">Background</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Accent Colors
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div>
                  <div className="h-24 rounded-lg bg-purple-500"></div>
                  <p className="mt-2 font-medium">Purple 500</p>
                  <p className="text-sm text-gray-500">Accent</p>
                </div>
                <div>
                  <div className="h-24 rounded-lg bg-green-500"></div>
                  <p className="mt-2 font-medium">Green 500</p>
                  <p className="text-sm text-gray-500">Success</p>
                </div>
                <div>
                  <div className="h-24 rounded-lg bg-red-500"></div>
                  <p className="mt-2 font-medium">Red 500</p>
                  <p className="text-sm text-gray-500">Error</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Buttons</h2>
          <div className="space-y-12">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Button Variants
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="black">Black</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="blue">Blue</Button>
                <Button variant="purple">Purple</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Button Sizes
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Button with Icons
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button>
                  <Rocket className="mr-2 h-4 w-4" />
                  Get Started
                </Button>
                <Button variant="outline">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="black" size="lg">
                  Sign Up Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Cards</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-blue-50 p-8 shadow-sm">
              <div className="flex h-full flex-col">
                <div className="mb-4">
                  <div className="w-fit rounded-full bg-blue-100 p-3">
                    <Cloud className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Feature Card
                </h3>
                <p className="mb-6 text-gray-600">
                  This card style is used to highlight key features of the
                  product.
                </p>
                <div className="mt-auto">
                  <Button className="w-full font-medium">
                    Call to Action
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex h-full flex-col">
                <div className="mb-4">
                  <div className="w-fit rounded-full bg-gray-100 p-3">
                    <Key className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Simple Card
                </h3>
                <p className="mb-6 text-gray-600">
                  A clean, simple card design for general content and
                  information.
                </p>
                <div className="mt-auto">
                  <Button variant="outline" className="w-full font-medium">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-purple-400 p-8 text-white">
              <div className="flex h-full flex-col">
                <div className="mb-4">
                  <div className="w-fit rounded-full bg-purple-300 p-3">
                    <Phone className="h-6 w-6 text-purple-700" />
                  </div>
                </div>
                <h3 className="mb-4 text-2xl font-bold">Gradient Card</h3>
                <p className="mb-6">
                  A vibrant gradient card for highlighting important calls to
                  action.
                </p>
                <div className="mt-auto">
                  <Button variant="black" className="w-full font-medium">
                    Take Action
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              <Github className="mr-1 h-4 w-4" />
              Open Source
            </span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              <Cloud className="mr-1 h-4 w-4" />
              Cloud Available
            </span>
            <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
              New
            </span>
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
              Beta
            </span>
            <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
              Important
            </span>
          </div>
        </section>

        {/* Split Design */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Split Design
          </h2>
          <div className="overflow-hidden rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-gradient-to-br from-blue-400 to-blue-300 p-12 text-white">
                <div className="flex flex-col items-start space-y-8">
                  <div className="rounded-full bg-blue-200 p-3">
                    <Rocket className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold">Left Section</h3>
                  <p className="text-lg">
                    This split design is perfect for dual calls-to-action
                  </p>
                  <Button variant="black" size="lg">
                    Primary Action
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-400 p-12 text-white">
                <div className="flex flex-col items-start space-y-8">
                  <div className="rounded-full bg-purple-300 p-3">
                    <Phone className="h-8 w-8 text-purple-700" />
                  </div>
                  <h3 className="text-3xl font-bold">Right Section</h3>
                  <p className="text-lg">
                    Each side can have its own distinct call-to-action
                  </p>
                  <Button variant="black" size="lg">
                    Secondary Action
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Icons */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Icons</h2>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Rocket className="h-8 w-8 text-gray-700" />
              </div>
              <p className="mt-2 text-sm text-gray-600">Rocket</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Cloud className="h-8 w-8 text-gray-700" />
              </div>
              <p className="mt-2 text-sm text-gray-600">Cloud</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Github className="h-8 w-8 text-gray-700" />
              </div>
              <p className="mt-2 text-sm text-gray-600">Github</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Key className="h-8 w-8 text-gray-700" />
              </div>
              <p className="mt-2 text-sm text-gray-600">Key</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Phone className="h-8 w-8 text-gray-700" />
              </div>
              <p className="mt-2 text-sm text-gray-600">Phone</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <ArrowRight className="h-8 w-8 text-gray-700" />
              </div>
              <p className="mt-2 text-sm text-gray-600">Arrow Right</p>
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Form Elements
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="block w-full rounded-full border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="block w-full rounded-full border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="block w-full rounded-lg border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="select"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Select Option
                </label>
                <select
                  id="select"
                  className="block w-full rounded-full border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Design Principles */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Design Principles
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Clean & Minimal
              </h3>
              <p className="text-gray-600">
                Our design focuses on simplicity and clarity, removing
                unnecessary elements to highlight what matters most.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Consistent & Intuitive
              </h3>
              <p className="text-gray-600">
                We maintain consistency across all interfaces to create an
                intuitive experience that feels familiar and easy to use.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Accessible & Inclusive
              </h3>
              <p className="text-gray-600">
                Our design system is built with accessibility in mind, ensuring
                everyone can use our product regardless of ability.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-16 text-center">
          <Link href="/">
            <Button variant="outline" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
