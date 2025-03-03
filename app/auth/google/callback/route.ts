import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from '@/lib/auth';
import { prisma } from '@/lib/db';
import { DriveService } from '@/lib/drive';
import { exchangeCodeForTokens, getUserInfo } from '@/lib/google-auth';
import { google as googleApis } from 'googleapis';
import { cookies } from 'next/headers';

export async function GET(request: Request): Promise<Response> {
  try {
    console.log('Google OAuth callback initiated');

    // Extract URL from request
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!code) {
      console.error('No code parameter in callback');
      return new Response(null, { status: 400 });
    }

    // Get stored state and code verifier from cookies
    const cookieStore = await cookies();
    const storedState = cookieStore.get('google_oauth_state')?.value;
    const codeVerifier = cookieStore.get('google_code_verifier')?.value;

    // Verify state to prevent CSRF
    if (!storedState || !state || storedState !== state) {
      console.error('State mismatch in callback', {
        storedState,
        receivedState: state,
      });
      return new Response(null, { status: 400 });
    }

    if (!codeVerifier) {
      console.error('No code verifier in cookies');
      return new Response(null, { status: 400 });
    }

    console.log('Exchanging authorization code for tokens');

    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code, codeVerifier);

    // Clean up cookies
    cookieStore.delete('google_oauth_state');
    cookieStore.delete('google_code_verifier');

    console.log(
      `Obtained Google tokens - Access: ${!!tokens.access_token}, Refresh: ${!!tokens.refresh_token}`
    );

    if (!tokens.refresh_token) {
      console.warn(
        'No refresh token received from Google. User may need to revoke app access and re-authenticate.'
      );
    }

    // Get user info
    console.log('Fetching user info with access token');
    const userInfo = await getUserInfo(tokens.access_token);

    // Extract user information
    const googleId = userInfo.id;
    const email = userInfo.email;
    const name = userInfo.name;
    const image = userInfo.picture;

    if (!googleId || !email) {
      console.error('Missing required user information:', { googleId, email });
      return new Response(null, { status: 400 });
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { googleId },
    });

    console.log('User lookup by Google ID:', user ? 'Found' : 'Not found');

    if (!user) {
      // Try to find by email as fallback
      user = await prisma.user.findUnique({
        where: { email },
      });

      console.log('User lookup by email:', user ? 'Found' : 'Not found');
    }

    if (!user) {
      console.log('Creating new user with Google ID:', googleId);
      user = await prisma.user.create({
        data: {
          googleId,
          email,
          name: name || email.split('@')[0],
          image,
        },
      });
    }

    // Create DriveConfig if it doesn't exist
    const driveConfig = await prisma.driveConfig.findUnique({
      where: { userId: user.id },
    });

    // Get token strings
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token || null;

    // Log token information without exposing the actual tokens
    console.log(
      `Obtained Google tokens - Access: ${!!accessToken}, Refresh: ${!!refreshToken}`
    );

    if (!refreshToken) {
      console.warn(
        'No refresh token received from Google. User may need to revoke app access and re-authenticate.'
      );
    }

    // Create date object from expiry timestamp
    const expiryDate = tokens.expiry_date
      ? new Date(tokens.expiry_date)
      : new Date(Date.now() + 3600 * 1000);

    if (driveConfig) {
      // Update existing DriveConfig with new tokens
      console.log('Updating existing Drive configuration for user:', user.id);

      await prisma.driveConfig.update({
        where: { userId: user.id },
        data: {
          accessToken,
          ...(refreshToken ? { refreshToken } : {}), // Only update refresh token if we got a new one
          expiryDate,
        },
      });
    } else {
      // Create a new DriveConfig
      console.log('Creating new Drive configuration for user:', user.id);

      // Create an OAuth2 client with the provided credentials
      const auth = new googleApis.auth.OAuth2();
      auth.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken || undefined,
        expiry_date: expiryDate.getTime(),
      });

      // Create a dedicated SaaSBooks folder
      console.log('Creating SaaSBooks folder in Drive');
      const folderId = await DriveService.createFolder(auth, 'SaaSBooks');

      // Create drive configuration
      await prisma.driveConfig.create({
        data: {
          userId: user.id,
          folderId,
          accessToken,
          refreshToken,
          expiryDate,
        },
      });

      // Initialize a DriveService with the new folder
      const driveService = new DriveService({
        credentials: {
          access_token: accessToken,
          refresh_token: refreshToken || undefined,
          expiry_date: expiryDate.getTime(),
        },
        folderId,
      });

      // Add a README file
      console.log('Adding README.md file to SaaSBooks folder');
      try {
        const readmeContent = `# SaaSBooks

Welcome to SaaSBooks - Your SaaS business financial management platform.

This folder contains files and data related to your SaaSBooks account.
        `;

        const contentBuffer = Buffer.from(readmeContent);
        console.log(
          `README content buffer created, size: ${contentBuffer.length} bytes`
        );

        await driveService.uploadFile(
          contentBuffer,
          'README.md',
          'text/markdown'
        );
        console.log('README.md file successfully uploaded to Google Drive');
      } catch (error) {
        console.error('Error creating README.md file:', error);
        // Continue with authentication even if README creation fails
      }
    }

    // Create session and set cookie
    const sessionToken = await generateSessionToken();
    console.log('Google callback: Generated session token:', sessionToken);

    const session = await createSession(sessionToken, user.id);
    console.log(
      'Google callback: Created session with ID:',
      session.id,
      'for user:',
      user.id
    );

    await setSessionTokenCookie(sessionToken);
    console.log('Google callback: Set session token cookie');

    // Redirect to dashboard
    return new Response(null, {
      status: 302,
      headers: { Location: '/app/dashboard' },
    });
  } catch (error) {
    console.error('Unhandled error in Google callback:', error);
    return new Response(null, { status: 500 });
  }
}
