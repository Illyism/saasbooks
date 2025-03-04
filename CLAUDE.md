# SaaSBooks Development Guide

## Commands

- `bun --bun next dev` - Start development server
- `bun db:push` - Push schema changes to database
- `bun build` - Build the application
- `bun lint` - Run ESLint
- `bun check` - Run Prettier and ESLint
- `bunx shadcn@canary add <component>` - Add shadcn/ui components
- `bun install stripe` - Install Stripe dependency

## Stack

- Next.js 15 App Router for routing and API
- Prisma with SQLite for local-first database
- React Server Components by default
- TypeScript for type safety
- TailwindCSS, Shadcn/UI and Radix for styling
- Bun as runtime and package manager
- Recharts for data visualization
- Stripe API for financial data

## Code Style

- Use single quotes, 2 spaces, trailing commas
- Max line length: 80 characters
- Strong TypeScript typing (`no-explicit-any` is error)
- Use React Server Components by default
- Imports using path aliases (@/components, @/lib)
- Minimize code complexity - less files, less code
- Follow component patterns from shadcn/ui
- Organize related files together by feature

## Data Import & Categorization Architecture

SaaSBooks follows a file-based architecture for financial data:

1. **Source of Truth**: Imported raw data files (CSV, JSON) from Stripe and Mercury are stored as-is in user's Google Drive.

2. **Categorization Rules**: We apply rule-based categorization logic at runtime against the raw data.

3. **No Database Storage**: We don't store transactions in the database. Instead, we process them on demand from source files.

4. **Key Benefits**:

   - When categorization rules improve, all historical data is automatically re-categorized
   - Users retain ownership of their raw financial data
   - Categorization can be customized without data migration
   - Full audit trail through original source files

5. **Implementation Notes**:
   - Financial report calculations should be cached where appropriate
   - File indexes should track which files have been imported to avoid duplicates
   - All categorization should happen through a centralized rule engine
   - Rules should support both pattern matching and ML-based categorization

## Stripe Integration

SaaSBooks supports multiple Stripe accounts per user:

1. **Account Management**:

   - Users can connect multiple Stripe accounts using API keys
   - API keys are stored with encryption for security
   - Each account can be used to fetch financial data

2. **Data Processing**:

   - Balance transaction data is fetched directly from Stripe API
   - Volume metrics are calculated in real-time
   - Chart visualizations use Recharts & Shadcn/UI Chart component

3. **Security**:

   - Stripe API keys are encrypted using AES-256-CBC
   - Keys are never exposed to the client
   - Each account has a display name separate from the Stripe account name

4. **Key Files**:
   - `/lib/stripe/api/client.ts` - Core Stripe API client
   - `/lib/stripe/api/service.ts` - Account management
   - `/lib/stripe/components/` - UI components
   - `/app/settings/stripe/` - Account settings page
   - `/app/dashboard/stripe/` - Financial dashboard page
