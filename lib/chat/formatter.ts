/**
 * Chat Formatter
 * Generates friendly response text for the chat interface
 * Formats listings into readable messages
 */

import { Listing, Category } from '../models';

/**
 * Format a friendly greeting response
 */
export function formatGreeting(): string {
  return "As-salamu alaykum! I'm Buraq X, your Muslim community concierge. How can I help you today? You can ask me about STEM tutoring, creative freelancers, home services, masjid events, or wedding services.";
}

/**
 * Format a response when matches are found
 */
export function formatMatchResponse(
  category: Category,
  matches: Listing[],
  location?: string
): string {
  const categoryName = category.label.toLowerCase();
  const locationText = location ? ` in ${location}` : '';
  
  if (matches.length === 0) {
    return `I couldn't find any ${categoryName}${locationText} at the moment. Try adjusting your location or check back later inshaAllah.`;
  }

  const intro = `I found ${matches.length} trusted ${categoryName}${locationText}:`;

  return intro;
}

/**
 * Format a response when no category is matched (unsupported request)
 */
export function formatUnsupportedResponse(): string {
  return `JazakAllah khair for your request! Unfortunately, this type of service isn't available on Buraq X yet. We've logged your request and will prioritize it as we grow inshaAllah. 

In the meantime, we currently support:
• STEM Tutoring (math, physics, computer science)
• Creative Freelancers (photographers, videographers, designers)
• Home Services (plumbers, electricians, handymen)
• Masjid & MSA Events (halaqas, youth events)
• Wedding Services (henna, decor, photography - no catering yet)

Feel free to ask about any of these categories!`;
}

/**
 * Format a response when the message is unclear
 */
export function formatClarificationRequest(): string {
  return `I'm not quite sure what you're looking for. Could you please be more specific? For example:
• "I need a plumber in Scarborough"
• "Find me a math tutor near North York"
• "Are there any sisters' halaqas this weekend?"
• "Looking for a wedding photographer in the GTA"`;
}

/**
 * Format listing details for display
 */
export function formatListingSummary(listing: Listing): string {
  const parts: string[] = [
    `**${listing.title}**`,
    listing.description,
  ];

  if (listing.locationText) {
    parts.push(`📍 ${listing.locationText}`);
  }

  if (listing.pricing) {
    const { min, max, currency, unit } = listing.pricing;
    if (min && max) {
      parts.push(`💰 $${min}-$${max} ${currency}${unit ? `/${unit}` : ''}`);
    } else if (min) {
      parts.push(`💰 From $${min} ${currency}${unit ? `/${unit}` : ''}`);
    }
  }

  if (listing.yearsOfExperience) {
    parts.push(`⏱️ ${listing.yearsOfExperience} years experience`);
  }

  if (listing.communityEndorsements > 0) {
    parts.push(`⭐ ${listing.communityEndorsements} community endorsements`);
  }

  if (listing.responseTime) {
    parts.push(`⚡ Response time: ${listing.responseTime}`);
  }

  return parts.join('\n');
}

/**
 * Format multiple listings into a numbered list
 */
export function formatListingsList(listings: Listing[]): string {
  return listings
    .map((listing, index) => `\n${index + 1}. ${formatListingSummary(listing)}`)
    .join('\n\n');
}

/**
 * Format error message
 */
export function formatErrorResponse(): string {
  return `I apologize, but I encountered an error processing your request. Please try again, or rephrase your question. If the issue persists, please contact support.`;
}

/**
 * Format "no results" message
 */
export function formatNoResultsResponse(category?: Category, location?: string): string {
  const categoryText = category ? ` for ${category.label.toLowerCase()}` : '';
  const locationText = location ? ` in ${location}` : '';
  
  return `I couldn't find any matches${categoryText}${locationText} right now. This could mean:
• No providers have registered in this area yet
• Try expanding your location search
• Check back later as new providers join regularly inshaAllah

Would you like to search for something else?`;
}
