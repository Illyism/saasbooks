import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { addStripeAccount } from '@/lib/stripe/api/service';

// Get all Stripe accounts for the authenticated user
export async function GET() {
  const { user } = await getCurrentSession();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const accounts = await prisma.stripeAccount.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    // Hide API keys in response
    const safeAccounts = accounts.map(account => ({
      ...account,
      apiKey: '•••••••••••••••••••••',
    }));

    return NextResponse.json(safeAccounts);
  } catch (error) {
    console.error('Error fetching Stripe accounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Stripe accounts' },
      { status: 500 }
    );
  }
}

// Add a new Stripe account
export async function POST(req: NextRequest) {
  const { user } = await getCurrentSession();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, apiKey } = await req.json();

    if (!name || !apiKey) {
      return NextResponse.json(
        { error: 'Name and API key are required' },
        { status: 400 }
      );
    }

    const account = await addStripeAccount(user.id.toString(), name, apiKey);

    return NextResponse.json(account);
  } catch (error) {
    console.error('Error adding Stripe account:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to add Stripe account';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
