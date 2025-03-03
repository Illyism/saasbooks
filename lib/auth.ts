import { prisma } from '@/lib/db';
import { sha256 } from '@oslojs/crypto/sha2';
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding';
import type { Session, User } from '@prisma/client';
import { cookies } from 'next/headers';

/**
 * Session handling
 */

// Generate a secure session token
export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
}

// Create a new session
export async function createSession(
  token: string,
  userId: number
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

  const session = await prisma.session.create({
    data: {
      id: sessionId,
      userId,
      expiresAt,
      createdAt: new Date(),
    },
  });

  return session;
}

// Validate a session token
export async function validateSessionToken(
  token: string
): Promise<{ session: Session | null; user: User | null }> {
  if (!token) {
    console.log('validateSessionToken: No token provided');
    return { session: null, user: null };
  }

  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  console.log('validateSessionToken: Looking for session with ID:', sessionId);

  const result = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (result === null) {
    console.log('validateSessionToken: No session found with ID:', sessionId);
    return { session: null, user: null };
  }

  const { user, ...session } = result;
  console.log('validateSessionToken: Session found for user:', user.id);

  // Check if session has expired
  if (Date.now() >= session.expiresAt.getTime()) {
    console.log('validateSessionToken: Session has expired, deleting');
    await prisma.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }

  // Extend session if it's close to expiring (less than 15 days left)
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    console.log('validateSessionToken: Extending session expiry');
    await prisma.session.update({
      where: { id: session.id },
      data: { expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) },
    });
  }

  return { session, user };
}

// Invalidate a session
export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.session.delete({ where: { id: sessionId } });
}

/**
 * Cookie handling
 */

// Set a session token cookie
export async function setSessionTokenCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  console.log(`Setting session token cookie: ${token.substring(0, 5)}...`);

  cookieStore.set({
    name: 'session_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  });
}

// Get the session token from cookies
export async function getSessionTokenCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session_token');

  console.log(
    `Getting session token cookie: ${cookie?.value ? `${cookie.value.substring(0, 5)}...` : 'Not found'}`
  );

  return cookie?.value;
}

// Remove the session token cookie
export async function deleteSessionTokenCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('session_token');
}

/**
 * User authentication
 */

// Get the authenticated user from the session cookie
export async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const token = await getSessionTokenCookie();

    console.log(
      'getAuthenticatedUser: Session token from cookie:',
      token ? 'Found' : 'Not found'
    );

    if (!token) {
      return null;
    }

    const { user } = await validateSessionToken(token);
    console.log(
      'getAuthenticatedUser: User from validation:',
      user ? `Found (id: ${user.id})` : 'Not found'
    );
    return user;
  } catch (error) {
    console.error('Error getting authenticated user:', error);
    return null;
  }
}

// Check if the current request has an authenticated user
export async function isAuthenticated(): Promise<boolean> {
  const user = await getAuthenticatedUser();
  return user !== null;
}

// Get the current session
export async function getCurrentSession() {
  try {
    const token = await getSessionTokenCookie();

    if (!token) {
      return { user: null, session: null };
    }

    const result = await validateSessionToken(token);
    return result;
  } catch (error) {
    console.error('Error getting current session:', error);
    return { user: null, session: null };
  }
}
