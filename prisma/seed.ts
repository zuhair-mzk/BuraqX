/**
 * Prisma Seed Script
 * Populates database with initial categories and sample listings
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('[BURAQ_X] Starting database seed...');

  // Create Categories
  console.log('[BURAQ_X] Creating categories...');
  
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'stem-tutoring' },
      update: {},
      create: {
        id: 'cat_stem_tutoring',
        slug: 'stem-tutoring',
        label: 'STEM Tutoring',
        type: 'tutoring',
        description: 'Math, Physics, Computer Science, Engineering tutoring',
        keywords: ['tutor', 'tutoring', 'math', 'physics', 'computer science', 'programming', 'coding', 'engineering', 'calculus', 'algebra', 'chemistry', 'biology', 'stem'],
      },
    }),
    prisma.category.upsert({
      where: { slug: 'freelance-creative' },
      update: {},
      create: {
        id: 'cat_freelance_creative',
        slug: 'freelance-creative',
        label: 'Creative Freelancers',
        type: 'freelance',
        description: 'Photographers, videographers, designers, editors',
        keywords: ['photographer', 'photography', 'videographer', 'videography', 'video', 'designer', 'graphic design', 'editor', 'editing', 'creative', 'freelancer'],
      },
    }),
    prisma.category.upsert({
      where: { slug: 'home-services' },
      update: {},
      create: {
        id: 'cat_home_services',
        slug: 'home-services',
        label: 'Home Services',
        type: 'home_service',
        description: 'Plumber, electrician, handyman, appliance repair',
        keywords: ['plumber', 'plumbing', 'electrician', 'electrical', 'handyman', 'repair', 'appliance', 'hvac', 'contractor', 'home service', 'maintenance'],
      },
    }),
    prisma.category.upsert({
      where: { slug: 'masjid-msa-events' },
      update: {},
      create: {
        id: 'cat_masjid_msa_events',
        slug: 'masjid-msa-events',
        label: 'Masjid & MSA Events',
        type: 'event',
        description: 'Halaqas, youth nights, community events',
        keywords: ['masjid', 'mosque', 'msa', 'halaqa', 'halaqah', 'event', 'youth', 'sisters', 'brothers', 'community', 'islamic event', 'prayer', 'isha', 'maghrib'],
      },
    }),
    prisma.category.upsert({
      where: { slug: 'wedding-non-food' },
      update: {},
      create: {
        id: 'cat_wedding_nonfood',
        slug: 'wedding-non-food',
        label: 'Wedding Services (Non-Food)',
        type: 'wedding',
        description: 'Henna, decor, photography, planning (no catering)',
        keywords: ['wedding', 'henna', 'mehndi', 'decor', 'decoration', 'wedding planner', 'nikkah', 'walima'],
      },
    }),
  ]);

  console.log(`[BURAQ_X] Created ${categories.length} categories`);  console.log(`[BURAQ_X] Created ${categories.length} categories`);

  // Create Sample Listings
  console.log('[BURAQ_X] Creating sample listings...');

  const homeServicesCategory = categories.find(c => c.slug === 'home-services');
  const stemTutoringCategory = categories.find(c => c.slug === 'stem-tutoring');
  const masjidEventsCategory = categories.find(c => c.slug === 'masjid-msa-events');
  const weddingCategory = categories.find(c => c.slug === 'wedding-non-food');

  await prisma.listing.createMany({
    data: [
      {
        title: 'Professional Plumbing Services',
        description: 'Experienced plumber serving Scarborough area. Available for emergency calls. Specializing in residential plumbing, leak repairs, and installations.',
        categoryId: homeServicesCategory!.id,
        type: 'supplier',
        locationText: 'Scarborough, ON',
        tags: ['plumbing', 'emergency', 'residential'],
        isFeatured: true,
        status: 'approved',
        genderOfProvider: 'male',
        yearsOfExperience: 8,
        pricingMin: 80,
        pricingMax: 150,
        pricingCurrency: 'CAD',
        pricingUnit: 'hour',
        responseTime: 'within 2 hours',
        communityEndorsements: 12,
        contactEmail: 'plumber@example.com',
      },
      {
        title: 'Math & Physics Tutor - University Level',
        description: 'PhD student offering tutoring in calculus, linear algebra, and physics. Patient and experienced with helping students achieve their goals.',
        categoryId: stemTutoringCategory!.id,
        type: 'freelancer',
        locationText: 'North York, Toronto',
        tags: ['math', 'physics', 'calculus', 'university'],
        isFeatured: false,
        status: 'approved',
        genderOfProvider: 'female',
        yearsOfExperience: 5,
        pricingMin: 40,
        pricingMax: 60,
        pricingCurrency: 'CAD',
        pricingUnit: 'hour',
        responseTime: 'within 24 hours',
        communityEndorsements: 8,
        contactEmail: 'mathtutor@example.com',
      },
      {
        title: 'Sisters-Only Halaqa - Weekly',
        description: 'Join us every Saturday after Maghrib for a sisters-only halaqa. Topics include Quran tafsir, hadith studies, and contemporary Islamic issues. All ages welcome.',
        categoryId: masjidEventsCategory!.id,
        type: 'masjid_msa',
        locationText: 'Mississauga, ON',
        tags: ['halaqa', 'sisters', 'quran', 'weekly'],
        isFeatured: true,
        status: 'approved',
        communityEndorsements: 24,
        recurring: true,
        recurringPattern: 'weekly',
        genderRestriction: 'sisters_only',
      },
      {
        title: 'Wedding Photography & Videography',
        description: 'Professional Muslim photographer specializing in halal wedding photography. Separate services available for brothers and sisters events.',
        categoryId: weddingCategory!.id,
        type: 'freelancer',
        locationText: 'Greater Toronto Area',
        tags: ['wedding', 'photography', 'videography', 'halal'],
        isFeatured: false,
        status: 'approved',
        genderOfProvider: 'male',
        yearsOfExperience: 6,
        pricingMin: 1500,
        pricingMax: 3500,
        pricingCurrency: 'CAD',
        pricingUnit: 'event',
        responseTime: 'within 48 hours',
        communityEndorsements: 15,
        contactEmail: 'weddingphoto@example.com',
      },
      {
        title: 'Computer Science & Programming Tutor',
        description: 'Software engineer with 10 years experience. Teaching Python, Java, JavaScript, data structures, algorithms, and web development.',
        categoryId: stemTutoringCategory!.id,
        type: 'freelancer',
        locationText: 'Downtown Toronto',
        tags: ['programming', 'python', 'java', 'web development'],
        isFeatured: true,
        status: 'approved',
        genderOfProvider: 'male',
        certifications: ['Google Cloud Certified', 'AWS Certified Developer'],
        yearsOfExperience: 10,
        pricingMin: 50,
        pricingMax: 80,
        pricingCurrency: 'CAD',
        pricingUnit: 'hour',
        responseTime: 'within 24 hours',
        communityEndorsements: 19,
        contactEmail: 'codingtutor@example.com',
      },
    ],
    skipDuplicates: true,
  });

  console.log('[BURAQ_X] Created sample listings');
  console.log('[BURAQ_X] Seed completed successfully! 🎉');
}

main()
  .catch((e) => {
    console.error('[BURAQ_X] Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
