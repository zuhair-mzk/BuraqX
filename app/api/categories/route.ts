/**
 * Categories API Route
 * GET /api/categories - Fetch all categories from database
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { label: 'asc' },
    });

    console.log('[BURAQ_X] Fetched', categories.length, 'categories from database');

    return NextResponse.json(categories);
  } catch (error) {
    console.error('[BURAQ_X] Categories API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
