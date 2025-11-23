/**
 * Admin Suggestions API Route
 * Handles retrieval of user suggestions
 * GET /api/admin/suggestions
 */

import { NextResponse } from 'next/server';
import { suggestionRepository } from '@/lib/repositories/suggestionRepository';

export async function GET() {
  try {
    const suggestions = await suggestionRepository.getAllSuggestions();
    const count = await suggestionRepository.getSuggestionsCount();

    return NextResponse.json({ suggestions, count });

  } catch (error) {
    console.error('[BURAQ_X] Admin Suggestions API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
