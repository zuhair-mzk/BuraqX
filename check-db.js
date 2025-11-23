const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  const cats = await prisma.category.findMany();
  console.log('\nCategories in DB:');
  cats.forEach(c => console.log('  ID:', c.id, '| Slug:', c.slug, '| Label:', c.label));
  
  const listings = await prisma.listing.findMany({ where: { status: 'approved' }, take: 3 });
  console.log('\nFirst 3 approved listings:');
  listings.forEach(l => console.log('  CategoryID:', l.categoryId, '| Title:', l.title));
  
  await prisma.$disconnect();
})();
