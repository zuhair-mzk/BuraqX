/**
 * Admin Listings API Route
 * Handles admin actions on listings (approve, reject, toggle featured)
 * PATCH /api/admin/listings/[id]
 * DELETE /api/admin/listings/[id]
 */

import { NextRequest, NextResponse } from 'next/server';
import { listingRepository } from '@/lib/repositories/listingRepository';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();
    const { action } = body;

    console.log('[BURAQ_X] Admin action on listing:', { id, action });

    // TODO: Add authentication check here when auth is implemented
    // For now, we assume the user is authenticated as admin

    let updatedListing;

    switch (action) {
      case 'approve':
        updatedListing = await listingRepository.approveListing(id);
        break;

      case 'reject':
        updatedListing = await listingRepository.rejectListing(id);
        break;

      case 'toggle_featured':
        updatedListing = await listingRepository.toggleFeatured(id);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action. Must be: approve, reject, or toggle_featured' },
          { status: 400 }
        );
    }

    if (!updatedListing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Listing ${action}d successfully`,
      listing: updatedListing,
    });

  } catch (error) {
    console.error('[BURAQ_X] Admin API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    console.log('[BURAQ_X] Deleting listing:', id);

    // TODO: Add authentication check here when auth is implemented

    const success = await listingRepository.deleteListing(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Listing deleted successfully',
    });

  } catch (error) {
    console.error('[BURAQ_X] Admin API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
