/**
 * Listing Repository
 * Database operations for listings using Prisma
 */

import { prisma } from '../db';
import { semanticSearchListings } from '../openai';

type Listing = any; // Will be properly typed after Prisma Client regeneration

/**
 * Search and ranking logic
 */
interface SearchCriteria {
  categoryId?: string;
  location?: string;
  genderPreference?: string;
  tags?: string[];
  status?: 'pending' | 'approved' | 'rejected';
  query?: string; // For semantic search
  searchKeywords?: string[]; // Enhanced keywords from AI
  filters?: {
    minYearsExperience?: number;
    maxPrice?: number;
    certifications?: string[];
  };
}

function calculateRelevanceScore(listing: Listing, criteria: SearchCriteria): number {
  let score = 0;

  // Featured listings get a boost
  if (listing.isFeatured) score += 10;

  // Exact category match is highest priority
  if (criteria.categoryId && listing.categoryId === criteria.categoryId) {
    score += 50;
  }

  // Location matching (simple text matching for V1)
  if (criteria.location && listing.locationText) {
    const locationLower = criteria.location.toLowerCase();
    const listingLocationLower = listing.locationText.toLowerCase();
    
    if (listingLocationLower.includes(locationLower)) {
      score += 30;
    } else if (locationLower.includes(listingLocationLower)) {
      score += 20;
    }
  }

  // Gender preference matching
  if (criteria.genderPreference && listing.genderOfProvider) {
    if (listing.genderOfProvider === criteria.genderPreference || listing.genderOfProvider === 'mixed') {
      score += 15;
    }
  }

  // Tag matching
  if (criteria.tags && criteria.tags.length > 0 && listing.tags) {
    const matchingTags = listing.tags.filter((tag: string) => 
      criteria.tags!.some((criteriaTag: string) => 
        tag.toLowerCase().includes(criteriaTag.toLowerCase())
      )
    );
    score += matchingTags.length * 5;
  }

  // Community endorsements (normalized)
  score += Math.min(listing.communityEndorsements / 2, 10);

  // Recency (newer listings get slight boost)
  const daysSinceCreation = (Date.now() - listing.createdAt.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceCreation < 30) {
    score += 5;
  }

  return score;
}

/**
 * Repository methods
 */

export const listingRepository = {
  /**
   * Search listings with AI-powered semantic search
   */
  async searchListings(criteria: SearchCriteria): Promise<Listing[]> {
    console.log('[BURAQ_X] Searching listings with criteria:', criteria);
    
    const where: any = {
      status: criteria.status || 'approved',
    };

    if (criteria.categoryId) {
      where.categoryId = criteria.categoryId;
    }

    // Apply filters (only if values are valid numbers)
    if (criteria.filters) {
      if (criteria.filters.minYearsExperience !== undefined && 
          criteria.filters.minYearsExperience !== null && 
          typeof criteria.filters.minYearsExperience === 'number') {
        where.yearsOfExperience = { gte: criteria.filters.minYearsExperience };
      }
      if (criteria.filters.maxPrice !== undefined && 
          criteria.filters.maxPrice !== null && 
          typeof criteria.filters.maxPrice === 'number') {
        where.pricingMax = { lte: criteria.filters.maxPrice };
      }
    }

    let results = await prisma.listing.findMany({
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { communityEndorsements: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    console.log('[BURAQ_X] Found', results.length, 'listings before AI filtering');

    // If we have a query, use semantic search to rank by relevance to descriptions
    if (criteria.query && results.length > 0) {
      try {
        results = await semanticSearchListings(
          criteria.query, 
          results, 
          criteria.searchKeywords || [],
          3
        );
        console.log('[BURAQ_X] AI semantic search completed, top 3 results selected');
      } catch (error) {
        console.error('[BURAQ_X] Semantic search failed, falling back to traditional ranking:', error);
        
        // Fallback to traditional ranking
        const scoredResults = results.map((listing: any) => ({
          listing,
          score: calculateRelevanceScore(listing, criteria),
        }));
        scoredResults.sort((a: any, b: any) => b.score - a.score);
        results = scoredResults.slice(0, 3).map((item: any) => item.listing);
      }
    } else {
      // Traditional ranking without semantic search
      const scoredResults = results.map((listing: any) => ({
        listing,
        score: calculateRelevanceScore(listing, criteria),
      }));
      scoredResults.sort((a: any, b: any) => b.score - a.score);
      results = scoredResults.slice(0, 3).map((item: any) => item.listing);
    }
    
    console.log('[BURAQ_X] Returning', results.length, 'final results');
    
    return results;
  },

  /**
   * Get listings by category
   */
  async getListingsByCategory(categoryId: string, limit = 10): Promise<Listing[]> {
    return await prisma.listing.findMany({
      where: {
        categoryId,
        status: 'approved',
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  },

  /**
   * Get listing by ID
   */
  async getListingById(id: string): Promise<Listing | null> {
    return await prisma.listing.findUnique({
      where: { id },
    });
  },

  /**
   * Get all approved listings
   */
  async getApprovedListings(limit?: number): Promise<Listing[]> {
    return await prisma.listing.findMany({
      where: { status: 'approved' },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  },

  /**
   * Get all pending listings (for admin)
   */
  async getPendingListings(): Promise<Listing[]> {
    return await prisma.listing.findMany({
      where: { status: 'pending' },
      orderBy: { createdAt: 'desc' },
    });
  },

  /**
   * Get all listings (for admin)
   */
  async getAllListings(): Promise<Listing[]> {
    return await prisma.listing.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  /**
   * Add a new listing
   */
  async addListing(data: any): Promise<Listing> {
    const newListing = await prisma.listing.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    } as any);

    console.log('[BURAQ_X] Added new listing:', newListing.id);
    
    return newListing;
  },

  /**
   * Approve a listing
   */
  async approveListing(id: string): Promise<Listing | null> {
    try {
      const updated = await prisma.listing.update({
        where: { id },
        data: {
          status: 'approved',
          updatedAt: new Date(),
        },
      });
      
      console.log('[BURAQ_X] Approved listing:', id);
      return updated;
    } catch (error) {
      console.error('[BURAQ_X] Error approving listing:', error);
      return null;
    }
  },

  /**
   * Reject a listing
   */
  async rejectListing(id: string): Promise<Listing | null> {
    try {
      const updated = await prisma.listing.update({
        where: { id },
        data: {
          status: 'rejected',
          updatedAt: new Date(),
        },
      });
      
      console.log('[BURAQ_X] Rejected listing:', id);
      return updated;
    } catch (error) {
      console.error('[BURAQ_X] Error rejecting listing:', error);
      return null;
    }
  },

  /**
   * Toggle featured status
   */
  async toggleFeatured(id: string): Promise<Listing | null> {
    try {
      const listing = await prisma.listing.findUnique({ where: { id } });
      if (!listing) return null;

      const updated = await prisma.listing.update({
        where: { id },
        data: {
          isFeatured: !listing.isFeatured,
          updatedAt: new Date(),
        },
      });
      
      console.log('[BURAQ_X] Toggled featured status for listing:', id, '- Now featured:', updated.isFeatured);
      return updated;
    } catch (error) {
      console.error('[BURAQ_X] Error toggling featured status:', error);
      return null;
    }
  },

  /**
   * Delete a listing
   */
  async deleteListing(id: string): Promise<boolean> {
    try {
      await prisma.listing.delete({
        where: { id },
      });
      
      console.log('[BURAQ_X] Deleted listing:', id);
      return true;
    } catch (error) {
      console.error('[BURAQ_X] Error deleting listing:', error);
      return false;
    }
  },
};
