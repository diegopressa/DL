const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    try {
        // 1. Delete existing test products in category 1 to avoid confusion
        await prisma.product.deleteMany({
            where: { categoryId: 1 }
        });

        // 2. Create Remera Algodón Manga Corta
        const p1 = await prisma.product.create({
            data: {
                name: "Remera Algodón Manga Corta",
                slug: "remera-algodon-manga-corta",
                description: "Remera de algodón 100% con cuello a la base y costuras reforzadas. Ideal para uniformes corporativos.",
                highlight: "Con tu logo y entrega en 24hs",
                materials: "Algodón 200g/m²",
                categoryId: 1,
                order: 1,
                images: {
                    create: [
                        { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800", order: 0 },
                        { url: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&q=80&w=800", order: 1 },
                        { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800", order: 2 }
                    ]
                },
                colors: {
                    create: [
                        { name: "Negro", hex: "#1a1a1a" },
                        { name: "Blanco", hex: "#f5f5f5" },
                        { name: "Gris", hex: "#9e9e9e" },
                        { name: "Rojo", hex: "#e53935" },
                        { name: "Azul marino", hex: "#1a237e" }
                    ]
                },
                features: {
                    create: [
                        { text: "100% algodón gramaje premium" },
                        { text: "Logo estampado frente, espalda o mangas" },
                        { text: "Estampados sin límite de colores" },
                        { text: "Cuello a la base y costuras reforzadas" },
                        { text: "Todos los talles disponibles" }
                    ]
                }
            }
        });

        // 3. Create Polo Piqué Premium
        const p2 = await prisma.product.create({
            data: {
                name: "Polo Piqué Premium",
                slug: "polo-pique-premium",
                description: "Chomba polo de tela piqué de alta resistencia. Elegancia y profesionalismo para tu equipo.",
                highlight: "Bordado de alta definición",
                materials: "Piqué Premium",
                categoryId: 1,
                order: 2,
                images: {
                    create: [
                        { url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800", order: 0 },
                        { url: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800", order: 1 }
                    ]
                },
                colors: {
                    create: [
                        { name: "Azul Marino", hex: "#1a237e" },
                        { name: "Blanco", hex: "#ffffff" },
                        { name: "Negro", hex: "#000000" },
                        { name: "Bordo", hex: "#800000" }
                    ]
                },
                features: {
                    create: [
                        { text: "Tela Piqué 65/35 poliéster/algodón" },
                        { text: "Cuello y puños tejidos" },
                        { text: "Corte entallado o clásico" },
                        { text: "Ideal para bordado de logo en pecho" },
                        { text: "No destiñe ni deforma con los lavados" }
                    ]
                }
            }
        });

        console.log("Products seeded:", p1.name, p2.name);
    } catch (e) {
        console.error("Error seeding:", e);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
