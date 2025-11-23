'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[BURAQ_X] Error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Oops!</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600">
            We apologize for the inconvenience. An error occurred while processing your request.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="btn-primary w-full"
          >
            Try again
          </button>
          <a
            href="/"
            className="block text-primary-600 hover:text-primary-700 font-medium"
          >
            Return to homepage
          </a>
        </div>

        {error.digest && (
          <p className="mt-8 text-sm text-gray-500">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
