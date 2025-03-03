import type { drive_v3 } from 'googleapis';
import type { FolderVerificationResult } from '../types';

/**
 * Create a folder in Google Drive
 */
export async function createFolder(
  drive: drive_v3.Drive,
  name: string,
  parentId = 'root'
): Promise<string> {
  try {
    console.log(`Creating folder "${name}" in parent folder ${parentId}`);
    const response = await drive.files.create({
      requestBody: {
        name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentId],
      },
      fields: 'id',
    });

    console.log(`Folder "${name}" created with ID: ${response.data.id}`);
    return response.data.id as string;
  } catch (error) {
    console.error(`Error creating folder "${name}":`, error);
    throw error;
  }
}

/**
 * Verify that a folder exists and is accessible
 */
export async function verifyFolder(
  drive: drive_v3.Drive,
  folderId: string
): Promise<FolderVerificationResult> {
  try {
    console.log(`Verifying folder ID: ${folderId}`);
    const response = await drive.files.get({
      fileId: folderId,
      fields: 'id,name,mimeType',
    });

    const isFolder =
      response.data.mimeType === 'application/vnd.google-apps.folder';
    console.log(
      `Folder verification: ${isFolder ? 'Valid folder' : 'Not a folder'}, Name: ${response.data.name}`
    );

    return {
      valid: isFolder,
      folderId: response.data.id as string,
      folderName: response.data.name as string,
    };
  } catch (error) {
    console.error(`Error verifying folder ID ${folderId}:`, error);
    return { valid: false };
  }
}

/**
 * Find a folder by name in a parent folder
 */
export async function findFolderByName(
  drive: drive_v3.Drive,
  name: string,
  parentId = 'root'
): Promise<string | null> {
  try {
    console.log(`Looking for folder "${name}" in parent folder ${parentId}`);
    const response = await drive.files.list({
      q: `'${parentId}' in parents and name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name)',
    });

    if (response.data.files && response.data.files.length > 0) {
      console.log(
        `Found folder "${name}" with ID: ${response.data.files[0].id}`
      );
      return response.data.files[0].id as string;
    }

    console.log(`Folder "${name}" not found in parent folder ${parentId}`);
    return null;
  } catch (error) {
    console.error(`Error finding folder "${name}":`, error);
    return null;
  }
}

/**
 * Find or create a folder by name
 */
export async function findOrCreateFolder(
  drive: drive_v3.Drive,
  name: string,
  parentId = 'root'
): Promise<string> {
  // First try to find the folder
  const existingFolderId = await findFolderByName(drive, name, parentId);

  if (existingFolderId) {
    return existingFolderId;
  }

  // If not found, create it
  return createFolder(drive, name, parentId);
}
