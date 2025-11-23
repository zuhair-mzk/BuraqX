import JoinForm from './JoinForm';

export default async function JoinPage() {
  // Fetch categories from API instead of direct Prisma to avoid server component issues
  let categories = [];
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/categories`, {
      cache: 'no-store',
    });
    
    if (response.ok) {
      categories = await response.json();
    }
  } catch (error) {
    console.error('[BURAQ_X] Failed to fetch categories:', error);
    // Fallback to hardcoded categories if database is unavailable
    categories = [
      { id: 'cat_stem_tutoring', slug: 'stem-tutoring', label: 'STEM Tutoring', type: 'tutoring', keywords: [] },
      { id: 'cat_freelance_creative', slug: 'freelance-creative', label: 'Creative Freelancers', type: 'freelance', keywords: [] },
      { id: 'cat_home_services', slug: 'home-services', label: 'Home Services', type: 'home_service', keywords: [] },
      { id: 'cat_masjid_msa_events', slug: 'masjid-msa-events', label: 'Masjid & MSA Events', type: 'event', keywords: [] },
      { id: 'cat_wedding_nonfood', slug: 'wedding-non-food', label: 'Wedding Services (Non-Food)', type: 'wedding', keywords: [] },
    ];
  }

  return <JoinForm categories={categories} />;
}

export const dynamic = 'force-dynamic';
