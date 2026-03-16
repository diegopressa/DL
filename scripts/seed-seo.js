const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    // Upsert global settings
    await prisma.seoSettings.upsert({
        where: { id: 1 },
        update: {},
        create: {
            siteName: 'DL Diseño & Estampado',
            defaultTitleTemplate: '{{page_title}} | DL Diseño & Estampado',
            defaultMetaDesc: 'Uniformes y prendas personalizadas para empresas en Uruguay.',
        }
    });

    // Default pages
    const pages = [
        {
            pageSlug: '/',
            pageName: 'Home',
            metaTitle: 'Uniformes de Trabajo Personalizados en Uruguay | DL Diseño & Estampado',
            metaDesc: 'Fabricamos uniformes de trabajo personalizados para empresas. Remeras, camperas y buzos con estampado profesional y entrega rápida en Uruguay.',
            keywords: 'uniformes de trabajo uruguay, uniformes personalizados empresas, remeras personalizadas empresas, camperas personalizadas, ropa de trabajo uruguay',
            ogTitle: 'Uniformes personalizados para empresas | DL Diseño & Estampado',
            ogDesc: 'Remeras, camperas y uniformes personalizados para empresas con entrega rápida en Uruguay.',
            robotsIndex: true,
            robotsFollow: true,
        },
        { pageSlug: '/uniformes', pageName: 'Uniformes', robotsIndex: true, robotsFollow: true },
        { pageSlug: '/remeras-personalizadas', pageName: 'Remeras Personalizadas', robotsIndex: true, robotsFollow: true },
        { pageSlug: '/camperas-personalizadas', pageName: 'Camperas Personalizadas', robotsIndex: true, robotsFollow: true },
        { pageSlug: '/buzos-canguros', pageName: 'Buzos / Canguros', robotsIndex: true, robotsFollow: true },
        { pageSlug: '/contacto', pageName: 'Contacto', robotsIndex: true, robotsFollow: true },
    ];

    for (const page of pages) {
        await prisma.seoMetadata.upsert({
            where: { pageSlug: page.pageSlug },
            update: {},
            create: page,
        });
    }

    console.log('SEO data seeded!');
    await prisma.$disconnect();
}

seed().catch(e => { console.error(e); process.exit(1); });
