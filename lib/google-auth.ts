import { google } from 'googleapis';
import crypto from 'node:crypto';

/**
 * Google OAuth2 client configuration
 */
export interface GoogleCredentials {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  token_type?: string;
  expires_in?: number;
  expiry_date?: number;
  scope?: string;
  granted_scopes?: string[];
}

export interface GoogleUserInfo {
  id: string;
  email: string;
  name?: string;
  picture?: string;
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || '';

// Initialize the OAuth2 client
export const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

// Generate a random state for CSRF protection
export function generateState(): string {
  return crypto.randomBytes(16).toString('hex');
}

// Generate a random code verifier for PKCE
export function generateCodeVerifier(): string {
  return crypto.randomBytes(32).toString('base64url');
}

// Generate code challenge from verifier for PKCE
export function generateCodeChallenge(verifier: string): string {
  const hash = crypto.createHash('sha256').update(verifier).digest();
  return Buffer.from(hash).toString('base64url');
}

// Create the authorization URL
export function createAuthorizationURL(
  state: string,
  codeVerifier: string,
  scopes: string[] = []
): URL {
  const codeChallenge = generateCodeChallenge(codeVerifier);

  // Create the URL with all required parameters
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');

  // Add required parameters
  url.searchParams.set('client_id', GOOGLE_CLIENT_ID);
  url.searchParams.set('redirect_uri', GOOGLE_REDIRECT_URI);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('access_type', 'offline');
  url.searchParams.set('prompt', 'consent');
  url.searchParams.set('state', state);
  url.searchParams.set('code_challenge', codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');
  url.searchParams.set('include_granted_scopes', 'true');

  // Add scopes
  if (scopes.length > 0) {
    url.searchParams.set('scope', scopes.join(' '));
  }

  return url;
}

// Exchange authorization code for tokens
export async function exchangeCodeForTokens(
  code: string,
  codeVerifier: string
): Promise<GoogleCredentials> {
  try {
    // Prepare token request
    const tokenEndpoint = 'https://oauth2.googleapis.com/token';
    const params = new URLSearchParams();
    params.set('client_id', GOOGLE_CLIENT_ID);
    params.set('client_secret', GOOGLE_CLIENT_SECRET);
    params.set('code', code);
    params.set('code_verifier', codeVerifier);
    params.set('grant_type', 'authorization_code');
    params.set('redirect_uri', GOOGLE_REDIRECT_URI);

    // Exchange code for tokens
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Token exchange error:', errorData);
      throw new Error(
        `Token exchange failed: ${response.status} ${response.statusText}`
      );
    }

    // Parse response
    const tokens = await response.json();

    // Create credentials object
    const credentials: GoogleCredentials = {
      access_token: tokens.access_token,
    };

    // Add optional fields
    if (tokens.refresh_token) credentials.refresh_token = tokens.refresh_token;
    if (tokens.id_token) credentials.id_token = tokens.id_token;
    if (tokens.token_type) credentials.token_type = tokens.token_type;
    if (tokens.expires_in) {
      credentials.expires_in = tokens.expires_in;
      credentials.expiry_date = Date.now() + tokens.expires_in * 1000;
    }

    // Parse scope
    if (tokens.scope) {
      credentials.scope = tokens.scope;
      credentials.granted_scopes = tokens.scope.split(' ');
    }

    return credentials;
  } catch (error) {
    console.error('Token exchange error:', error);
    throw new Error(
      `Token exchange failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// Refresh access token using a refresh token
export async function refreshAccessToken(
  refreshToken: string
): Promise<GoogleCredentials> {
  try {
    // Prepare refresh token request
    const tokenEndpoint = 'https://oauth2.googleapis.com/token';
    const params = new URLSearchParams();
    params.set('client_id', GOOGLE_CLIENT_ID);
    params.set('client_secret', GOOGLE_CLIENT_SECRET);
    params.set('refresh_token', refreshToken);
    params.set('grant_type', 'refresh_token');

    // Request new access token
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      // Check for specific error types
      if (errorData?.error === 'invalid_grant') {
        if (errorData?.error_description?.includes('invalid_rapt')) {
          throw new Error(
            'Session expired due to organization policy. User needs to re-authenticate.'
          );
        }
        throw new Error(
          'Refresh token is no longer valid. User needs to re-authenticate.'
        );
      }

      console.error('Token refresh error:', errorData);
      throw new Error(
        `Token refresh failed: ${response.status} ${response.statusText}`
      );
    }

    // Parse response
    const tokens = await response.json();

    // Create credentials object
    const credentials: GoogleCredentials = {
      access_token: tokens.access_token,
      refresh_token: refreshToken, // Keep original refresh token
    };

    // Add optional fields
    if (tokens.id_token) credentials.id_token = tokens.id_token;
    if (tokens.token_type) credentials.token_type = tokens.token_type;
    if (tokens.expires_in) {
      credentials.expires_in = tokens.expires_in;
      credentials.expiry_date = Date.now() + tokens.expires_in * 1000;
    }

    // Parse scope
    if (tokens.scope) {
      credentials.scope = tokens.scope;
      credentials.granted_scopes = tokens.scope.split(' ');
    }

    return credentials;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw new Error(
      `Token refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// Get user info from Google using access token
export async function getUserInfo(
  accessToken: string
): Promise<GoogleUserInfo> {
  try {
    // Request user info
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to get user info: ${response.status} ${response.statusText}`
      );
    }

    // Parse response
    const data = await response.json();

    // Validate required fields
    if (!data.sub || !data.email) {
      throw new Error('Missing required user information from Google');
    }

    // Return user info
    return {
      id: data.sub,
      email: data.email,
      name: data.name || undefined,
      picture: data.picture || undefined,
    };
  } catch (error) {
    console.error('Failed to get user info:', error);
    throw new Error(
      `Failed to get user info: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
