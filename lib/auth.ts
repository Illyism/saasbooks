import type { User } from '@prisma/client';
import { getSessionTokenCookie } from './cookies';
import { validateSessionToken } from './session';

/**
 * Get the authenticated user from the session cookie
 * @returns The authenticated user or null
 */
export async function getAuthenticatedUser(): Promise<User | null> {
  const token = await getSessionTokenCookie();
  
  if (!token) {
    return null;
  }
  
  const { user } = await validateSessionToken(token);
  return user;
}

/**
 * Check if the current request has an authenticated user
 * @returns True if authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getAuthenticatedUser();
  return user !== null;
} 