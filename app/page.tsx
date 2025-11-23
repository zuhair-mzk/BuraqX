'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/chat?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      {/* Main Content */}
      <div className="w-full max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
        {/* Logo and Tagline */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Buraq X
          </h1>
          <p className="text-base md:text-lg text-gray-400 font-light max-w-xl mx-auto">
            Your trusted Muslim community marketplace
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="relative group">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for? (e.g., 'math tutor in Scarborough')"
              className="w-full px-5 py-4 pr-24 text-base rounded-xl border border-gray-700 bg-[#1a1a1a]
                       text-white placeholder:text-gray-500
                       focus:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700
                       transition-all duration-300 shadow-lg hover:border-gray-600"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 
                       bg-white hover:bg-gray-200 text-black 
                       px-5 py-2 rounded-lg font-medium text-sm
                       transition-all duration-200"
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick Examples */}
        <div className="space-y-3">
          <p className="text-xs text-gray-500 font-medium">Try asking:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'Find me a math tutor',
              'Affordable photographer',
              'Plumber near me',
              'Sisters halaqa events',
            ].map((example) => (
              <button
                key={example}
                onClick={() => setQuery(example)}
                className="px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg
                         text-xs text-gray-400 hover:border-gray-700 hover:text-gray-300
                         transition-all duration-200"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Stats or Social Proof (optional) */}
        <div className="pt-6 flex justify-center gap-10 text-center">
          <div>
            <div className="text-2xl font-bold text-white">100+</div>
            <div className="text-xs text-gray-500">Trusted Providers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">5</div>
            <div className="text-xs text-gray-500">Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">GTA</div>
            <div className="text-xs text-gray-500">Coverage</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
