'use client';

import { useState, useEffect } from 'react';
import { Listing, Suggestion } from '@/lib/models';
import CategoryBadge from '@/components/CategoryBadge';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AdminPage() {
  const [pendingListings, setPendingListings] = useState<Listing[]>([]);
  const [approvedListings, setApprovedListings] = useState<Listing[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'suggestions'>('pending');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Fetch all listings (admin endpoint)
      const listingsRes = await fetch('/api/admin/listings');
      const listingsData = await listingsRes.json();
      
      setPendingListings(
        listingsData.listings.filter((l: Listing) => l.status === 'pending')
      );
      setApprovedListings(
        listingsData.listings.filter((l: Listing) => l.status === 'approved')
      );

      // Fetch suggestions
      const suggestionsRes = await fetch('/api/admin/suggestions');
      const suggestionsData = await suggestionsRes.json();
      setSuggestions(suggestionsData.suggestions || []);

    } catch (error) {
      console.error('[BURAQ_X] Admin data load error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (listingId: string, action: 'approve' | 'reject' | 'toggle_featured') => {
    try {
      const response = await fetch(`/api/admin/listings/${listingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error('Action failed');
      }

      // Reload data
      await loadData();
    } catch (error) {
      console.error('[BURAQ_X] Admin action error:', error);
      alert('Failed to perform action. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage listings and review user suggestions
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'pending'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending ({pendingListings.length})
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'approved'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Approved ({approvedListings.length})
              </button>
              <button
                onClick={() => setActiveTab('suggestions')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'suggestions'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Suggestions ({suggestions.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Pending Listings Tab */}
            {activeTab === 'pending' && (
              <div className="space-y-4">
                {pendingListings.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No pending listings to review.
                  </p>
                ) : (
                  pendingListings.map((listing) => (
                    <div
                      key={listing.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {listing.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <CategoryBadge categoryId={listing.categoryId} />
                            <span className="text-sm text-gray-500">
                              {listing.type}
                            </span>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{listing.description}</p>

                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div>
                          <span className="text-gray-500">Location:</span>{' '}
                          <span className="text-gray-900">{listing.locationText}</span>
                        </div>
                        {listing.contactEmail && (
                          <div>
                            <span className="text-gray-500">Email:</span>{' '}
                            <span className="text-gray-900">{listing.contactEmail}</span>
                          </div>
                        )}
                        {listing.yearsOfExperience && (
                          <div>
                            <span className="text-gray-500">Experience:</span>{' '}
                            <span className="text-gray-900">
                              {listing.yearsOfExperience} years
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAction(listing.id, 'approve')}
                          className="btn-primary flex-1"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(listing.id, 'reject')}
                          className="btn-secondary flex-1"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Approved Listings Tab */}
            {activeTab === 'approved' && (
              <div className="space-y-4">
                {approvedListings.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No approved listings yet.
                  </p>
                ) : (
                  approvedListings.map((listing) => (
                    <div
                      key={listing.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {listing.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <CategoryBadge categoryId={listing.categoryId} />
                            {listing.isFeatured && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                ⭐ Featured
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Approved
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {listing.description}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAction(listing.id, 'toggle_featured')}
                          className="btn-secondary flex-1"
                        >
                          {listing.isFeatured ? 'Remove Featured' : 'Make Featured'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Suggestions Tab */}
            {activeTab === 'suggestions' && (
              <div className="space-y-4">
                {suggestions.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No user suggestions yet.
                  </p>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      These are unsupported queries from users. Use this to prioritize new
                      categories.
                    </p>
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-3"
                      >
                        <p className="text-gray-900 mb-2">"{suggestion.rawQueryText}"</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {suggestion.location && (
                            <span>📍 {suggestion.location}</span>
                          )}
                          <span>
                            {new Date(suggestion.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
