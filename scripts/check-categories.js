
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.productCategory.findMany();
  console.log('Categories count:', categories.length);
  console.log(JSON.stringify(categories, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
