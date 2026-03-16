const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const columns = await prisma.$queryRaw`PRAGMA table_info(ProductCategory)`;
        console.log("Columns:", columns.map(c => c.name).join(", "));
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

check();
