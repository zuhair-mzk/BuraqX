import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Page not found
          </h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/" className="btn-primary inline-block">
            Back to homepage
          </Link>
          <div className="flex justify-center gap-4 text-sm">
            <Link href="/chat" className="text-primary-600 hover:text-primary-700">
              Start a request
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/join" className="text-primary-600 hover:text-primary-700">
              Join as provider
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
