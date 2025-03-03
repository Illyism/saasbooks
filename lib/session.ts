import { prisma } from "./db";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

import type { User, Session } from "@prisma/client";

/**
 * Generates a secure random session token
 */
export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

/**
 * Creates a new session for a user
 * @param token The session token
 * @param userId The user ID
 */
export async function createSession(token: string, userId: number): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    createdAt: new Date(),
  };
  
  await prisma.session.create({
    data: session
  });
  
  return session;
}

/**
 * Validates a session token
 * @param token The session token to validate
 */
export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  if (!token) {
    return { session: null, user: null };
  }

  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await prisma.session.findUnique({
    where: {
      id: sessionId
    },
    include: {
      user: true
    }
  });
  
  if (result === null) {
    return { session: null, user: null };
  }
  
  const { user, ...session } = result;
  
  // Check if session has expired
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }
  
  // Extend session if it's close to expiring (less than 15 days left)
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await prisma.session.update({
      where: {
        id: session.id
      },
      data: {
        expiresAt: session.expiresAt
      }
    });
  }
  
  return { session, user };
}

/**
 * Invalidates a session by its ID
 * @param sessionId The session ID to invalidate
 */
export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.session.delete({ where: { id: sessionId } });
}

/**
 * Invalidates all sessions for a user
 * @param userId The user ID whose sessions to invalidate
 */
export async function invalidateAllSessions(userId: number): Promise<void> {
  await prisma.session.deleteMany({
    where: {
      userId: userId
    }
  });
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null }; 