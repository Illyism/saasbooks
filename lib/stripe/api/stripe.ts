import Stripe from 'stripe';

// Create a new Stripe client for a specific account
export function createStripeClient(apiKey: string): Stripe {
  return new Stripe(apiKey, {
    apiVersion: '2025-02-24.acacia', // Use the latest stable API version
    typescript: true,
  });
}
