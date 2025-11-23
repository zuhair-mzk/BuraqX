'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserMenu from './UserMenu';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => pathname === path;
  const isChatPage = pathname === '/chat';
  
  return (
    <div className="min-h-screen flex flex-col bg-dark">
      {/* Ultra-Premium Navigation - Hidden on chat page */}
      {!isChatPage && (
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-zinc-900 ${
            pathname === '/' 
              ? 'bg-[#0a0a0a]/80' 
              : pathname === '/join' || pathname === '/admin'
              ? 'bg-[#0a0a0a]/80'
              : 'bg-black/80'
          }`}
        >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-lg font-light text-white tracking-tight">
                BuraqX
              </span>
            </Link>

            {/* Premium Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <div className="flex items-center space-x-1 lg:space-x-2">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/chat', label: 'Search' },
                  { href: '/dashboard', label: 'Dashboard' },
                  { href: '/join', label: 'Join' },
                  { href: '/about', label: 'About' },
                  { href: '/admin', label: 'Admin' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-light transition-colors ${
                      isActive(link.href)
                        ? 'text-white'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="pl-4 ml-4 border-l border-border-subtle">
                <UserMenu />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden border-t border-zinc-900 bg-black overflow-hidden"
              >
                <div className="px-4 py-3 space-y-1">
                  {[
                    { href: '/', label: 'Home' },
                    { href: '/chat', label: 'Search' },
                    { href: '/dashboard', label: 'Dashboard' },
                    { href: '/join', label: 'Join' },
                    { href: '/about', label: 'About' },
                    { href: '/admin', label: 'Admin' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-2 text-sm font-light transition-colors ${
                        isActive(link.href)
                          ? 'text-white'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
      )}

      {/* Main Content with top padding for fixed nav */}
      <main className={isChatPage ? "flex-1" : "flex-1 pt-14 sm:pt-16"}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer - Hidden on chat page */}
      {!isChatPage && (
        <footer className="border-t border-zinc-900 bg-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-sm text-zinc-600 font-light">
                &copy; {new Date().getFullYear()} BuraqX. Built for the community.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
