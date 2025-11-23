'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => pathname === path;
  const isChatPage = pathname === '/chat';
  
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Navigation */}
      <nav className="bg-black/80 backdrop-blur-2xl border-b border-zinc-900/30 sticky top-0 z-50 shadow-2xl shadow-black/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20 sm:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-sm sm:text-base font-extralight text-white tracking-[0.25em] uppercase">
                BuraqX
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
              <Link
                href="/"
                className={`text-[11px] font-extralight tracking-[0.15em] transition-all duration-700 hover:scale-110 inline-block uppercase ${
                  isActive('/')
                    ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                    : 'text-zinc-800 hover:text-zinc-600'
                }`}
              >
                Home
              </Link>
              <Link
                href="/chat"
                className={`text-[11px] font-extralight tracking-[0.15em] transition-all duration-700 hover:scale-110 inline-block uppercase ${
                  isActive('/chat')
                    ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                    : 'text-zinc-800 hover:text-zinc-600'
                }`}
              >
                Search
              </Link>
              <Link
                href="/join"
                className={`text-[11px] font-extralight tracking-[0.15em] transition-all duration-700 hover:scale-110 inline-block uppercase ${
                  isActive('/join')
                    ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                    : 'text-zinc-800 hover:text-zinc-600'
                }`}
              >
                Join
              </Link>
              <Link
                href="/about"
                className={`text-[11px] font-extralight tracking-[0.15em] transition-all duration-700 hover:scale-110 inline-block uppercase ${
                  isActive('/about')
                    ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                    : 'text-zinc-800 hover:text-zinc-600'
                }`}
              >
                About
              </Link>
              <Link
                href="/admin"
                className={`text-[11px] font-extralight tracking-[0.15em] transition-all duration-500 uppercase ${
                  isActive('/admin')
                    ? 'text-white'
                    : 'text-zinc-800 hover:text-zinc-600'
                }`}
              >
                Admin
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-zinc-600 hover:text-zinc-400 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-zinc-950 bg-black">
              <div className="px-4 py-4 space-y-3">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-light transition-colors ${
                    isActive('/')
                      ? 'text-white'
                      : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/chat"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-light transition-colors ${
                    isActive('/chat')
                      ? 'text-white'
                      : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  Search
                </Link>
                <Link
                  href="/join"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-light transition-colors ${
                    isActive('/join')
                      ? 'text-white'
                      : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  Join
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-light transition-colors ${
                    isActive('/about')
                      ? 'text-white'
                      : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  About
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-light transition-colors ${
                    isActive('/admin')
                      ? 'text-white'
                      : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  Admin
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer - Hidden on chat page */}
      {!isChatPage && (
        <footer className="bg-black border-t border-zinc-950">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="text-center">
              <p className="text-xs text-zinc-800 font-light">
                &copy; {new Date().getFullYear()} BuraqX
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
