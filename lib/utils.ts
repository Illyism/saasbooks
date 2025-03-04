import { type ClassValue, clsx } from 'clsx';
import crypto from 'crypto';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || 'default-key-32-bytes-production!'; // Must be exactly 32 bytes for AES-256
const IV_LENGTH = 16; // For AES, this is always 16

/**
 * Encrypts data using AES-256-CBC
 */
export function encryptData(data: string): string {
  // Ensure encryption key is exactly 32 bytes (256 bits) for AES-256
  if (Buffer.from(ENCRYPTION_KEY).length !== 32) {
    throw new Error(
      `Invalid encryption key length: ${Buffer.from(ENCRYPTION_KEY).length}, must be 32 bytes`
    );
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  );

  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return IV + encrypted data as a single string
  return `${iv.toString('hex')}:${encrypted}`;
}

/**
 * Decrypts data encrypted with encryptData
 */
export function decryptData(encryptedData: string): string {
  // Ensure encryption key is exactly 32 bytes (256 bits) for AES-256
  if (Buffer.from(ENCRYPTION_KEY).length !== 32) {
    throw new Error(
      `Invalid encryption key length: ${Buffer.from(ENCRYPTION_KEY).length}, must be 32 bytes`
    );
  }

  const parts = encryptedData.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];

  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  );

  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Formats a currency amount for display
 */
export function formatCurrency(
  amount: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  // Convert from cents to dollars/euros/etc.
  const value = amount / 100;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Formats a date for display
 */
export function formatDate(date: Date | string, locale = 'en-US'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj);
}
