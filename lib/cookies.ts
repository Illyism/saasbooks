'use server';

import { cookies } from 'next/headers';

/**
 * Sets a session token in the cookies
 * @param token The session token to set
 */
export async function setSessionTokenCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'session',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    // 30 days in seconds
    maxAge: 30 * 24 * 60 * 60
  });
}

/**
 * Gets the session token from cookies
 */
export async function getSessionTokenCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session');
  return cookie?.value;
}

/**
 * Removes the session token cookie
 */
export async function removeSessionTokenCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('session');
} 