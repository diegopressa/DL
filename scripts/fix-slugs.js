const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
    try {
        const products = await prisma.product.findMany();
        for (const prod of products) {
            const cleanSlug = prod.slug.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
            if (cleanSlug !== prod.slug) {
                console.log(`Fixing slug for ${prod.name}: ${prod.slug} -> ${cleanSlug}`);
                await prisma.product.update({
                    where: { id: prod.id },
                    data: { slug: cleanSlug }
                });
            }
        }
        console.log("Done fixing slugs.");
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

fix();
