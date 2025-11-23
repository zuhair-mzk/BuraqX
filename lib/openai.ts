/**
 * OpenAI Client
 * Handles AI-powered chat parsing and semantic search
 */

import OpenAI from 'openai';
import { prisma } from './db';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Parse user message using GPT-4o-mini to extract structured information
 */
export async function parseUserMessageWithAI(
  message: string,
  providedLocation?: string
): Promise<{
  categoryId: string | null;
  category: any | null;
  location: string | null;
  genderPreference?: 'male' | 'female' | 'mixed' | 'unspecified';
  urgency?: 'urgent' | 'flexible';
  tags: string[];
  isSupported: boolean;
  filters: {
    minYearsExperience?: number | null;
    maxPrice?: number | null;
    certifications?: string[];
  };
  searchKeywords: string[];
  conversationalResponse?: string;
}> {
  // Fetch categories from database
  const categories = await prisma.category.findMany();
  
  const categoriesDescription = categories.map(
    (cat) => `- ${cat.label} (id: ${cat.id}, slug: ${cat.slug}): ${cat.description}`
  ).join('\n');

  const prompt = `You are an exceptionally intelligent, conversational AI assistant for Buraq X, a Muslim community service marketplace. You understand human language naturally, including vague, casual, or incomplete requests.

Available service categories:
${categoriesDescription}

User message: "${message}"
${providedLocation ? `User's location: ${providedLocation}` : ''}

YOUR ROLE: Interpret the user's intent like a helpful human concierge would. Be extremely flexible and understanding.

NATURAL LANGUAGE UNDERSTANDING:
Think like ChatGPT - understand context, implied meaning, and casual language:

ULTRA-FLEXIBLE QUERY EXAMPLES:
- "I need help" → Could be tutoring, home repair, or general services (look for context clues)
- "someone good" / "reliable person" / "great guy" → Generic search, use quality indicators
- "find me X" / "looking for X" / "need X" → Direct service request
- "can you help me with Y" → Service need for Y
- "who does Z around here" → Local service search for Z
- Just a subject: "calculus" / "physics" → Tutoring for that subject
- Just a service: "photographer" / "plumber" → Direct service category
- Conversational: "my sink is broken" → Home services/plumber
- Problem-based: "kid needs math help" → Tutoring
- Event-based: "planning my wedding" → Wedding services
- Community: "islamic classes" / "halaqa" → Masjid events
- Vague quality: "someone experienced" / "best tutor" → High-quality filter
- Comparison: "better option" / "alternative" → Quality preference
- Recommendation: "who would you recommend" → Open-ended search

CONTEXT CLUES TO EXTRACT:
1. SERVICE TYPE (primary goal):
   - Academic words → Tutoring
   - Creative/media → Freelancers  
   - Repair/fix/install → Home services
   - Religious/community → Events
   - Marriage/ceremony → Wedding

2. QUALITY SIGNALS (tag as keywords):
   - Adjectives: great, good, best, excellent, reliable, trusted, professional, experienced, expert, skilled, qualified, certified
   - Teaching style: patient, friendly, kind, understanding, clear, helpful, supportive
   - Professionalism: professional, punctual, organized, detailed, thorough
   - Budget: affordable, cheap, budget-friendly, reasonable, economical, inexpensive

3. SPECIFICS (tags):
   - Subjects: math, calculus, physics, chemistry, biology, English, programming, coding, etc.
   - Academic levels: elementary, middle school, high school, university, college, undergraduate, graduate
   - Skills: photography, videography, graphic design, web design, etc.
   - Services: plumbing, electrical, carpentry, painting, cleaning, etc.
   - Wedding: mehndi, henna, photography, catering, decor, venue
   - Events: halaqa, classes, lectures, Quran, tajweed, Islamic studies

4. PERSONAL PREFERENCES:
   - Gender: "sister", "brother", "female", "male", "woman", "man", "aunty", "uncle" → Gender preference
   - Age/experience: "young", "experienced", "veteran", "senior", "new" → Experience level
   - Personality: extract adjectives as tags

5. CONSTRAINTS:
   - Location: Any city, neighborhood, region in GTA or "near me", "local", "nearby"
   - Time: "urgent", "ASAP", "emergency", "soon", "tonight", "today" → urgent; "flexible", "whenever", "no rush" → flexible
   - Budget: Numbers with $ or words like "under", "max", "budget", "affordable"
   - Experience: Numbers with "years" → minYearsExperience

BE SMART ABOUT CONVERSATIONAL VS SERVICE REQUESTS:

CONVERSATIONAL (return null categoryId):
- Greetings: "hi", "hello", "hey", "yo", "yeo", "sup", "what's up"
- Small talk: "how are you", "thanks", "thank you", "ok", "cool", "nice"
- Clarifications: "what?", "huh?", "I don't know", "maybe", "not sure"
- Generic: "help", "I need help", "can you help me" (without specifics)
- Questions about the service: "what do you do", "how does this work", "who are you"

SERVICE REQUESTS (match to category):
- Specific needs: "I need a math tutor", "find me a plumber", "looking for photographer"
- Problem statements: "my sink is broken", "kid needs help with calculus"
- Direct subjects: "math tutor", "physics help", "wedding photography"
- Service-related: "fix", "repair", "teach", "photograph", "design" with context

MATCHING STRATEGY:
- If someone just says "math", "physics", "calculus" → STEM Tutoring
- If someone says "fix", "repair", "broken" with an object → Home Services  
- If someone mentions any creative skill → Creative Freelancers
- If someone mentions religious/community terms → Masjid Events
- If someone mentions marriage/ceremony → Wedding Services
- Extract ALL quality words as tags for better matching
- Be creative with synonyms and related concepts
- Generate rich searchKeywords for semantic search

CRITICAL RULE: Return null categoryId for pure conversation/greetings. Only match when there's a clear service need!

OUTPUT FORMAT (JSON):
{
  "categoryId": "exact_id_from_categories_above" (prefer guessing over null),
  "location": "extracted_location" or null,
  "genderPreference": "male" | "female" | "mixed" | "unspecified" | null,
  "urgency": "urgent" | "flexible" | null,
  "tags": ["ALL_extracted_quality_words", "subjects", "levels", "preferences", "styles", "inferred_needs"],
  "filters": {
    "minYearsExperience": number or null,
    "maxPrice": number or null,
    "certifications": ["specific_certs"] or []
  },
  "searchKeywords": ["key_concepts", "synonyms", "related_terms", "extracted_qualities", "inferred_terms"],
  "conversationalResponse": "natural_friendly_response_if_just_conversation" or null
}

CONVERSATIONAL RESPONSE GUIDELINES:
If the message is purely conversational (greetings, small talk, emotions), set categoryId to null and provide a natural, friendly conversationalResponse. Examples:
- "hey" → "Hey! What's up?"
- "how's everything" → "All good! What can I help you with?"
- "I'm tired" → "Hope you get some rest! Let me know if you need anything."
- "thanks" → "You're welcome!"
- Be warm, natural, and brief like a real conversation
- Don't mention services unless they ask

BE MAXIMALLY HELPFUL AND NATURAL - respond like a friendly human assistant!`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // Fast model for quick responses
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7, // High temperature for maximum creativity and flexibility
    response_format: { type: 'json_object' },
    max_tokens: 300, // Limit tokens for faster parsing responses
  });

  const result = JSON.parse(completion.choices[0].message.content || '{}');

  const category = categories.find((cat) => cat.id === result.categoryId) || null;

  return {
    categoryId: result.categoryId || null,
    category,
    location: result.location || providedLocation || null,
    genderPreference: result.genderPreference || undefined,
    urgency: result.urgency || undefined,
    tags: result.tags || [],
    isSupported: category !== null,
    filters: result.filters || {},
    searchKeywords: result.searchKeywords || [],
    conversationalResponse: result.conversationalResponse || undefined,
  };
}

/**
 * Generate embedding for text using OpenAI
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });

  return response.data[0].embedding;
}

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Search listings by semantic similarity to query
 * Enhanced with better context understanding
 */
export async function semanticSearchListings(
  query: string,
  listings: any[],
  searchKeywords: string[] = [],
  topK: number = 3
): Promise<any[]> {
  if (listings.length === 0) return [];

  // Enhance query with search keywords for better matching
  const enhancedQuery = searchKeywords.length > 0 
    ? `${query} ${searchKeywords.join(' ')}`
    : query;

  // Generate embedding for the enhanced query
  const queryEmbedding = await generateEmbedding(enhancedQuery);

  // Calculate similarity scores for each listing
  const scoredListings = await Promise.all(
    listings.map(async (listing) => {
      // Create rich searchable text from listing with emphasis on key fields
      const searchableText = `
        ${listing.title} ${listing.title}
        ${listing.description}
        ${listing.tags?.join(' ') || ''}
        ${listing.certifications?.join(' ') || ''}
        ${listing.yearsOfExperience ? `${listing.yearsOfExperience} years experience experienced professional` : ''}
        ${listing.genderOfProvider || ''}
        ${listing.locationText || ''}
        ${listing.pricingMin && listing.pricingMax ? `affordable budget-friendly ${listing.pricingMin}-${listing.pricingMax} price` : ''}
        ${listing.responseTime || ''}
        ${listing.communityEndorsements > 10 ? 'trusted reliable highly rated' : ''}
      `.trim();

      const listingEmbedding = await generateEmbedding(searchableText);
      const similarity = cosineSimilarity(queryEmbedding, listingEmbedding);

      return {
        listing,
        similarity,
      };
    })
  );

  // Sort by similarity and return top K
  scoredListings.sort((a, b) => b.similarity - a.similarity);

  return scoredListings.slice(0, topK).map((item) => item.listing);
}

export default openai;
