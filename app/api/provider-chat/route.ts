/**
 * Provider Chat API Route
 * Handles conversations with provider-specific AI assistants
 * POST /api/provider-chat - Chat with a provider's AI assistant
 */

import { NextRequest, NextResponse } from 'next/server';
import { chatWithProviderAssistant } from '../../../lib/provider-ai';
import { listingRepository } from '../../../lib/repositories/listingRepository';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, providerId, conversationHistory } = body;

    if (!message || !providerId) {
      return NextResponse.json(
        { error: 'Message and providerId are required' },
        { status: 400 }
      );
    }

    console.log('[BURAQ_X] Provider chat request:', {
      providerId,
      message: message.substring(0, 50) + '...',
    });

    // Fetch provider details
    const provider = await listingRepository.getListingById(providerId);
    
    if (!provider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }

    // Get AI response
    const response = await chatWithProviderAssistant(
      message,
      provider,
      conversationHistory || []
    );

    console.log('[BURAQ_X] Provider chat response generated');

    return NextResponse.json({
      response,
      providerId,
    });

  } catch (error) {
    console.error('[BURAQ_X] Provider chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
