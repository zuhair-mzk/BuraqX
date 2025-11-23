/**
 * Suggestion Repository
 * In-memory storage for unsupported user queries
 * Used to track feature requests and prioritize new categories
 */

import { Suggestion } from '../models';

// In-memory storage
let suggestions: Suggestion[] = [];
let nextId = 1;

export const suggestionRepository = {
  /**
   * Add a new suggestion
   */
  async addSuggestion(
    rawQueryText: string,
    inferredCategory?: string,
    location?: string
  ): Promise<Suggestion> {
    const newSuggestion: Suggestion = {
      id: `suggestion_${nextId++}`,
      rawQueryText,
      inferredCategory,
      location,
      createdAt: new Date(),
    };

    suggestions.push(newSuggestion);
    console.log('[BURAQ_X] Logged suggestion:', newSuggestion.id, '-', rawQueryText);

    return newSuggestion;
  },

  /**
   * Get all suggestions (for admin review)
   */
  async getAllSuggestions(): Promise<Suggestion[]> {
    return [...suggestions].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  /**
   * Get suggestions count
   */
  async getSuggestionsCount(): Promise<number> {
    return suggestions.length;
  },

  /**
   * Get suggestions by category
   */
  async getSuggestionsByCategory(category: string): Promise<Suggestion[]> {
    return suggestions.filter(s => s.inferredCategory === category);
  },

  /**
   * Clear all suggestions (for admin)
   */
  async clearSuggestions(): Promise<void> {
    suggestions = [];
    nextId = 1;
    console.log('[BURAQ_X] Cleared all suggestions');
  },

  /**
   * Delete a specific suggestion
   */
  async deleteSuggestion(id: string): Promise<boolean> {
    const index = suggestions.findIndex(s => s.id === id);
    if (index === -1) return false;

    suggestions.splice(index, 1);
    console.log('[BURAQ_X] Deleted suggestion:', id);
    return true;
  },
};
