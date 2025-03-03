// Export the main DriveService class
export { DriveService } from './service';

// Export types
export type {
  DriveFile,
  DriveServiceOptions,
  FileUploadOptions,
  FolderVerificationResult,
  GoogleCredentials,
  OAuth2Credentials,
} from './types';

// Export utility functions
export {
  DriveError,
  formatError,
  isAuthError,
  isNetworkError,
  isRateLimitError,
} from './utils/error';

// Export client functions
export { createDriveClient, createOAuth2Client } from './client';

// Export file operations
export {
  deleteFile,
  fileExists,
  getFile,
  listFiles,
  uploadFile,
  uploadFileAlternative,
} from './operations/files';

// Export folder operations
export {
  createFolder,
  findFolderByName,
  findOrCreateFolder,
  verifyFolder,
} from './operations/folders';
