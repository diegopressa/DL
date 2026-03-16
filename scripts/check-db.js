const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const categories = await prisma.productCategory.findMany();
        console.log("Categories:", JSON.stringify(categories, null, 2));
        
        const products = await prisma.product.findMany({
            include: {
                images: true,
                colors: true,
                features: true
            }
        });
        console.log("Products:", JSON.stringify(products, null, 2));
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

check();
