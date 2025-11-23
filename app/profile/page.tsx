'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      
      if (!data.user) {
        router.push('/login');
        return;
      }
      
      setUser(data.user);
      setName(data.user.name);
    } catch (error) {
      console.error('Error fetching user:', error);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      setUser(data.user);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-zinc-800 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="mt-4 text-3xl font-light text-white tracking-wide">
            Profile
          </h1>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
            {success}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-2xl overflow-hidden shadow-xl">
          {/* Avatar Section */}
          <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 text-white text-2xl font-light mb-4">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl text-white font-light">{user.name}</h2>
            <p className="text-sm text-zinc-600 mt-1">{user.email}</p>
          </div>

          {/* Info Section */}
          <div className="p-8 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm text-zinc-600 mb-2">Name</label>
              {isEditing ? (
                <form onSubmit={handleUpdateName} className="space-y-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-zinc-900/50 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-800 transition-colors"
                    placeholder="Your name"
                  />
                  {error && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium transition-all duration-500 hover:bg-zinc-100"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setName(user.name);
                        setError('');
                      }}
                      className="px-4 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium transition-all duration-500 hover:bg-zinc-800"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-white">{user.name}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-zinc-600 mb-2">Email</label>
              <p className="text-white">{user.email}</p>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm text-zinc-600 mb-2">Account Type</label>
              <p className="text-white capitalize">{user.role}</p>
            </div>

            {/* Member Since */}
            <div>
              <label className="block text-sm text-zinc-600 mb-2">Member Since</label>
              <p className="text-white">
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
