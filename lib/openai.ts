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
    minYearsExperience?: number;
    maxPrice?: number;
    certifications?: string[];
  };
  searchKeywords: string[];
}> {
  // Fetch categories from database
  const categories = await prisma.category.findMany();
  
  const categoriesDescription = categories.map(
    (cat) => `- ${cat.label} (id: ${cat.id}, slug: ${cat.slug}): ${cat.description}`
  ).join('\n');

  const prompt = `You are a highly intelligent assistant for Buraq X, a Muslim community service marketplace. Your job is to understand natural language queries and match them to service providers.

Available service categories:
${categoriesDescription}

User message: "${message}"
${providedLocation ? `User's location: ${providedLocation}` : ''}

TASK: Analyze the user's message deeply and extract structured search criteria.

UNDERSTANDING INTENT:
- Vague queries like "find me a great guy", "someone reliable", "good tutor" → Look for quality indicators
- Phrases like "great", "excellent", "experienced", "reliable", "trusted" → Extract as quality expectations
- Budget hints like "affordable", "cheap", "reasonable" → Set lower price ranges
- Specific subjects like "calculus", "programming", "physics" → Extract as tags for matching
- Academic levels like "university", "high school", "elementary" → Extract as tags
- Personal preferences like "patient", "friendly", "professional" → Extract as tags
- Gender hints: "sister", "brother", "female", "male", "woman", "man" → Gender preference
- Time urgency: "urgent", "ASAP", "soon", "tonight", "flexible", "whenever" → Urgency level

CATEGORY MATCHING:
- "tutor", "tutoring", "teach", "help with math/science" → STEM Tutoring
- "photographer", "videographer", "designer", "creative" → Creative Freelancers
- "plumber", "electrician", "repair", "handyman", "fix" → Home Services
- "masjid", "mosque", "halaqa", "event", "sisters circle" → Masjid & MSA Events
- "wedding", "henna", "mehndi", "nikah", "walima" → Wedding Services

QUALITY INDICATORS (extract as tags):
- "great", "excellent", "experienced", "reliable", "trusted", "professional" → High quality expectation
- "patient", "friendly", "understanding", "kind" → Teaching style preference
- "expert", "specialist", "best", "top" → Expert level
- "affordable", "cheap", "budget", "reasonable" → Budget-conscious

FILTERS:
- Years of experience: Extract numbers like "10 years", "experienced", "veteran" → minYearsExperience
- Price: "under $50", "affordable", "budget" → maxPrice (estimate if vague)
- Certifications: "certified", "licensed", "P.Eng", "degree" → Extract if specific

OUTPUT FORMAT (JSON):
{
  "categoryId": "use_actual_category_id_from_list_above" or null,
  "location": "extracted_city_or_area" or null,
  "genderPreference": "male" | "female" | "mixed" | "unspecified" | null,
  "urgency": "urgent" | "flexible" | null,
  "tags": ["quality_tags", "subject_tags", "level_tags", "style_tags"],
  "filters": {
    "minYearsExperience": number or null,
    "maxPrice": number or null,
    "certifications": ["specific_certs"] or []
  },
  "searchKeywords": ["important_words_for_semantic_search"]
}

IMPORTANT: Use the EXACT category ID from the list above, not a made-up ID.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    response_format: { type: 'json_object' },
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
