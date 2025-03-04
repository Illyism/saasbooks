'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GrossVolumeChart } from '@/lib/stripe/components';
import { getStripeAccountWithKey } from '@/lib/stripe/api/service';
import { TimePeriod } from '@/lib/stripe/types';

interface Account {
  id: string;
  name: string;
}

interface GrossVolumeManagerProps {
  userId: string;
  accounts: Account[];
}

export function GrossVolumeManager({
  userId,
  accounts,
}: GrossVolumeManagerProps) {
  const [selectedAccountId, setSelectedAccountId] = useState<string>(
    accounts[0]?.id || ''
  );
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('30d');
  const [apiKey, setApiKey] = useState<string>('');
  const [accountName, setAccountName] = useState<string>(
    accounts[0]?.name || ''
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load API key when account changes
  useEffect(() => {
    if (selectedAccountId) {
      const fetchApiKey = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const account = await getStripeAccountWithKey(
            selectedAccountId,
            userId
          );
          if (account) {
            setApiKey(account.apiKey);
            setAccountName(account.name);
          } else {
            setError('Account not found');
          }
        } catch (err) {
          setError('Failed to load account details');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchApiKey();
    }
  }, [selectedAccountId, userId]);

  // Periods for the select dropdown
  const periods = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'ytd', label: 'Year to date' },
    { value: 'all', label: 'All time' },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="w-full md:w-1/3">
          <label className="mb-1 block text-sm font-medium">Account</label>
          <Select
            value={selectedAccountId}
            onValueChange={setSelectedAccountId}
            disabled={accounts.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map(account => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-1/3">
          <label className="mb-1 block text-sm font-medium">Time Period</label>
          <Select
            value={selectedPeriod}
            onValueChange={value => setSelectedPeriod(value as TimePeriod)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {periods.map(period => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="flex h-96 items-center justify-center">
            <p>Loading chart data...</p>
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="flex h-96 items-center justify-center">
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      ) : apiKey ? (
        <GrossVolumeChart
          apiKey={apiKey}
          period={selectedPeriod}
          accountName={accountName}
        />
      ) : null}
    </div>
  );
}
