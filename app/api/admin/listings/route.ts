/**
 * Admin Listings API Route
 * GET /api/admin/listings - Get all listings (including pending and rejected)
 */

import { NextResponse } from 'next/server';
import { listingRepository } from '@/lib/repositories/listingRepository';

export async function GET() {
  try {
    const listings = await listingRepository.getAllListings();
    
    return NextResponse.json({ listings });

  } catch (error) {
    console.error('[BURAQ_X] Admin listings API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
