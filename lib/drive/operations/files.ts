import type { drive_v3 } from 'googleapis';
import { Readable } from 'node:stream';
import type { DriveFile, FileUploadOptions } from '../types';

/**
 * Checks if a file exists in a specific folder
 */
export async function fileExists(
  drive: drive_v3.Drive,
  fileName: string,
  folderId: string
): Promise<boolean> {
  try {
    console.log(`Checking if ${fileName} exists in folder ${folderId}`);
    const response = await drive.files.list({
      q: `'${folderId}' in parents and name='${fileName}' and trashed=false`,
      fields: 'files(id)',
    });

    const exists = (response.data.files?.length || 0) > 0;
    console.log(`File ${fileName} ${exists ? 'exists' : 'does not exist'}`);
    return exists;
  } catch (error) {
    // If there's an auth error, log it but return false
    console.error(`Error checking if ${fileName} exists:`, error);
    return false;
  }
}

/**
 * Upload a file to Google Drive using streams
 */
export async function uploadFile(
  drive: drive_v3.Drive,
  file: Buffer,
  options: FileUploadOptions
): Promise<string> {
  const { name, mimeType, folderId } = options;

  try {
    console.log(`Uploading file ${name} to folder with ID: ${folderId}`);

    // First try with the stream approach
    try {
      // Convert Buffer to a Readable stream
      const fileStream = new Readable();
      fileStream.push(file);
      fileStream.push(null); // Signal the end of the stream

      const response = await drive.files.create({
        requestBody: {
          name,
          parents: [folderId as string],
        },
        media: {
          mimeType,
          body: fileStream,
        },
        fields: 'id',
      });

      console.log(
        `File ${name} uploaded successfully with ID: ${response.data.id}`
      );
      return response.data.id as string;
    } catch (error) {
      // If stream approach fails, try alternative method
      if (
        error instanceof Error &&
        (error.message.includes('pipe is not a function') ||
          error.message.includes('body.pipe is not a function'))
      ) {
        console.log('Stream upload failed, trying alternative method');
        return uploadFileAlternative(drive, file, options);
      }
      throw error;
    }
  } catch (error) {
    console.error(`Error uploading file ${name}:`, error);
    throw error;
  }
}

/**
 * Alternative upload method that doesn't use streams
 * This is useful for environments where streams might not be fully supported
 */
export async function uploadFileAlternative(
  drive: drive_v3.Drive,
  file: Buffer,
  options: FileUploadOptions
): Promise<string> {
  const { name, mimeType, folderId } = options;

  try {
    console.log(
      `Using alternative upload method for file: ${name} to folder with ID: ${folderId}`
    );

    // Convert the buffer to base64
    const base64Data = file.toString('base64');

    // Create a multipart request
    const boundary = '-------314159265358979323846';
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;

    // Create the multipart request body
    const multipartRequestBody = `${delimiter}Content-Type: application/json\r\n\r\n${JSON.stringify(
      {
        name: name,
        parents: [folderId as string],
      }
    )}${delimiter}Content-Type: ${mimeType}\r\nContent-Transfer-Encoding: base64\r\n\r\n${base64Data}${closeDelimiter}`;

    // Make the request
    const response = await drive.files.create({
      requestBody: {
        name,
        parents: [folderId as string],
      },
      media: {
        mimeType: `multipart/related; boundary=${boundary}`,
        body: multipartRequestBody,
      },
      fields: 'id',
    });

    console.log(
      `File ${name} uploaded successfully with ID: ${response.data.id} (alternative method)`
    );
    return response.data.id as string;
  } catch (error) {
    console.error(`Error uploading file ${name} (alternative method):`, error);
    throw error;
  }
}

/**
 * List files in a folder
 */
export async function listFiles(
  drive: drive_v3.Drive,
  folderId: string,
  pageSize = 100
): Promise<DriveFile[]> {
  try {
    console.log(`Listing files in folder ${folderId}`);
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      pageSize,
      fields: 'files(id, name, mimeType, size, createdTime, modifiedTime)',
    });

    return (response.data.files || []) as DriveFile[];
  } catch (error) {
    console.error(`Error listing files in folder ${folderId}:`, error);
    throw error;
  }
}

/**
 * Get a file by ID
 */
export async function getFile(
  drive: drive_v3.Drive,
  fileId: string
): Promise<DriveFile> {
  try {
    console.log(`Getting file with ID ${fileId}`);
    const response = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType, size, createdTime, modifiedTime',
    });

    return response.data as DriveFile;
  } catch (error) {
    console.error(`Error getting file with ID ${fileId}:`, error);
    throw error;
  }
}

/**
 * Delete a file by ID
 */
export async function deleteFile(
  drive: drive_v3.Drive,
  fileId: string
): Promise<void> {
  try {
    console.log(`Deleting file with ID ${fileId}`);
    await drive.files.delete({
      fileId,
    });

    console.log(`File with ID ${fileId} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting file with ID ${fileId}:`, error);
    throw error;
  }
}
