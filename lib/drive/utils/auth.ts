import { prisma } from '@/lib/db';
import type { Auth } from 'googleapis';
import { createOAuth2Client } from '../client';
import type { GoogleCredentials } from '../types';

/**
 * Update a user's refresh token
 */
export async function updateRefreshToken(
  userId: number,
  refreshToken: string
): Promise<boolean> {
  try {
    console.log(`Updating refresh token for user ${userId}`);

    // Check if the user has a drive config
    const driveConfig = await prisma.driveConfig.findUnique({
      where: { userId },
    });

    if (!driveConfig) {
      console.error(`No drive configuration found for user ${userId}`);
      return false;
    }

    // Update the refresh token
    await prisma.driveConfig.update({
      where: { userId },
      data: { refreshToken },
    });

    console.log(`Refresh token updated for user ${userId}`);
    return true;
  } catch (error) {
    console.error(`Error updating refresh token for user ${userId}:`, error);
    return false;
  }
}

/**
 * Get credentials for a user
 */
export async function getUserCredentials(
  userId: number
): Promise<{ credentials: GoogleCredentials; folderId: string } | null> {
  try {
    // Get the drive config for the user
    const driveConfig = await prisma.driveConfig.findUnique({
      where: { userId },
    });

    if (!driveConfig) {
      console.error(`No drive configuration found for user ${userId}`);
      return null;
    }

    // Create credentials object
    const credentials: GoogleCredentials = {
      access_token: driveConfig.accessToken,
      ...(driveConfig.refreshToken
        ? { refresh_token: driveConfig.refreshToken }
        : {}),
      ...(driveConfig.expiryDate
        ? { expiry_date: driveConfig.expiryDate.getTime() }
        : {}),
    };

    return {
      credentials,
      folderId: driveConfig.folderId,
    };
  } catch (error) {
    console.error(`Error getting credentials for user ${userId}:`, error);
    return null;
  }
}

/**
 * Create an OAuth2 client for a user
 */
export async function createUserOAuth2Client(
  userId: number
): Promise<{ auth: Auth.OAuth2Client; folderId: string } | null> {
  try {
    // Get credentials for the user
    const result = await getUserCredentials(userId);

    if (!result) {
      return null;
    }

    // Create OAuth2 client
    const auth = createOAuth2Client(result.credentials);

    return {
      auth,
      folderId: result.folderId,
    };
  } catch (error) {
    console.error(`Error creating OAuth2 client for user ${userId}:`, error);
    return null;
  }
}
