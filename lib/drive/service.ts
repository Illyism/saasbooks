import type { Auth, drive_v3 } from 'googleapis';
import { createDriveClient, createOAuth2Client } from './client';
import {
  deleteFile,
  fileExists,
  getFile,
  listFiles,
  uploadFile,
  uploadFileAlternative,
} from './operations/files';
import {
  createFolder,
  findFolderByName,
  findOrCreateFolder,
  verifyFolder,
} from './operations/folders';
import type {
  DriveFile,
  DriveServiceOptions,
  FolderVerificationResult,
} from './types';
import { getUserCredentials, updateRefreshToken } from './utils/auth';

/**
 * DriveService class for interacting with Google Drive
 */
export class DriveService {
  private drive: drive_v3.Drive;
  private folderId: string;
  private auth: Auth.OAuth2Client;

  /**
   * Create a new DriveService instance
   */
  constructor(options: DriveServiceOptions) {
    const { credentials, folderId } = options;

    // Create OAuth2 client
    this.auth = createOAuth2Client(credentials);

    // Create Drive client
    this.drive = createDriveClient(this.auth);

    // Set folder ID
    this.folderId = folderId;
  }

  /**
   * Get the OAuth2 client
   */
  getAuth(): Auth.OAuth2Client {
    return this.auth;
  }

  /**
   * Check if a file exists in the folder
   */
  async fileExists(fileName: string): Promise<boolean> {
    return fileExists(this.drive, fileName, this.folderId);
  }

  /**
   * Upload a file to the folder
   */
  async uploadFile(
    file: Buffer,
    name: string,
    mimeType: string
  ): Promise<string> {
    return uploadFile(this.drive, file, {
      name,
      mimeType,
      folderId: this.folderId,
    });
  }

  /**
   * Upload a file using the alternative method
   */
  async uploadFileAlternative(
    file: Buffer,
    name: string,
    mimeType: string
  ): Promise<string> {
    return uploadFileAlternative(this.drive, file, {
      name,
      mimeType,
      folderId: this.folderId,
    });
  }

  /**
   * List files in the folder
   */
  async listFiles(pageSize = 100): Promise<DriveFile[]> {
    return listFiles(this.drive, this.folderId, pageSize);
  }

  /**
   * Get a file by ID
   */
  async getFile(fileId: string): Promise<DriveFile> {
    return getFile(this.drive, fileId);
  }

  /**
   * Delete a file by ID
   */
  async deleteFile(fileId: string): Promise<void> {
    return deleteFile(this.drive, fileId);
  }

  /**
   * Verify that the folder exists and is accessible
   */
  async verifyFolder(): Promise<FolderVerificationResult> {
    return verifyFolder(this.drive, this.folderId);
  }

  /**
   * Ensure a README file exists in the folder
   */
  async ensureReadmeExists(): Promise<void> {
    try {
      console.log('Checking if README.md exists in SaaSBooks folder');

      // Verify folder ID first
      const isValidFolder = await this.verifyFolder();
      if (!isValidFolder.valid) {
        console.error(
          'Invalid folder ID or folder not accessible:',
          this.folderId
        );
        return;
      }

      // Check if README.md already exists
      const exists = await this.fileExists('README.md');

      if (exists) {
        console.log('README.md already exists in SaaSBooks folder');
        return;
      }

      console.log('README.md not found, creating it');

      // Create README content
      const readmeContent = `# SaaSBooks

Welcome to SaaSBooks - Your SaaS business financial management platform.

This folder contains files and data related to your SaaSBooks account.
      `;

      // Upload README file
      const contentBuffer = Buffer.from(readmeContent);
      await this.uploadFile(contentBuffer, 'README.md', 'text/markdown');

      console.log('README.md file successfully created in SaaSBooks folder');
    } catch (error) {
      console.error(
        'Cannot access SaaSBooks folder, may be authentication issue:',
        error
      );

      // Check if this is a refresh token issue
      if (
        error instanceof Error &&
        error.message.includes('No refresh token')
      ) {
        console.warn(
          'This appears to be a refresh token issue. User needs to re-authenticate with Google.'
        );
      }
    }
  }

  /**
   * Create a DriveService instance for a user
   */
  static async forUser(userId: number): Promise<DriveService | null> {
    try {
      // Get credentials for the user
      const result = await getUserCredentials(userId);

      if (!result) {
        return null;
      }

      // Create DriveService instance
      return new DriveService({
        credentials: result.credentials,
        folderId: result.folderId,
      });
    } catch (error) {
      console.error(`Error creating DriveService for user ${userId}:`, error);
      return null;
    }
  }

  /**
   * Create a folder in Google Drive
   */
  static async createFolder(
    auth: Auth.OAuth2Client,
    name: string,
    parentId = 'root'
  ): Promise<string> {
    const drive = createDriveClient(auth);
    return createFolder(drive, name, parentId);
  }

  /**
   * Find a folder by name
   */
  static async findFolderByName(
    auth: Auth.OAuth2Client,
    name: string,
    parentId = 'root'
  ): Promise<string | null> {
    const drive = createDriveClient(auth);
    return findFolderByName(drive, name, parentId);
  }

  /**
   * Find or create a folder by name
   */
  static async findOrCreateFolder(
    auth: Auth.OAuth2Client,
    name: string,
    parentId = 'root'
  ): Promise<string> {
    const drive = createDriveClient(auth);
    return findOrCreateFolder(drive, name, parentId);
  }

  /**
   * Ensure a README file exists for a user
   */
  static async ensureUserReadmeExists(userId: number): Promise<boolean> {
    try {
      // Get DriveService instance for user
      const driveService = await DriveService.forUser(userId);

      // If no drive service, user hasn't set up Google Drive yet
      if (!driveService) {
        console.log('No Drive configuration found for user:', userId);
        return false;
      }

      // Ensure README exists
      await driveService.ensureReadmeExists();
      return true;
    } catch (error) {
      console.error('Error ensuring README exists for user:', userId, error);

      // Check if this is a refresh token issue
      if (
        error instanceof Error &&
        error.message.includes('No refresh token')
      ) {
        console.warn(
          'This appears to be a refresh token issue. User needs to re-authenticate with Google.'
        );
      }

      return false;
    }
  }

  /**
   * Update a user's refresh token
   */
  static async updateRefreshToken(
    userId: number,
    refreshToken: string
  ): Promise<boolean> {
    return updateRefreshToken(userId, refreshToken);
  }

  /**
   * Verify a user's folder
   */
  static async verifyUserFolder(
    userId: number
  ): Promise<FolderVerificationResult> {
    try {
      // Get DriveService instance for user
      const driveService = await DriveService.forUser(userId);

      // If no drive service, user hasn't set up Google Drive yet
      if (!driveService) {
        console.log('No Drive configuration found for user:', userId);
        return { valid: false };
      }

      // Verify folder
      return driveService.verifyFolder();
    } catch (error) {
      console.error('Error verifying folder for user:', userId, error);
      return { valid: false };
    }
  }
}
