'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    location: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitSuccess(true);
    setIsSubmitting(false);
  };

  if (submitSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#151515] to-[#0f0f0f] flex items-center justify-center px-6"
      >
        <div className="max-w-md text-center animate-fade-in">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-light text-white mb-4">Application received</h1>
          <p className="text-zinc-500 font-light mb-8 leading-relaxed">
            We'll review your application and get back to you within 48 hours.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-zinc-100 text-black rounded-full text-sm font-medium transition-all duration-200"
          >
            Back to home
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#151515] to-[#0f0f0f]"
    >
      {/* Hero */}
      <section className="relative py-20 sm:py-28">
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight leading-tight mb-3">
            <span className="text-white">Become a Provider</span>
          </h1>
          <p className="text-sm text-zinc-600 font-light max-w-lg mx-auto">
            Join our network of trusted professionals
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-xl mx-auto px-6">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm text-zinc-600 font-light mb-2">
                Full name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-900 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-800 transition-colors font-light text-sm"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm text-zinc-600 font-light mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-900 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-800 transition-colors font-light text-sm"
                placeholder="john@example.com"
              />
            </div>

            {/* Service */}
            <div>
              <label htmlFor="service" className="block text-sm text-zinc-600 font-light mb-2">
                Service offered
              </label>
              <input
                type="text"
                id="service"
                required
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-900 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-800 transition-colors font-light text-sm"
                placeholder="e.g., Math tutoring, Photography, Plumbing"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm text-zinc-600 font-light mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-900 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-800 transition-colors font-light text-sm"
                placeholder="e.g., Toronto, Mississauga"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm text-zinc-600 font-light mb-2">
                Brief description
              </label>
              <textarea
                id="description"
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-900 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-800 transition-colors font-light text-sm resize-none"
                placeholder="Tell us about your experience and what you offer..."
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-white hover:bg-zinc-100 text-black rounded-full text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit application'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </motion.div>
  );
}

export const dynamic = 'force-dynamic';
