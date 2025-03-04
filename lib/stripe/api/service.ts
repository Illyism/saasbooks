'use server';
/**
 * Stripe Account Management Service
 *
 * Handles CRUD operations for Stripe accounts
 */
import { prisma } from '@/lib/db';
import { decryptData, encryptData } from '@/lib/utils';
import { StripeAccount } from '../types';
import { getAccountInfo, verifyApiKey } from './client';

// Get all Stripe accounts for a user
export async function getUserStripeAccounts(
  userId: string
): Promise<StripeAccount[]> {
  const accounts = await prisma.stripeAccount.findMany({
    where: { userId: parseInt(userId) },
    orderBy: { createdAt: 'desc' },
  });

  // Decrypt API keys before returning (only if needed in the response)
  return accounts.map(account => ({
    ...account,
    apiKey: '•••••••••••••••••••••', // Hide actual key
  }));
}

// Get a single Stripe account with decrypted API key
export async function getStripeAccountWithKey(
  accountId: string,
  userId: string
): Promise<StripeAccount | null> {
  const account = await prisma.stripeAccount.findFirst({
    where: {
      id: accountId,
      userId: parseInt(userId),
    },
  });

  if (!account) return null;

  // Decrypt the API key for use with Stripe API
  const decryptedKey = decryptData(account.apiKey);

  return {
    ...account,
    apiKey: decryptedKey,
  };
}

// Add a new Stripe account
export async function addStripeAccount(
  userId: string,
  name: string,
  apiKey: string
): Promise<StripeAccount> {
  // Verify the API key is valid before saving
  const isValid = await verifyApiKey(apiKey);

  if (!isValid) {
    throw new Error('Invalid Stripe API key');
  }

  // Get account info from Stripe
  const accountInfo = await getAccountInfo(apiKey);

  // Encrypt API key before storing
  const encryptedKey = encryptData(apiKey);

  // Save to database
  const account = await prisma.stripeAccount.create({
    data: {
      userId: parseInt(userId),
      name,
      stripeAccountId: accountInfo.stripeAccountId || '',
      apiKey: encryptedKey,
      isActive: true,
      businessName: accountInfo.businessName,
    },
  });

  return {
    ...account,
    apiKey: '•••••••••••••••••••••', // Hide actual key in response
  };
}

// Update a Stripe account
export async function updateStripeAccount(
  accountId: string,
  userId: string,
  data: Partial<StripeAccount>
): Promise<StripeAccount> {
  // If updating API key, verify and encrypt it
  const updateData: Partial<StripeAccount> = { ...data };

  if (data.apiKey) {
    const isValid = await verifyApiKey(data.apiKey);

    if (!isValid) {
      throw new Error('Invalid Stripe API key');
    }

    // Get updated account info
    const accountInfo = await getAccountInfo(data.apiKey);

    // Encrypt new API key
    updateData.apiKey = encryptData(data.apiKey);
    updateData.stripeAccountId = accountInfo.stripeAccountId;
    updateData.businessName = accountInfo.businessName;
  }

  // Remove fields that shouldn't be updated directly
  delete updateData.id;
  delete updateData.userId;
  delete updateData.createdAt;

  // Update in database
  const account = await prisma.stripeAccount.update({
    where: {
      id: accountId,
      userId: parseInt(userId),
    },
    data: updateData,
  });

  return {
    ...account,
    apiKey: '•••••••••••••••••••••', // Hide actual key in response
  };
}

// Delete a Stripe account
export async function deleteStripeAccount(
  accountId: string,
  userId: string
): Promise<void> {
  await prisma.stripeAccount.delete({
    where: {
      id: accountId,
      userId: parseInt(userId),
    },
  });
}
