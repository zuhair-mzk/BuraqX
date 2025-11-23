'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Listing } from '@/lib/models';
import CategoryBadge from '@/components/CategoryBadge';

export default function ProviderPage() {
  const params = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/listings?id=${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch listing');
        const data = await response.json();
        setListing(data.listings[0]);
      } catch (error) {
        console.error('Error fetching listing:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [params.id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMessageSent(true);
    setIsSending(false);
    setMessage('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-600 font-light animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-white mb-4">Provider not found</h1>
          <Link href="/chat" className="text-sm text-zinc-500 hover:text-zinc-400">
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-16 border-b border-zinc-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-xs text-zinc-500 hover:text-zinc-400 mb-6 transition-colors font-light"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>

          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-light text-white mb-3">
                {listing.title}
              </h1>
              {listing.isFeatured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800">
                  ⭐ Featured Provider
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <CategoryBadge categoryId={listing.categoryId} />
            {listing.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-light bg-zinc-950 text-zinc-400 border border-zinc-900"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div>
                <h2 className="text-sm text-zinc-500 font-light mb-4 uppercase tracking-wider">
                  About
                </h2>
                <p className="text-base text-zinc-300 font-light leading-relaxed">
                  {listing.description}
                </p>
              </div>

              {/* Details */}
              <div>
                <h2 className="text-sm text-zinc-500 font-light mb-4 uppercase tracking-wider">
                  Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <svg className="w-5 h-5 mr-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-zinc-300 font-light">{listing.locationText}</span>
                  </div>

                  {listing.yearsOfExperience && (
                    <div className="flex items-center text-sm">
                      <svg className="w-5 h-5 mr-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span className="text-zinc-300 font-light">{listing.yearsOfExperience} years of experience</span>
                    </div>
                  )}

                  {listing.responseTime && (
                    <div className="flex items-center text-sm">
                      <svg className="w-5 h-5 mr-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-zinc-300 font-light">Responds in {listing.responseTime}</span>
                    </div>
                  )}

                  {listing.communityEndorsements > 0 && (
                    <div className="flex items-center text-sm">
                      <svg className="w-5 h-5 mr-3 text-zinc-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-zinc-300 font-light">{listing.communityEndorsements} community endorsements</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing */}
              {listing.pricing && (
                <div>
                  <h2 className="text-sm text-zinc-500 font-light mb-4 uppercase tracking-wider">
                    Pricing
                  </h2>
                  <div className="text-2xl font-light text-white">
                    {listing.pricing.min && listing.pricing.max
                      ? `$${listing.pricing.min}-$${listing.pricing.max}`
                      : listing.pricing.min
                      ? `From $${listing.pricing.min}`
                      : `Up to $${listing.pricing.max}`}
                    {listing.pricing.unit && (
                      <span className="text-base text-zinc-400"> / {listing.pricing.unit}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Contact Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-4">
                {/* AI Chat Button */}
                <Link
                  href={`/provider/${params.id}/chat`}
                  className="block border border-zinc-800/50 rounded-2xl p-6 bg-zinc-950/40 backdrop-blur-sm hover:bg-zinc-900/60 hover:border-zinc-700/60 transition-all duration-700 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/30 active:scale-[1.01]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-lg font-light text-white">
                      Chat with AI Assistant
                    </h2>
                    <svg className="w-5 h-5 text-zinc-500 group-hover:text-white transition-all duration-700 group-hover:translate-x-1 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-zinc-500 font-light mb-3">
                    Get instant answers about services, pricing, and availability. Schedule meetings instantly.
                  </p>
                  <div className="flex items-center text-xs text-zinc-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    Instant responses
                  </div>
                </Link>

                {/* Contact Form */}
                <div className="border border-zinc-900/30 rounded-2xl p-6 bg-zinc-950/40 backdrop-blur-sm">
                  <h2 className="text-lg font-light text-white mb-4">
                    Send a message
                  </h2>

                {messageSent ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-xl shadow-white/20 animate-fade-in">
                      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-zinc-300 font-light mb-4">
                      Message sent! The provider will respond to your email.
                    </p>
                    <button
                      onClick={() => setMessageSent(false)}
                      className="text-xs text-zinc-400 hover:text-zinc-300"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-4">
                    <div>
                      <label className="block text-xs text-zinc-500 font-light mb-2">
                        Your message
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Hi, I'm interested in your services..."
                        rows={6}
                        className="w-full px-4 py-3 bg-black/50 backdrop-blur-sm border border-zinc-900/40 rounded-xl text-white placeholder:text-zinc-700 focus:outline-none focus:border-zinc-800/60 focus:bg-black/70 transition-all duration-700 font-light text-sm resize-none shadow-xl shadow-black/30"
                        required
                      />
                    </div>

                    {listing.contactEmail && (
                      <p className="text-xs text-zinc-500 font-light">
                        Will be sent to: {listing.contactEmail}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSending || !message.trim()}
                      className="w-full py-3 bg-white hover:bg-zinc-50 text-black rounded-full text-sm font-medium transition-all duration-700 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-100 shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20"
                    >
                      {isSending ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
