'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StripeAccount } from '../types';
import { deleteStripeAccount } from '../api/service';
import Link from 'next/link';

interface StripeAccountsListProps {
  userId: string;
  accounts: StripeAccount[];
  onAccountDeleted?: () => void;
}

export function StripeAccountsList({
  userId,
  accounts,
  onAccountDeleted,
}: StripeAccountsListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async (accountId: string, accountName: string) => {
    if (
      confirm(
        `Are you sure you want to delete the Stripe account "${accountName}"? This will not affect your actual Stripe account, only the connection to SaaSBooks.`
      )
    ) {
      setIsDeleting(accountId);
      setDeleteError(null);
      try {
        await deleteStripeAccount(accountId, userId);
        if (onAccountDeleted) {
          onAccountDeleted();
        }
        // Refresh the page to show updated accounts list
        window.location.reload();
      } catch (error) {
        console.error('Failed to delete account:', error);
        setDeleteError('Failed to delete account. Please try again.');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Stripe Accounts</CardTitle>
        <CardDescription>Manage your connected Stripe accounts</CardDescription>
      </CardHeader>
      <CardContent>
        {accounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="mb-4 text-gray-500">
              No Stripe accounts connected yet.
            </p>
            <p className="text-sm text-gray-400">
              Connect a Stripe account to view your financial data
            </p>
          </div>
        ) : (
          <>
            {deleteError && (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {deleteError}
              </div>
            )}

            <div className="space-y-4">
              {accounts.map(account => (
                <div
                  key={account.id}
                  className="overflow-hidden rounded-lg border bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium">{account.name}</h3>
                        {account.isActive && (
                          <Badge className="ml-2" variant="outline">
                            Active
                          </Badge>
                        )}
                      </div>
                      {account.businessName && (
                        <p className="text-sm text-gray-500">
                          {account.businessName}
                        </p>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      Connected{' '}
                      {new Date(account.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="text-sm text-gray-500">
                      {account.stripeAccountId
                        ? `Account ID: ${account.stripeAccountId.substring(0, 8)}...`
                        : 'Standard account'}
                    </div>
                    <div className="flex space-x-2">
                      <Link href="/dashboard/stripe">
                        <Button variant="outline" size="sm">
                          View Dashboard
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(account.id, account.name)}
                        disabled={isDeleting === account.id}
                      >
                        {isDeleting === account.id ? 'Deleting...' : 'Delete'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
