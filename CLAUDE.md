# SaaSBooks Development Guide

## Commands
- `bun --bun next dev` - Start development server
- `bun db:push` - Push schema changes to database
- `bun build` - Build the application
- `bun lint` - Run ESLint
- `bun check` - Run Prettier and ESLint
- `bunx shadcn@canary add <component>` - Add shadcn/ui components

## Stack
- Next.js 15 App Router for routing and API
- Prisma with SQLite for local-first database
- React Server Components by default
- TypeScript for type safety
- TailwindCSS, Shadcn/UI and Radix for styling
- Bun as runtime and package manager

## Code Style
- Use single quotes, 2 spaces, trailing commas
- Max line length: 80 characters
- Strong TypeScript typing (`no-explicit-any` is error)
- Use React Server Components by default
- Imports using path aliases (@/components, @/lib)
- Minimize code complexity - less files, less code
- Follow component patterns from shadcn/ui
- Organize related files together by feature