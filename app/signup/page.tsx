'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed');
        setIsLoading(false);
        return;
      }

      // Wait a bit for cookie to be set, then redirect
      await new Promise(resolve => setTimeout(resolve, 100));
      window.location.href = '/';
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-radial from-surface/40 via-dark to-dark" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '48px 48px'
      }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Premium Glass Card */}
        <div className="p-8 sm:p-10 bg-glass-medium backdrop-blur-xl border border-border-medium rounded-2xl shadow-premium-2xl">
          <div className="text-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-semibold text-text-primary mb-3 tracking-tight"
            >
              Join BuraqX
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-base text-text-muted font-normal"
            >
              Create your account to get started
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl bg-error/10 border border-error/30 text-error text-sm font-medium shadow-premium-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm text-text-secondary font-semibold mb-2.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3.5 bg-glass-subtle border-2 border-border-medium rounded-xl text-text-primary placeholder:text-text-muted
                         focus:outline-none focus:border-accent/50 focus:bg-glass-medium focus:ring-2 focus:ring-accent/20 focus:shadow-glow
                         transition-all duration-280 text-base font-normal shadow-premium-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-text-secondary font-semibold mb-2.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3.5 bg-glass-subtle border-2 border-border-medium rounded-xl text-text-primary placeholder:text-text-muted
                         focus:outline-none focus:border-accent/50 focus:bg-glass-medium focus:ring-2 focus:ring-accent/20 focus:shadow-glow
                         transition-all duration-280 text-base font-normal shadow-premium-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-text-secondary font-semibold mb-2.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
                className="w-full px-4 py-3.5 bg-glass-subtle border-2 border-border-medium rounded-xl text-text-primary placeholder:text-text-muted
                         focus:outline-none focus:border-accent/50 focus:bg-glass-medium focus:ring-2 focus:ring-accent/20 focus:shadow-glow
                         transition-all duration-280 text-base font-normal shadow-premium-sm"
                required
              />
              <p className="mt-2 text-xs text-text-disabled font-normal">At least 6 characters</p>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 bg-accent hover:bg-accent-hover text-dark rounded-xl text-base font-semibold
                       transition-all duration-180 hover:shadow-glow mt-6
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                       focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-dark
                       shadow-premium"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </motion.button>
          </form>

          <p className="mt-8 text-center text-sm text-text-muted font-normal">
            Already have an account?{' '}
            <Link href="/login" className="text-accent hover:text-accent-hover transition-colors duration-180 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
