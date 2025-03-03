# Google Drive Integration

This module provides a modular, type-safe integration with Google Drive for SaaSBooks.

## Directory Structure

```
lib/drive/
├── README.md           # This file
├── index.ts            # Main exports
├── types.ts            # Type definitions
├── client.ts           # Google Drive client setup
├── service.ts          # Main DriveService class
├── operations/         # File and folder operations
│   ├── files.ts        # File operations (upload, download, list)
│   └── folders.ts      # Folder operations (create, verify)
└── utils/              # Utility functions
    ├── auth.ts         # Authentication utilities
    └── error.ts        # Error handling
```

## Usage

### Basic Usage

```typescript
import { DriveService } from '@/lib/drive';

// Create a new DriveService instance
const driveService = new DriveService({
  credentials: {
    access_token: 'your-access-token',
    refresh_token: 'your-refresh-token',
    expiry_date: Date.now() + 3600 * 1000,
  },
  folderId: 'your-folder-id',
});

// Upload a file
const fileId = await driveService.uploadFile(
  Buffer.from('Hello, world!'),
  'hello.txt',
  'text/plain'
);

// List files in the folder
const files = await driveService.listFiles();

// Check if a file exists
const exists = await driveService.fileExists('hello.txt');

// Delete a file
await driveService.deleteFile(fileId);
```

### User-Based Operations

```typescript
import { DriveService } from '@/lib/drive';

// Get a DriveService instance for a user
const driveService = await DriveService.forUser(userId);

if (driveService) {
  // Ensure the user has a README file
  await driveService.ensureReadmeExists();

  // Verify the user's folder
  const folderInfo = await driveService.verifyFolder();

  if (folderInfo.valid) {
    console.log(`Folder "${folderInfo.folderName}" is valid`);
  }
}
```

### Static Methods

```typescript
import { DriveService } from '@/lib/drive';
import { google } from 'googleapis';

// Create an OAuth2 client
const auth = new google.auth.OAuth2();
auth.setCredentials({
  access_token: 'your-access-token',
  refresh_token: 'your-refresh-token',
});

// Create a folder
const folderId = await DriveService.createFolder(auth, 'My Folder');

// Find a folder by name
const existingFolderId = await DriveService.findFolderByName(auth, 'My Folder');

// Find or create a folder
const folderIdToUse = await DriveService.findOrCreateFolder(auth, 'My Folder');

// Ensure a user has a README file
const success = await DriveService.ensureUserReadmeExists(userId);

// Verify a user's folder
const folderInfo = await DriveService.verifyUserFolder(userId);
```

## Error Handling

The module includes specialized error handling utilities:

```typescript
import {
  isAuthError,
  isRateLimitError,
  isNetworkError,
  DriveError,
} from '@/lib/drive';

try {
  // Perform Drive operations
} catch (error) {
  if (isAuthError(error)) {
    console.error('Authentication error:', error);
    // Handle authentication errors
  } else if (isRateLimitError(error)) {
    console.error('Rate limit error:', error);
    // Handle rate limiting
  } else if (isNetworkError(error)) {
    console.error('Network error:', error);
    // Handle network issues
  } else {
    console.error('Unknown error:', error);
    // Handle other errors
  }
}
```

## Contributing

When adding new features to this module:

1. Add appropriate type definitions in `types.ts`
2. Implement low-level operations in the `operations/` directory
3. Add utility functions in the `utils/` directory
4. Expose high-level functionality through the `DriveService` class in `service.ts`
5. Export public APIs through `index.ts`
