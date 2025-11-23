/**
 * Chat API Route
 * Handles natural language queries and returns matched listings
 * POST /api/chat
 */

import { NextRequest, NextResponse } from 'next/server';
import { chatRequestSchema } from '@/lib/validation/schemas';
import { parseUserRequest } from '@/lib/chat/parser';
import { formatMatchResponse, formatUnsupportedResponse, formatNoResultsResponse } from '@/lib/chat/formatter';
import { listingRepository } from '@/lib/repositories/listingRepository';
import { suggestionRepository } from '@/lib/repositories/suggestionRepository';
import { ChatResponse } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request
    const validationResult = chatRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { message, location, preferences } = validationResult.data;

    console.log('[BURAQ_X] Chat API request:', { message, location, preferences });

    // Parse the user's message with AI
    const parsed = await parseUserRequest(message, location);

    // If category is not supported (could be conversation or truly unsupported)
    if (!parsed.isSupported) {
      // Use AI-generated conversational response if available
      let answerText: string;
      if (parsed.conversationalResponse) {
        answerText = parsed.conversationalResponse;
      } else {
        // Fallback for unsupported service requests
        await suggestionRepository.addSuggestion(
          message,
          undefined,
          parsed.location || location
        );
        answerText = "I'd love to help with that! Could you tell me more about what you're looking for?";
      }

      const response: ChatResponse = {
        answerText,
        matches: [],
        category: null,
        isSupported: false,
      };

      return NextResponse.json(response);
    }

    // Search for listings with AI-powered semantic search
    const matches = await listingRepository.searchListings({
      categoryId: parsed.categoryId!,
      location: parsed.location || location,
      genderPreference: preferences?.genderPreference || parsed.genderPreference,
      tags: parsed.tags,
      status: 'approved',
      query: message, // Pass the original message for semantic search
      searchKeywords: parsed.searchKeywords, // AI-extracted keywords
      filters: parsed.filters, // Apply AI-extracted filters
    });

    // Format response
    let answerText: string;
    if (matches.length > 0) {
      answerText = formatMatchResponse(parsed.category!, matches, parsed.location || location);
    } else {
      answerText = formatNoResultsResponse(parsed.category!, parsed.location || location);
    }

    const response: ChatResponse = {
      answerText,
      matches,
      category: parsed.category,
      isSupported: true,
    };

    console.log('[BURAQ_X] Chat API response:', {
      category: parsed.category?.label,
      matchCount: matches.length,
    });

    return NextResponse.json(response);

  } catch (error) {
    console.error('[BURAQ_X] Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
