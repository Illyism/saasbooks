import { getAuthenticatedUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { DriveService } from '@/lib/drive';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get current user
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get drive config
    const driveConfig = await prisma.driveConfig.findUnique({
      where: { userId: user.id },
    });

    if (!driveConfig) {
      return NextResponse.json(
        { error: 'No Drive configuration found' },
        { status: 404 }
      );
    }

    // Verify folder
    const folderInfo = await DriveService.verifyUserFolder(user.id);

    if (!folderInfo.valid) {
      // Try to create a new SaaSBooks folder
      const driveService = await DriveService.forUser(user.id);

      if (!driveService) {
        return NextResponse.json(
          {
            error: 'Cannot create DriveService instance',
            driveConfig: {
              folderId: driveConfig.folderId,
              hasAccessToken: !!driveConfig.accessToken,
              hasRefreshToken: !!driveConfig.refreshToken,
            },
          },
          { status: 500 }
        );
      }

      // Create a new SaaSBooks folder
      const auth = driveService.getAuth();
      const newFolderId = await DriveService.createFolder(auth, 'SaaSBooks');

      // Update the drive config
      await prisma.driveConfig.update({
        where: { userId: user.id },
        data: { folderId: newFolderId },
      });

      // Create a new DriveService with the updated folder ID
      const updatedDriveService = new DriveService({
        credentials: {
          access_token: driveConfig.accessToken,
          refresh_token: driveConfig.refreshToken || undefined,
          expiry_date: driveConfig.expiryDate?.getTime(),
        },
        folderId: newFolderId,
      });

      // Add a README file
      await updatedDriveService.ensureReadmeExists();

      return NextResponse.json({
        message: 'Created new SaaSBooks folder and README file',
        oldFolderId: driveConfig.folderId,
        newFolderId,
      });
    }

    // Folder is valid, ensure README exists
    await DriveService.ensureUserReadmeExists(user.id);

    return NextResponse.json({
      message: 'Folder verified and README ensured',
      folderInfo,
    });
  } catch (error) {
    console.error('Error verifying drive folder:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
