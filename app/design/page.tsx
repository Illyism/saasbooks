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
              <CardTitle>Apple-Inspired Input Components</CardTitle>
              <CardDescription>Minimalist form controls with Apple-like aesthetics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  {/* Apple-style text input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <div className="relative">
                      <Input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        className="rounded-lg border border-gray-300 bg-gray-50/50 px-4 py-3 text-base shadow-sm backdrop-blur-sm transition-all focus:border-gray-400 focus:bg-white focus:ring-0 focus:ring-offset-0"
                      />
                    </div>
                    <p className="text-xs text-gray-500">We'll never share your email</p>
                  </div>
                  
                  {/* Apple-style password input */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        className="rounded-lg border border-gray-300 bg-gray-50/50 px-4 py-3 text-base shadow-sm backdrop-blur-sm transition-all focus:border-gray-400 focus:bg-white focus:ring-0 focus:ring-offset-0"
                      />
                    </div>
                  </div>
                  
                  {/* Apple-style toggle switch */}
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
                    <div>
                      <p className="font-medium">Remember me</p>
                      <p className="text-xs text-gray-500">Stay signed in on this device</p>
                    </div>
                    <label htmlFor="toggle" className="relative inline-flex cursor-pointer items-center">
                      <input 
                        type="checkbox" 
                        id="toggle" 
                        className="peer sr-only" 
                      />
                      <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                    </label>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Apple-style textarea */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-gray-700">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message here..."
                      className="min-h-[120px] resize-none rounded-lg border border-gray-300 bg-gray-50/50 px-4 py-3 text-base shadow-sm backdrop-blur-sm transition-all focus:border-gray-400 focus:bg-white focus:ring-0 focus:ring-offset-0"
                    />
                  </div>
                  
                  {/* Apple-style select */}
                  <div className="space-y-2">
                    <label htmlFor="select" className="text-sm font-semibold text-gray-700">
                      Select Option
                    </label>
                    <Select defaultValue="option1">
                      <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-gray-50/50 px-4 py-3 text-base shadow-sm backdrop-blur-sm transition-all focus:border-gray-400 focus:bg-white focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg border-gray-200 bg-white/90 backdrop-blur-lg">
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Apple-style search input */}
                  <div className="space-y-2">
                    <label htmlFor="search" className="text-sm font-semibold text-gray-700">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <Input
                        type="search"
                        id="search"
                        placeholder="Search..."
                        className="rounded-lg border border-gray-300 bg-gray-50/50 px-4 py-3 pl-10 text-base shadow-sm backdrop-blur-sm transition-all focus:border-gray-400 focus:bg-white focus:ring-0 focus:ring-offset-0"
                      />
                    </div>
                  </div>
                  
                  {/* Apple-style segmented control */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      View Mode
                    </label>
                    <div className="inline-flex w-full overflow-hidden rounded-lg border border-gray-300 bg-gray-50/50 p-0.5 text-sm font-medium shadow-sm">
                      <label className="relative w-1/3 cursor-pointer">
                        <input type="radio" name="view" value="list" className="peer sr-only" defaultChecked />
                        <span className="flex justify-center rounded-md py-2 peer-checked:bg-white peer-checked:text-gray-900 peer-checked:shadow-sm">
                          List
                        </span>
                      </label>
                      <label className="relative w-1/3 cursor-pointer">
                        <input type="radio" name="view" value="grid" className="peer sr-only" />
                        <span className="flex justify-center rounded-md py-2 peer-checked:bg-white peer-checked:text-gray-900 peer-checked:shadow-sm">
                          Grid
                        </span>
                      </label>
                      <label className="relative w-1/3 cursor-pointer">
                        <input type="radio" name="view" value="gallery" className="peer sr-only" />
                        <span className="flex justify-center rounded-md py-2 peer-checked:bg-white peer-checked:text-gray-900 peer-checked:shadow-sm">
                          Gallery
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Apple-style Notifications */}
        <section className="mb-24">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Notification Cards
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="overflow-hidden border-0 bg-white/60 shadow-lg backdrop-blur-lg">
              <CardContent className="p-0">
                <div className="border-b border-gray-100 bg-blue-500/10 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <Cloud className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Cloud Storage</h3>
                        <p className="text-xs text-gray-500">Just now</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p>Your files have been synced successfully to the cloud.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-0 bg-white/60 shadow-lg backdrop-blur-lg">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold">New Notification</h3>
                        <p className="text-xs text-gray-500">5 minutes ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p className="mb-4">You have a new message from the team.</p>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" className="rounded-full">Dismiss</Button>
                    <Button size="sm" className="rounded-full bg-blue-500 hover:bg-blue-600">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
