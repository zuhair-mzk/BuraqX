/**
 * Chat Parser
 * AI-powered parsing using OpenAI GPT-4o-mini for extracting category and location
 */

import { Category, GenderPreference } from '../models';
import { parseUserMessageWithAI } from '../openai';

interface ParsedRequest {
  categoryId: string | null;
  category: Category | null;
  location: string | null;
  genderPreference?: GenderPreference;
  urgency?: 'urgent' | 'flexible';
  tags: string[];
  isSupported: boolean;
  filters?: {
    minYearsExperience?: number;
    maxPrice?: number;
    certifications?: string[];
  };
}

/**
 * LEGACY: Extract location from message (kept as fallback)
 * Looks for common patterns like "in [location]", "near [location]", "[location] area"
 */
function extractLocation(message: string): string | null {
  const locationPatterns = [
    /(?:in|near|around|at)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g,
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+area/gi,
  ];

  for (const pattern of locationPatterns) {
    const match = message.match(pattern);
    if (match) {
      // Extract the location part
      const locationMatch = match[0].replace(/(in|near|around|at|area)/gi, '').trim();
      if (locationMatch.length > 2) {
        return locationMatch;
      }
    }
  }

  // Look for common GTA locations
  const gtaLocations = [
    'Scarborough', 'North York', 'Mississauga', 'Brampton', 'Markham',
    'Vaughan', 'Richmond Hill', 'Ajax', 'Pickering', 'Oshawa',
    'Oakville', 'Burlington', 'Milton', 'Downtown Toronto', 'Etobicoke',
    'Toronto', 'GTA', 'Greater Toronto Area'
  ];

  const messageLower = message.toLowerCase();
  for (const location of gtaLocations) {
    if (messageLower.includes(location.toLowerCase())) {
      return location;
    }
  }

  return null;
}

/**
 * Extract gender preference from message
 */
function extractGenderPreference(message: string): GenderPreference | undefined {
  const messageLower = message.toLowerCase();

  if (messageLower.includes('sister') || messageLower.includes('female') || messageLower.includes('woman')) {
    return 'female';
  }

  if (messageLower.includes('brother') || messageLower.includes('male') || messageLower.includes('man')) {
    return 'male';
  }

  return undefined;
}

/**
 * Extract urgency from message
 */
function extractUrgency(message: string): 'urgent' | 'flexible' | undefined {
  const messageLower = message.toLowerCase();

  if (
    messageLower.includes('urgent') ||
    messageLower.includes('emergency') ||
    messageLower.includes('asap') ||
    messageLower.includes('right now') ||
    messageLower.includes('today') ||
    messageLower.includes('tonight')
  ) {
    return 'urgent';
  }

  if (
    messageLower.includes('flexible') ||
    messageLower.includes('whenever') ||
    messageLower.includes('no rush')
  ) {
    return 'flexible';
  }

  return undefined;
}

/**
 * Main parsing function - NOW POWERED BY AI
 * Analyzes user message using GPT-4o-mini and extracts structured information
 */
export async function parseUserRequest(message: string, providedLocation?: string): Promise<ParsedRequest> {
  console.log('[BURAQ_X] Parsing user request with AI:', message);

  try {
    // Use AI to parse the message
    const result = await parseUserMessageWithAI(message, providedLocation);

    console.log('[BURAQ_X] AI parsed result:', {
      categoryId: result.categoryId,
      categoryLabel: result.category?.label,
      location: result.location,
      genderPreference: result.genderPreference,
      urgency: result.urgency,
      tags: result.tags,
      filters: result.filters,
      isSupported: result.isSupported,
    });

    return result;
  } catch (error) {
    console.error('[BURAQ_X] AI parsing failed, using fallback:', error);
    
    // Fallback to legacy keyword matching if AI fails
    const { V1_CATEGORIES } = require('../models');
    const messageLower = message.toLowerCase();
    const matchedTags: string[] = [];
    let matchedCategory: Category | null = null;

    for (const category of V1_CATEGORIES) {
      for (const keyword of category.keywords) {
        if (messageLower.includes(keyword.toLowerCase())) {
          matchedTags.push(keyword);
        }
      }
      if (matchedTags.length > 0) {
        matchedCategory = category;
        break;
      }
    }

    const extractedLocation = extractLocation(message);
    const location = providedLocation || extractedLocation;
    const genderPreference = extractGenderPreference(message);
    const urgency = extractUrgency(message);

    return {
      categoryId: matchedCategory?.id || null,
      category: matchedCategory,
      location,
      genderPreference,
      urgency,
      tags: matchedTags,
      isSupported: matchedCategory !== null,
    };
  }
}

/**
 * Check if a category is supported in V1
 */
export function isCategorySupported(categorySlug: string): boolean {
  // Import here to avoid circular dependency
  const { V1_CATEGORIES } = require('../models');
  return V1_CATEGORIES.some((cat: Category) => cat.slug === categorySlug);
}

/**
 * Get category by ID
 */
export function getCategoryById(categoryId: string): Category | null {
  const { V1_CATEGORIES } = require('../models');
  return V1_CATEGORIES.find((cat: Category) => cat.id === categoryId) || null;
}

/**
 * Get all V1 categories
 */
export function getAllCategories(): Category[] {
  const { V1_CATEGORIES } = require('../models');
  return V1_CATEGORIES;
}
