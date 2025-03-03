/**
 * OAuth2 credentials structure
 */
export interface OAuth2Credentials {
  access_token: string;
  refresh_token?: string;
  expiry_date?: number;
}

/**
 * Google credentials structure
 */
export interface GoogleCredentials {
  access_token: string;
  refresh_token?: string;
  expiry_date?: number;
}

/**
 * File upload options
 */
export interface FileUploadOptions {
  name: string;
  mimeType: string;
  folderId?: string;
}

/**
 * Folder verification result
 */
export interface FolderVerificationResult {
  valid: boolean;
  folderId?: string;
  folderName?: string;
}

/**
 * Drive service options
 */
export interface DriveServiceOptions {
  credentials: GoogleCredentials;
  folderId: string;
}

/**
 * Drive file metadata
 */
export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
}
