import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import {
  updateStripeAccount,
  deleteStripeAccount,
} from '@/lib/stripe/api/service';

// Update a Stripe account
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user } = await getCurrentSession();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const { id } = params;

    const account = await updateStripeAccount(id, user.id.toString(), data);

    return NextResponse.json(account);
  } catch (error) {
    console.error('Error updating Stripe account:', error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Failed to update Stripe account';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Delete a Stripe account
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user } = await getCurrentSession();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;

    await deleteStripeAccount(id, user.id.toString());

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting Stripe account:', error);
    return NextResponse.json(
      { error: 'Failed to delete Stripe account' },
      { status: 500 }
    );
  }
}
