import {
  createAuthorizationURL,
  generateCodeVerifier,
  generateState,
} from '@/lib/google-auth';
import { cookies } from 'next/headers';

export async function GET(): Promise<Response> {
  try {
    // Generate security tokens for OAuth flow
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    console.log('Starting Google OAuth flow with new state', {
      stateLength: state.length,
      verifierLength: codeVerifier.length,
    });

    // Create the authorization URL with necessary scopes
    const url = createAuthorizationURL(state, codeVerifier, [
      'openid',
      'profile',
      'email',
      'https://www.googleapis.com/auth/drive.file',
    ]);

    // Add parameters to request offline access (refresh token)
    url.searchParams.set('access_type', 'offline');
    url.searchParams.set('prompt', 'consent');

    console.log('Google OAuth URL with access_type=offline:', url.toString());

    // Must await cookies()
    const cookieStore = await cookies();

    // Set the OAuth state cookie
    cookieStore.set('google_oauth_state', state, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 10, // 10 minutes
      sameSite: 'lax',
    });

    // Set the code verifier cookie
    cookieStore.set('google_code_verifier', codeVerifier, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 10, // 10 minutes
      sameSite: 'lax',
    });

    console.log('Redirecting to Google OAuth:', url.toString());

    return new Response(null, {
      status: 302,
      headers: {
        Location: url.toString(),
      },
    });
  } catch (error) {
    console.error('Error initiating Google OAuth:', error);
    return new Response(null, { status: 500 });
  }
}
