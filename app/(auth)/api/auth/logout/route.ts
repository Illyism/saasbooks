import { NextResponse } from 'next/server';
import { getSessionTokenCookie, removeSessionTokenCookie } from '@/lib/cookies';
import { validateSessionToken, invalidateSession } from '@/lib/session';

export async function POST() {
  try {
    const token = await getSessionTokenCookie();
    
    if (token) {
      const { session } = await validateSessionToken(token);
      
      if (session) {
        await invalidateSession(session.id);
      }
      
      await removeSessionTokenCookie();
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 