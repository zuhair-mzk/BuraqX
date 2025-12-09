'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-8 h-8 rounded-full bg-zinc-900/50 animate-pulse" />
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-[11px] font-extralight tracking-[0.15em] transition-all duration-700 hover:scale-110 inline-block uppercase text-zinc-400 hover:text-zinc-300"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="px-4 py-2 bg-white text-black rounded-full text-[11px] font-medium tracking-wider uppercase transition-all duration-500 hover:bg-zinc-100"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-light">
          {user.name.charAt(0).toUpperCase()}
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-zinc-950 border border-zinc-800/50 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-800/50">
              <p className="text-sm font-light text-white truncate">{user.name}</p>
              <p className="text-xs text-zinc-600 truncate">{user.email}</p>
            </div>
            <div className="py-2">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/chat"
                className="block px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Chat History
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
