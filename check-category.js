const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  const cat = await prisma.category.findUnique({ where: { slug: 'stem-tutoring' } });
  console.log('STEM Category ID:', cat.id);
  console.log('Full category:', JSON.stringify(cat, null, 2));
  await prisma.$disconnect();
})();
