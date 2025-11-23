/**
 * Core data models for Buraq X
 * These types define the shape of all domain entities in the application
 */

// ========== USER TYPES ==========

export type UserRole = 'user' | 'supplier' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

// ========== CATEGORY TYPES ==========

export type CategoryType = 'tutoring' | 'freelance' | 'home_service' | 'event' | 'wedding';

export interface Category {
  id: string;
  slug: string;
  label: string;
  type: CategoryType;
  description?: string;
  keywords: string[]; // For keyword matching in chat parser
}

// ========== LISTING TYPES ==========

export type ListingType = 'supplier' | 'freelancer' | 'masjid_msa';
export type ListingStatus = 'pending' | 'approved' | 'rejected';
export type GenderPreference = 'male' | 'female' | 'mixed' | 'unspecified';

export interface PricingInfo {
  min?: number;
  max?: number;
  currency: string;
  unit?: string; // 'hour', 'session', 'project', etc.
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  type: ListingType;
  
  // Location (text-based for V1)
  locationText: string; // e.g., "Scarborough, ON" or "North York, Toronto"
  
  // Metadata
  tags: string[];
  isFeatured: boolean;
  status: ListingStatus;
  
  // Enhanced fields for better matching
  genderOfProvider?: GenderPreference;
  certifications?: string[];
  yearsOfExperience?: number;
  pricing?: PricingInfo;
  responseTime?: string; // "within 24h", "same day", etc.
  communityEndorsements: number; // Count of endorsements (for V1, just a number)
  
  // Contact info (placeholder for V1)
  contactEmail?: string;
  contactPhone?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// ========== EVENT LISTING ==========

export interface EventListing extends Listing {
  eventDate?: Date;
  eventTime?: string;
  recurring: boolean;
  recurringPattern?: string; // "weekly", "monthly", etc.
  genderRestriction?: 'brothers_only' | 'sisters_only' | 'mixed';
}

// ========== SUGGESTION ==========

export interface Suggestion {
  id: string;
  rawQueryText: string;
  inferredCategory?: string;
  location?: string;
  createdAt: Date;
}

// ========== CHAT TYPES ==========

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  location?: string;
  preferences?: {
    genderPreference?: GenderPreference;
    urgency?: 'urgent' | 'flexible';
    timeframe?: string;
  };
  conversationId?: string;
}

export interface ChatResponse {
  answerText: string;
  matches: Listing[];
  category: Category | null;
  isSupported: boolean;
}

// ========== CONSTANTS ==========

/**
 * V1 Supported Categories
 * These are the only categories we handle in the MVP
 */
export const V1_CATEGORIES: Category[] = [
  {
    id: 'cat_stem_tutoring',
    slug: 'stem-tutoring',
    label: 'STEM Tutoring',
    type: 'tutoring',
    description: 'Math, Physics, Computer Science, Engineering tutoring',
    keywords: ['tutor', 'tutoring', 'math', 'physics', 'computer science', 'programming', 'coding', 'engineering', 'calculus', 'algebra', 'chemistry', 'biology', 'stem'],
  },
  {
    id: 'cat_freelance_creative',
    slug: 'freelance-creative',
    label: 'Creative Freelancers',
    type: 'freelance',
    description: 'Photographers, videographers, designers, editors',
    keywords: ['photographer', 'photography', 'videographer', 'videography', 'video', 'designer', 'graphic design', 'editor', 'editing', 'creative', 'freelancer'],
  },
  {
    id: 'cat_home_services',
    slug: 'home-services',
    label: 'Home Services',
    type: 'home_service',
    description: 'Plumber, electrician, handyman, appliance repair',
    keywords: ['plumber', 'plumbing', 'electrician', 'electrical', 'handyman', 'repair', 'appliance', 'hvac', 'contractor', 'home service', 'maintenance'],
  },
  {
    id: 'cat_masjid_msa_events',
    slug: 'masjid-msa-events',
    label: 'Masjid & MSA Events',
    type: 'event',
    description: 'Halaqas, youth nights, community events',
    keywords: ['masjid', 'mosque', 'msa', 'halaqa', 'halaqah', 'event', 'youth', 'sisters', 'brothers', 'community', 'islamic event', 'prayer', 'isha', 'maghrib'],
  },
  {
    id: 'cat_wedding_nonfood',
    slug: 'wedding-non-food',
    label: 'Wedding Services (Non-Food)',
    type: 'wedding',
    description: 'Henna, decor, photography, planning (no catering)',
    keywords: ['wedding', 'henna', 'mehndi', 'decor', 'decoration', 'wedding planner', 'nikkah', 'walima'],
  },
];
