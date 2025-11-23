/**
 * Validation schemas for Buraq X using Zod
 * These schemas validate form inputs and API requests/responses
 */

import { z } from 'zod';

// ========== USER SCHEMAS ==========

export const userRoleSchema = z.enum(['user', 'supplier', 'admin']);

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: userRoleSchema,
  createdAt: z.date(),
});

// ========== CATEGORY SCHEMAS ==========

export const categoryTypeSchema = z.enum(['tutoring', 'freelance', 'home_service', 'event', 'wedding']);

export const categorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  label: z.string(),
  type: categoryTypeSchema,
  description: z.string().optional(),
  keywords: z.array(z.string()),
});

// ========== LISTING SCHEMAS ==========

export const listingTypeSchema = z.enum(['supplier', 'freelancer', 'masjid_msa']);
export const listingStatusSchema = z.enum(['pending', 'approved', 'rejected']);
export const genderPreferenceSchema = z.enum(['male', 'female', 'mixed', 'unspecified']);

export const pricingInfoSchema = z.object({
  min: z.number().positive().optional(),
  max: z.number().positive().optional(),
  currency: z.string().default('CAD'),
  unit: z.string().optional(),
});

export const listingSchema = z.object({
  id: z.string(),
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
  categoryId: z.string(),
  type: listingTypeSchema,
  locationText: z.string().min(3, 'Location is required'),
  tags: z.array(z.string()),
  isFeatured: z.boolean().default(false),
  status: listingStatusSchema,
  genderOfProvider: genderPreferenceSchema.optional(),
  certifications: z.array(z.string()).optional(),
  yearsOfExperience: z.number().int().min(0).max(50).optional(),
  pricing: pricingInfoSchema.optional(),
  responseTime: z.string().optional(),
  communityEndorsements: z.number().int().min(0).default(0),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const eventListingSchema = listingSchema.extend({
  eventDate: z.date().optional(),
  eventTime: z.string().optional(),
  recurring: z.boolean().default(false),
  recurringPattern: z.string().optional(),
  genderRestriction: z.enum(['brothers_only', 'sisters_only', 'mixed']).optional(),
});

// ========== SUGGESTION SCHEMA ==========

export const suggestionSchema = z.object({
  id: z.string(),
  rawQueryText: z.string().min(1),
  inferredCategory: z.string().optional(),
  location: z.string().optional(),
  createdAt: z.date(),
});

// ========== CHAT SCHEMAS ==========

export const chatRequestSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(500),
  location: z.string().optional(),
  preferences: z.object({
    genderPreference: genderPreferenceSchema.optional(),
    urgency: z.enum(['urgent', 'flexible']).optional(),
    timeframe: z.string().optional(),
  }).optional(),
  conversationId: z.string().optional(),
});

export const chatResponseSchema = z.object({
  answerText: z.string(),
  matches: z.array(listingSchema),
  category: categorySchema.nullable(),
  isSupported: z.boolean(),
});

// ========== FORM SCHEMAS ==========

/**
 * Schema for the onboarding form when suppliers/freelancers join
 */
export const onboardingFormSchema = z.object({
  // Basic info
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  orgName: z.string().max(100).optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(20).optional(),
  
  // Profile type and category
  type: listingTypeSchema,
  categoryId: z.string().min(1, 'Please select a category'),
  
  // Location and description
  locationText: z.string().min(3, 'Location is required').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
  
  // Additional fields
  tags: z.string().transform((str: string) => str.split(',').map((tag: string) => tag.trim()).filter(Boolean)),
  genderOfProvider: genderPreferenceSchema.optional(),
  certifications: z.string().transform((str: string) => str.split(',').map((cert: string) => cert.trim()).filter(Boolean)).optional(),
  yearsOfExperience: z.coerce.number().int().min(0).max(50).optional(),
  
  // Pricing
  pricingMin: z.coerce.number().positive().optional(),
  pricingMax: z.coerce.number().positive().optional(),
  pricingCurrency: z.string().default('CAD'),
  pricingUnit: z.string().optional(),
  
  responseTime: z.string().optional(),
  
  // For event listings
  isEvent: z.boolean().default(false),
  eventDate: z.coerce.date().optional(),
  eventTime: z.string().optional(),
  recurring: z.boolean().default(false),
  recurringPattern: z.string().optional(),
  genderRestriction: z.enum(['brothers_only', 'sisters_only', 'mixed']).optional(),
});

/**
 * Schema for admin actions on listings
 */
export const adminActionSchema = z.object({
  action: z.enum(['approve', 'reject', 'toggle_featured']),
  listingId: z.string(),
});

// ========== TYPE EXPORTS ==========

export type UserRole = z.infer<typeof userRoleSchema>;
export type User = z.infer<typeof userSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Listing = z.infer<typeof listingSchema>;
export type EventListing = z.infer<typeof eventListingSchema>;
export type Suggestion = z.infer<typeof suggestionSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;
export type AdminAction = z.infer<typeof adminActionSchema>;
