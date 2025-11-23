export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-zinc-800 border-t-accent-500 rounded-full animate-spin`}
          role="status"
          aria-label="Loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
