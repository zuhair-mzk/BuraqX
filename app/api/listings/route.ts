/**
 * Listings API Route
 * Handles listing creation and retrieval
 * POST /api/listings - Create a new listing (onboarding)
 * GET /api/listings - Get all approved listings
 */

import { NextRequest, NextResponse } from 'next/server';
import { onboardingFormSchema } from '@/lib/validation/schemas';
import { listingRepository } from '@/lib/repositories/listingRepository';
import { Listing } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate form data
    const validationResult = onboardingFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    console.log('[BURAQ_X] Creating new listing:', {
      name: formData.name,
      type: formData.type,
      categoryId: formData.categoryId,
    });

    // Prepare base listing data (using flat pricing fields for Prisma)
    const listingData: any = {
      title: formData.orgName || formData.name,
      description: formData.description,
      categoryId: formData.categoryId,
      type: formData.type,
      locationText: formData.locationText,
      tags: formData.tags,
      isFeatured: false,
      status: 'pending', // All new listings require approval
      genderOfProvider: formData.genderOfProvider,
      certifications: formData.certifications,
      yearsOfExperience: formData.yearsOfExperience,
      pricingMin: formData.pricingMin,
      pricingMax: formData.pricingMax,
      pricingCurrency: formData.pricingCurrency,
      pricingUnit: formData.pricingUnit,
      responseTime: formData.responseTime,
      communityEndorsements: 0,
      contactEmail: formData.email,
      contactPhone: formData.phone,
    };

    // Add event-specific fields if it's an event listing
    let newListing: Listing;
    if (formData.isEvent) {
      const eventData: any = {
        ...listingData,
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        recurring: formData.recurring,
        recurringPattern: formData.recurringPattern,
        genderRestriction: formData.genderRestriction,
      };
      newListing = await listingRepository.addListing(eventData);
    } else {
      newListing = await listingRepository.addListing(listingData);
    }

    return NextResponse.json(
      {
        message: 'Listing created successfully. It will be reviewed by our team shortly.',
        listing: newListing,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('[BURAQ_X] Listings API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    let listings: Listing[];

    if (categoryId) {
      listings = await listingRepository.getListingsByCategory(categoryId, limit);
    } else {
      listings = await listingRepository.getApprovedListings(limit);
    }

    return NextResponse.json({ listings });

  } catch (error) {
    console.error('[BURAQ_X] Listings API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
