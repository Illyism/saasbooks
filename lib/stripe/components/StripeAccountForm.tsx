'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { addStripeAccount } from '../api/service';
import { StripeAccount } from '../types';

interface StripeAccountFormProps {
  userId: string;
  onSuccess?: (account: StripeAccount) => void;
  simplified?: boolean;
  isFirstAccount?: boolean;
}

export function StripeAccountForm({
  userId,
  onSuccess,
  simplified = false,
  isFirstAccount = false,
}: StripeAccountFormProps) {
  const [name, setName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Check if API key is in the correct format
      if (!apiKey.startsWith('rk_') && !apiKey.startsWith('sk_')) {
        throw new Error(
          'Invalid API key format. The key should start with "rk_" or "sk_"'
        );
      }

      // Use a default name if not provided in simplified mode
      const accountName = name || 'My Stripe Account';

      const account = await addStripeAccount(userId, accountName, apiKey);
      setName('');
      setApiKey('');
      setSuccess(true);
      if (onSuccess) {
        onSuccess(account);
      }

      // Refresh the page after 2 seconds to show the new account in the list
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      let errorMessage = 
        err instanceof Error ? err.message : 'Failed to add Stripe account';
      
      // Add helpful message for common permission errors
      if (errorMessage.includes('does not have the required permissions')) {
        errorMessage = 'Your Stripe API key is missing required permissions. Please generate a new key with all necessary permissions, especially "Balance transaction source read" (rak_balance_transaction_source_read).';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (simplified) {
    return (
      <div
        className={`rounded-lg ${!isFirstAccount ? 'border bg-white p-5' : ''}`}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isFirstAccount && (
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Account Name (Optional)
                </label>
                <Input
                  id="name"
                  placeholder="My Stripe Account"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={isLoading || success}
                  className="border-gray-300"
                />
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="apiKey"
                className="text-sm font-medium text-gray-700"
              >
                Paste your Stripe API key
              </label>
              <Input
                id="apiKey"
                placeholder="rk_live_..."
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                required
                disabled={isLoading || success}
                className="border-gray-300"
              />
            </div>

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                <p className="font-medium">Successfully connected to Stripe!</p>
                <p className="mt-1">Redirecting to dashboard...</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || success || !apiKey}
              className={`mt-2 w-full ${isFirstAccount ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
            >
              {isLoading
                ? 'Connecting...'
                : isFirstAccount
                  ? 'Connect Account & View Dashboard'
                  : 'Connect Account'}
            </Button>

            {!isFirstAccount && (
              <p className="mt-2 text-center text-xs text-gray-500">
                This will not affect your existing Stripe connections
              </p>
            )}
          </div>
        </form>
      </div>
    );
  }

  // Original card-style form
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Stripe Account</CardTitle>
        <CardDescription>
          Connect your Stripe account to view financial data
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Account Name
            </label>
            <Input
              id="name"
              placeholder="My Business"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              disabled={isLoading || success}
            />
            <p className="text-xs text-gray-500">
              A friendly name to identify this account (e.g., "My SaaS
              Business")
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium">
              Stripe Restricted Key
            </label>
            <Input
              id="apiKey"
              placeholder="rk_live_..."
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              required
              disabled={isLoading || success}
            />
            <p className="text-xs text-gray-500">
              Paste the restricted key generated from Stripe (starts with "rk_")
            </p>
          </div>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
              Successfully connected to Stripe! Refreshing page...
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={isLoading || success || !name || !apiKey}
            className="w-full"
          >
            {isLoading ? 'Connecting...' : 'Connect Stripe Account'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
