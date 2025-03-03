'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton({
  className = '',
}: {
  className?: string;
}) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      // Redirect to the logout route, which handles the session cleanup
      router.push('/auth/logout');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`rounded bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:bg-red-300 ${className}`}
    >
      {isLoggingOut ? 'Logging out...' : 'Sign out'}
    </button>
  );
}
