import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
            <Card>
              <CardHeader>
                <CardTitle>Headings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Body Text</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Colors */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Colors</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Primary Colors</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Accent Colors</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Buttons</h2>
          <Card className="space-y-8">
            <CardHeader>
              <CardTitle>Button Components</CardTitle>
              <CardDescription>All available button variants and sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
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
              <Separator />
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
              <Separator />
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
            </CardContent>
          </Card>
        </section>

        {/* Cards */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Cards</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="bg-blue-50">
              <CardHeader>
                <div className="mb-2 w-fit rounded-full bg-blue-100 p-3">
                  <Cloud className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Feature Card</CardTitle>
                <CardDescription className="text-gray-600">
                  This card style is used to highlight key features of the product.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  With additional content that can provide more details about the feature.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full font-medium">
                  Call to Action
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 w-fit rounded-full bg-gray-100 p-3">
                  <Key className="h-6 w-6 text-gray-600" />
                </div>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription className="text-gray-600">
                  A clean, simple card design for general content.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The shadcn Card component provides a consistent and stylish way to display content.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full font-medium">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-purple-400 p-6 text-white">
              <div className="flex h-full flex-col space-y-4">
                <div className="w-fit rounded-full bg-purple-300 p-3">
                  <Phone className="h-6 w-6 text-purple-700" />
                </div>
                <h3 className="text-2xl font-bold">Gradient Card</h3>
                <p className="text-sm text-purple-100">
                  For special emphasis and important calls to action
                </p>
                <p>
                  A vibrant gradient card for highlighting important information and primary actions.
                </p>
                <div className="mt-auto pt-4">
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
          <Card>
            <CardHeader>
              <CardTitle>Badge Variants</CardTitle>
              <CardDescription>Available badge styles and colors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Badge variant="default" className="flex gap-1">
                  <Github className="h-3 w-3" />
                  Default
                </Badge>
                <Badge variant="secondary" className="flex gap-1">
                  <Cloud className="h-3 w-3" />
                  Secondary
                </Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge className="bg-blue-500">Blue</Badge>
                <Badge className="bg-green-500">Success</Badge>
                <Badge className="bg-yellow-500 text-yellow-950">Warning</Badge>
                <Badge className="bg-purple-500">Premium</Badge>
              </div>
            </CardContent>
          </Card>
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
          <Card>
            <CardHeader>
              <CardTitle>Lucide Icons</CardTitle>
              <CardDescription>Common icons used throughout the application</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </section>

        {/* Form Elements */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Form Elements
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Input Components</CardTitle>
              <CardDescription>Form controls for user input</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message here..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="select" className="text-sm font-medium">
                      Select Option
                    </label>
                    <Select defaultValue="option1">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Design Principles */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Design Principles
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Clean & Minimal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our design focuses on simplicity and clarity, removing
                  unnecessary elements to highlight what matters most.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Consistent & Intuitive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We maintain consistency across all interfaces to create an
                  intuitive experience that feels familiar and easy to use.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Accessible & Inclusive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our design system is built with accessibility in mind, ensuring
                  everyone can use our product regardless of ability.
                </p>
              </CardContent>
            </Card>
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
