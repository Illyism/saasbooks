import type { Auth } from 'googleapis';
import { google } from 'googleapis';
import type { GoogleCredentials, OAuth2Credentials } from './types';

/**
 * Creates and configures a Google OAuth2 client
 */
export function createOAuth2Client(
  credentials: GoogleCredentials
): Auth.OAuth2Client {
  // Create an OAuth2 client
  const auth = new google.auth.OAuth2();

  // Prepare credentials object
  const authCredentials: OAuth2Credentials = {
    access_token: credentials.access_token,
  };

  // Only add refresh_token if it exists
  if (credentials.refresh_token) {
    authCredentials.refresh_token = credentials.refresh_token;
  }

  // Only add expiry_date if it exists
  if (credentials.expiry_date) {
    authCredentials.expiry_date = credentials.expiry_date;
  }

  // If no refresh token is available, extend the expiry date by 1 hour
  // This helps prevent immediate expiration errors
  if (!authCredentials.refresh_token && !authCredentials.expiry_date) {
    authCredentials.expiry_date = Date.now() + 3600 * 1000; // 1 hour
  }

  // Set the credentials on the OAuth2 client
  auth.setCredentials(authCredentials);

  return auth;
}

/**
 * Creates a Google Drive API client
 */
export function createDriveClient(auth: Auth.OAuth2Client) {
  return google.drive({ version: 'v3', auth });
}
