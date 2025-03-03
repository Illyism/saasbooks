'use client';

import { useState } from 'react';

interface VerifyResult {
  message?: string;
  error?: string;
  folderInfo?: {
    valid: boolean;
    folderId?: string;
    folderName?: string;
  };
  oldFolderId?: string;
  newFolderId?: string;
}

export default function VerifyDriveButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verifyDrive = async () => {
    try {
      setLoading(true);
      setResult(null);
      setError(null);

      const response = await fetch('/api/drive/verify');
      const data = await response.json();

      setResult(data);

      if (!response.ok) {
        setError(data.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Error verifying drive folder:', error);
      setError('An error occurred while verifying your Drive folder');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={verifyDrive}
        disabled={loading}
        type="button"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Verifying...' : 'Verify Drive Folder'}
      </button>

      {error && (
        <div className="mt-4 rounded-md bg-red-100 p-4 text-red-800">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-4 rounded-md bg-gray-100 p-4">
          <h3 className="mb-2 font-medium">Result:</h3>
          <pre className="overflow-auto rounded bg-white p-2 text-xs">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
