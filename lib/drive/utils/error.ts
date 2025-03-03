/**
 * Custom error class for Drive operations
 */
export class DriveError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.name = 'DriveError';
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Check if an error is related to authentication
 */
export function isAuthError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes('auth') ||
      message.includes('unauthorized') ||
      message.includes('unauthenticated') ||
      message.includes('permission') ||
      message.includes('access') ||
      message.includes('token') ||
      message.includes('credentials') ||
      message.includes('expired')
    );
  }
  return false;
}

/**
 * Check if an error is related to rate limiting
 */
export function isRateLimitError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes('rate') ||
      message.includes('limit') ||
      message.includes('quota') ||
      message.includes('too many requests')
    );
  }
  return false;
}

/**
 * Check if an error is related to network issues
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes('network') ||
      message.includes('connection') ||
      message.includes('timeout') ||
      message.includes('unreachable') ||
      message.includes('offline')
    );
  }
  return false;
}

/**
 * Format an error for logging
 */
export function formatError(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}\n${error.stack || ''}`;
  }
  return String(error);
}
