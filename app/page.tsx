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

  const exampleQueries = [
    { text: 'Find me a math tutor', icon: '📚' },
    { text: 'Affordable photographer', icon: '📸' },
    { text: 'Plumber near me', icon: '🔧' },
    { text: 'Sisters halaqa events', icon: '🕌' },
    { text: 'Wedding photographer', icon: '💍' },
    { text: 'Quran teacher for kids', icon: '📖' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 overflow-hidden">
      {/* Minimal Background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />
      
      {/* Main Content */}
      <div className="relative w-full max-w-4xl mx-auto text-center space-y-16 animate-fade-in-up">
        {/* Hero Section */}
        <div className="space-y-12 sm:space-y-16">
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1]">
              <span className="block text-white opacity-0 animate-fade-in" style={{animationDelay: '0.1s', animationFillMode: 'forwards'}}>
                Welcome to BuraqX
              </span>
            </h1>
          </div>
          
          <p className="text-xs sm:text-sm text-zinc-500 font-light max-w-sm mx-auto leading-loose tracking-wide px-4 opacity-0 animate-fade-in" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
            Everything you need, delivered with care
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto px-4 opacity-0 animate-fade-in" style={{animationDelay: '0.7s', animationFillMode: 'forwards'}}>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for services..."
              className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-zinc-800/30 rounded-full text-white placeholder:text-zinc-600
                       focus:outline-none focus:border-zinc-700/50 focus:bg-white/[0.07]
                       transition-all duration-500 text-sm font-light tracking-wide"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-white text-black rounded-full text-xs font-medium
                       transition-all duration-500 hover:bg-zinc-100
                       disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Search
            </button>
          </div>
        </form>

        {/* Animated Popular Searches */}
        <div className="overflow-hidden -mx-4 opacity-0 animate-fade-in" style={{animationDelay: '0.9s', animationFillMode: 'forwards'}}>
          {/* Infinite Scroll Container - Three Rows */}
          <div className="relative h-16 sm:h-20 w-full space-y-2">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
            
            {/* Row 1 - Scrolling Left */}
            <div className="relative h-8 w-full overflow-hidden">
              <div className="absolute flex gap-6 animate-scroll-left whitespace-nowrap items-center">
                {[...exampleQueries.slice(0, 2), ...exampleQueries.slice(0, 2), ...exampleQueries.slice(0, 2), ...exampleQueries.slice(0, 2)].map((example, index) => (
                  <span
                    key={`row1-${example.text}-${index}`}
                    onClick={() => setQuery(example.text)}
                    className="text-xs text-zinc-700 hover:text-zinc-500 cursor-pointer transition-colors duration-300 flex-shrink-0 font-light"
                  >
                    {example.text}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Row 2 - Scrolling Right */}
            <div className="relative h-8 w-full overflow-hidden">
              <div className="absolute flex gap-6 animate-scroll-right whitespace-nowrap items-center">
                {[...exampleQueries.slice(2, 4), ...exampleQueries.slice(2, 4), ...exampleQueries.slice(2, 4), ...exampleQueries.slice(2, 4)].map((example, index) => (
                  <span
                    key={`row2-${example.text}-${index}`}
                    onClick={() => setQuery(example.text)}
                    className="text-xs text-zinc-700 hover:text-zinc-500 cursor-pointer transition-colors duration-300 flex-shrink-0 font-light"
                  >
                    {example.text}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Row 3 - Scrolling Left */}
            <div className="relative h-8 w-full overflow-hidden">
              <div className="absolute flex gap-6 animate-scroll-left whitespace-nowrap items-center">
                {[...exampleQueries.slice(4), ...exampleQueries.slice(4), ...exampleQueries.slice(4), ...exampleQueries.slice(4)].map((example, index) => (
                  <span
                    key={`row3-${example.text}-${index}`}
                    onClick={() => setQuery(example.text)}
                    className="text-xs text-zinc-700 hover:text-zinc-500 cursor-pointer transition-colors duration-300 flex-shrink-0 font-light"
                  >
                    {example.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="pt-8 grid grid-cols-3 gap-8 max-w-2xl mx-auto px-4 opacity-0 animate-fade-in" style={{animationDelay: '1.1s', animationFillMode: 'forwards'}}>
          {[
            { value: '100+', label: 'Providers' },
            { value: '5', label: 'Categories' },
            { value: 'GTA', label: 'Coverage' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-light text-white/90">
                {stat.value}
              </div>
              <div className="text-[10px] text-zinc-700 mt-2 font-light uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
