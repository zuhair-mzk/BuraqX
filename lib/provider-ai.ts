/**
 * Provider AI Assistant
 * Generates contextual AI responses for provider-specific chatbots
 */

import openai from './openai';
import { Listing } from '@prisma/client';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Chat with a provider's AI assistant
 * The assistant knows about the provider's services, pricing, and can help with scheduling
 */
export async function chatWithProviderAssistant(
  userMessage: string,
  provider: Listing,
  conversationHistory: ConversationMessage[]
): Promise<string> {
  
  // Format pricing info
  const pricingInfo = provider.pricingMin && provider.pricingMax
    ? `${provider.pricingCurrency || 'CAD'} $${provider.pricingMin}-$${provider.pricingMax}${provider.pricingUnit ? `/${provider.pricingUnit}` : ''}`
    : 'Contact for pricing';

  // Build provider context for AI
  const providerContext = `
You are an AI assistant for ${provider.title}, a service provider in ${provider.locationText}.

PROVIDER DETAILS:
- Name: ${provider.title}
- Location: ${provider.locationText}
- Experience: ${provider.yearsOfExperience || 'Not specified'} years
- Response Time: ${provider.responseTime || 'Usually within 24 hours'}
- Pricing: ${pricingInfo}
- Description: ${provider.description}
${provider.tags?.length ? `- Specialties: ${provider.tags.join(', ')}` : ''}
${provider.certifications?.length ? `- Certifications: ${provider.certifications.join(', ')}` : ''}

YOUR ROLE:
- You represent ${provider.title} and respond on their behalf
- Answer questions about services, pricing, and availability
- Help schedule appointments and meetings
- Be professional, helpful, and knowledgeable about the services offered
- If asked about availability, mention that you can help coordinate scheduling
- For specific appointments, suggest they provide preferred dates/times
- Always stay in character as ${provider.title}'s AI assistant

SCHEDULING CAPABILITIES:
- When users ask about booking or scheduling, be proactive
- Ask for preferred date and time if not provided
- Confirm the service they're interested in
- Let them know you'll coordinate with ${provider.title} to confirm
- Provide the response time expectation

Keep responses concise, professional, and helpful. Focus on the specific service offered.
  `.trim();

  try {
    // Build messages array for OpenAI
    const messages: any[] = [
      {
        role: 'system',
        content: providerContext,
      },
    ];

    // Add conversation history (last 5 messages for context)
    const recentHistory = conversationHistory.slice(-5);
    for (const msg of recentHistory) {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
      });
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: userMessage,
    });

    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    const response = completion.choices[0]?.message?.content?.trim();

    if (!response) {
      throw new Error('Empty response from AI');
    }

    console.log('[BURAQ_X] Provider AI response generated for:', provider.title);

    return response;

  } catch (error) {
    console.error('[BURAQ_X] Provider AI error:', error);
    
    // Fallback response
    return `Thank you for reaching out! I'm ${provider.title}'s AI assistant. I'd be happy to help you with information about our services. Could you please rephrase your question? If you'd like to schedule a consultation, please let me know your preferred dates and times.`;
  }
}

/**
 * Detect if a message is about scheduling/booking
 */
export function isSchedulingRequest(message: string): boolean {
  const schedulingKeywords = [
    'book',
    'schedule',
    'appointment',
    'meeting',
    'available',
    'availability',
    'when can',
    'time slot',
    'reserve',
    'consultation',
    'session',
  ];

  const lowerMessage = message.toLowerCase();
  return schedulingKeywords.some(keyword => lowerMessage.includes(keyword));
}

/**
 * Extract date/time information from a message
 * This is a simple implementation - can be enhanced with NLP
 */
export function extractSchedulingInfo(message: string): {
  hasDate: boolean;
  hasTime: boolean;
  rawText: string;
} {
  // Simple date detection
  const datePatterns = [
    /tomorrow/i,
    /today/i,
    /next week/i,
    /monday|tuesday|wednesday|thursday|friday|saturday|sunday/i,
    /\d{1,2}\/\d{1,2}/,
    /january|february|march|april|may|june|july|august|september|october|november|december/i,
  ];

  // Simple time detection
  const timePatterns = [
    /\d{1,2}:\d{2}/,
    /\d{1,2}\s*(am|pm)/i,
    /morning/i,
    /afternoon/i,
    /evening/i,
  ];

  const hasDate = datePatterns.some(pattern => pattern.test(message));
  const hasTime = timePatterns.some(pattern => pattern.test(message));

  return {
    hasDate,
    hasTime,
    rawText: message,
  };
}
