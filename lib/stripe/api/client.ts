'use server';

import { createStripeClient } from '@/lib/stripe/api/stripe';
import {
  StripeAccount,
  StripeBalanceTransaction,
  TimePeriod,
  VolumeData,
} from '../types';

// Fetch account info from Stripe
export async function getAccountInfo(
  apiKey: string
): Promise<Partial<StripeAccount>> {
  const stripe = createStripeClient(apiKey);

  try {
    const account = await stripe.accounts.retrieve();

    return {
      stripeAccountId: account.id,
      businessName: account.business_profile?.name || undefined,
    };
  } catch (error) {
    console.error('Error fetching Stripe account info:', error);
    throw new Error('Could not verify Stripe API key');
  }
}

// Fetch balance transactions from Stripe
export async function getBalanceTransactions(
  apiKey: string,
  limit = 100
): Promise<StripeBalanceTransaction[]> {
  const stripe = createStripeClient(apiKey);

  try {
    const transactions = await stripe.balanceTransactions.list({
      limit,
      expand: ['data.source'],
    });

    return transactions.data.map(tx => ({
      id: tx.id,
      amount: tx.amount,
      availableOn: new Date(tx.available_on * 1000),
      created: new Date(tx.created * 1000),
      currency: tx.currency,
      description: tx.description || '',
      fee: tx.fee,
      net: tx.net,
      reportingCategory: tx.reporting_category,
      status: tx.status as 'available' | 'pending',
      type: tx.type,
      source: typeof tx.source === 'string' ? tx.source : tx.source?.id,
    }));
  } catch (error) {
    console.error('Error fetching Stripe balance transactions:', error);

    // Check if it's a permissions error
    if (
      error instanceof Error &&
      error.message.includes('does not have the required permissions') &&
      error.message.includes('rak_balance_transaction_source_read')
    ) {
      throw new Error(
        'Your Stripe API key needs the "rak_balance_transaction_source_read" permission. Please generate a new key with all required permissions.'
      );
    }

    throw new Error('Could not fetch balance transactions');
  }
}

// Calculate gross volume for a time period
export async function getGrossVolume(
  apiKey: string,
  period: TimePeriod = '30d'
): Promise<number> {
  const stripe = createStripeClient(apiKey);
  const now = new Date();
  let startDate: number;

  // Calculate start timestamp based on period
  switch (period) {
    case '7d':
      startDate = Math.floor(
        new Date(now.setDate(now.getDate() - 7)).getTime() / 1000
      );
      break;
    case '30d':
      startDate = Math.floor(
        new Date(now.setDate(now.getDate() - 30)).getTime() / 1000
      );
      break;
    case '90d':
      startDate = Math.floor(
        new Date(now.setDate(now.getDate() - 90)).getTime() / 1000
      );
      break;
    case 'ytd':
      startDate = Math.floor(
        new Date(now.getFullYear(), 0, 1).getTime() / 1000
      );
      break;
    case 'all':
      startDate = 0; // Beginning of time
      break;
    default:
      startDate = Math.floor(
        new Date(now.setDate(now.getDate() - 30)).getTime() / 1000
      );
  }

  try {
    const transactions = await stripe.balanceTransactions.list({
      created: { gte: startDate },
      type: 'charge', // Only include successful charges
      limit: 100,
    });

    // Sum up the net amount (after fees)
    return transactions.data.reduce((sum, tx) => sum + tx.net, 0);
  } catch (error) {
    console.error('Error calculating gross volume:', error);
    throw new Error('Could not calculate gross volume');
  }
}

// Get daily volume data for charts
export async function getDailyVolumeData(
  apiKey: string,
  period: TimePeriod = '30d'
): Promise<VolumeData[]> {
  const stripe = createStripeClient(apiKey);
  const now = new Date();
  let startDate: number;

  // Calculate start timestamp based on period
  switch (period) {
    case '7d':
      startDate = Math.floor(
        new Date(now.setDate(now.getDate() - 7)).getTime() / 1000
      );
      break;
    case '30d':
      startDate = Math.floor(
        new Date(now.setDate(now.getDate() - 30)).getTime() / 1000
      );
      break;
    case '90d':
      startDate = Math.floor(
        new Date(now.setDate(now.getDate() - 90)).getTime() / 1000
      );
      break;
    case 'ytd':
      startDate = Math.floor(
        new Date(now.getFullYear(), 0, 1).getTime() / 1000
      );
      break;
    case 'all':
      startDate = 0; // Beginning of time
      break;
    default:
      startDate = Math.floor(
        new Date(now.setDate(now.getDate() - 30)).getTime() / 1000
      );
  }

  try {
    const transactions = await stripe.balanceTransactions.list({
      created: { gte: startDate },
      limit: 100,
      expand: ['data.source'],
    });

    // Group transactions by date
    const dailyData: Record<string, number> = {};

    transactions.data.forEach(tx => {
      const date = new Date(tx.created * 1000).toISOString().split('T')[0];
      dailyData[date] = (dailyData[date] || 0) + tx.net;
    });

    // Convert to array and sort by date
    return Object.entries(dailyData)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch (error) {
    console.error('Error fetching daily volume data:', error);
    throw new Error('Could not fetch daily volume data');
  }
}

// Verify a Stripe API key
export async function verifyApiKey(apiKey: string): Promise<boolean> {
  const stripe = createStripeClient(apiKey);

  try {
    await stripe.accounts.retrieve();

    // Also verify we have permission to fetch balance transactions with sources
    try {
      await stripe.balanceTransactions.list({
        limit: 1,
        expand: ['data.source'],
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('does not have the required permissions')
      ) {
        console.error('Missing required permissions:', error.message);
        throw new Error(
          'The API key is missing required permissions. Please ensure the key has the "Balance transaction source read" (rak_balance_transaction_source_read) permission.'
        );
      }
    }

    return true;
  } catch (error) {
    console.error('API key verification error:', error);
    return false;
  }
}
