import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { getStripeAccountWithKey } from '@/lib/stripe/api/service';
import { getDailyVolumeData } from '@/lib/stripe/api/client';
import { TimePeriod } from '@/lib/stripe/types';

export async function GET(req: NextRequest) {
  const { user } = await getCurrentSession();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get query parameters
  const url = new URL(req.url);
  const accountId = url.searchParams.get('accountId');
  const period = url.searchParams.get('period') || '30d';

  if (!accountId) {
    return NextResponse.json(
      { error: 'accountId parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Get account with decrypted API key
    const account = await getStripeAccountWithKey(
      accountId,
      user.id.toString()
    );

    if (!account) {
      return NextResponse.json(
        { error: 'Stripe account not found' },
        { status: 404 }
      );
    }

    // Get volume data from Stripe
    const volumeData = await getDailyVolumeData(
      account.apiKey,
      period as TimePeriod
    );

    return NextResponse.json(volumeData);
  } catch (error) {
    console.error('Error fetching volume data:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch volume data';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
