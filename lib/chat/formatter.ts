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
  return "As-salamu alaykum! I'm here to help you find trusted professionals in the community. What do you need help with today?";
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
export function formatUnsupportedResponse(message: string): string {
  const messageLower = message.toLowerCase().trim();
  
  // Greetings
  if (['hi', 'hey', 'hello', 'yo', 'yeo', 'sup', "what's up", 'howdy'].some(g => messageLower === g || messageLower.startsWith(g + ' '))) {
    return "Hey! What's up?";
  }
  
  // Thanks
  if (['thanks', 'thank you', 'thx', 'ty'].some(t => messageLower.includes(t))) {
    return "You're welcome!";
  }
  
  // How are you / how's everything variations
  if (messageLower.includes('how are you') || messageLower.includes('how r u') || 
      messageLower.includes("how's everything") || messageLower.includes("hows everything") ||
      messageLower.includes("how are things") || messageLower.includes("how's it going") ||
      messageLower.includes("hows it going") || messageLower.includes("how you doing")) {
    return "I'm good, thanks for asking! How can I help you today?";
  }
  
  // Responses to "how are you" or personal status
  if (messageLower.includes("i'm good") || messageLower.includes("im good") || 
      messageLower.includes("i'm fine") || messageLower.includes("im fine") ||
      messageLower.includes("doing good") || messageLower.includes("doing well")) {
    return "Nice! Let me know if you need anything.";
  }
  
  if (messageLower.includes("tired") || messageLower.includes("exhausted") || 
      messageLower.includes("sleepy") || messageLower.includes("worn out")) {
    return "Hope you get some rest! If you need anything, just let me know.";
  }
  
  if (messageLower.includes("busy") || messageLower.includes("stressed") || messageLower.includes("overwhelmed")) {
    return "I hear you. Let me know if there's anything I can help with!";
  }
  
  if (messageLower.includes("not bad") || messageLower.includes("alright") || messageLower.includes("okay")) {
    return "Cool. What can I do for you?";
  }
  
  // Generic help without specifics
  if (messageLower === 'help' || messageLower === 'i need help' || messageLower === 'can you help') {
    return "Sure! What do you need help with?";
  }
  
  // What questions
  if (messageLower.includes('what do you do') || messageLower.includes('what is this') || messageLower.includes('who are you')) {
    return "I help you find trusted professionals in the community. Just tell me what you're looking for!";
  }
  
  // Affirmations
  if (['ok', 'okay', 'cool', 'nice', 'great', 'awesome', 'perfect'].some(a => messageLower === a)) {
    return "👍";
  }
  
  // Default for unclear requests
  return "What can I help you with?";
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
