/**
 * Stripe integration types
 */

// Stripe account types
export interface StripeAccount {
  id: string; // Unique identifier
  name: string; // Display name
  stripeAccountId: string; // Stripe account ID
  apiKey: string; // Encrypted API key
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean; // Is this account active
  businessName?: string; // Business name associated with account
  metadata?: Record<string, unknown>; // Additional metadata
}

// Stripe balance transaction
export interface StripeBalanceTransaction {
  id: string; // Stripe balance transaction ID
  amount: number; // Amount in cents
  availableOn: Date; // When the funds become available
  created: Date; // When the transaction was created
  currency: string; // Three-letter ISO currency code
  description: string; // Description of the transaction
  fee: number; // Fee in cents
  net: number; // Net amount in cents
  reportingCategory: string; // Category for reporting
  status: 'available' | 'pending'; // Transaction status
  type: string; // Transaction type
  source?: string; // Source ID
}

// Aggregated volume data for charts
export interface VolumeData {
  date: string; // Date in YYYY-MM-DD format
  amount: number; // Volume amount in cents
  accountId?: string; // Optional account ID for filtering
}

// Chart data for recharts
export interface ChartData {
  name: string;
  value: number;
}

// Time period for filtering data
export type TimePeriod =
  | '7d' // Last 7 days
  | '30d' // Last 30 days
  | '90d' // Last 90 days
  | 'ytd' // Year to date
  | 'all'; // All time
