const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const products = await prisma.product.findMany({
            select: { id: true, name: true, slug: true, categoryId: true }
        });
        console.log("Products:", JSON.stringify(products, null, 2));
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

check();
