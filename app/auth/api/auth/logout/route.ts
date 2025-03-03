import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
} from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Get the current session using our consolidated auth system
    const { session } = await getCurrentSession();

    // If session exists, invalidate it
    if (session) {
      await invalidateSession(session.id);
    }

    // Always delete the cookie
    await deleteSessionTokenCookie();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
