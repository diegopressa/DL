const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const processSteps = await prisma.processStep.findMany();
  console.log('Process steps count:', processSteps.length);
  
  if (processSteps.length === 0) {
      console.log('Seeding initial process steps...');
      await prisma.processStep.createMany({
          data: [
            { number: 1, title: "Nos escribís", description: "Contactanos por WhatsApp con tu idea inicial.", order: 1 },
            { number: 2, title: "Te asesoramos", description: "Elegimos juntos la prenda que mejor se adapte.", order: 2 },
            { number: 3, title: "Presupuesto", description: "Te enviamos una cotización formal inmediata.", order: 3 },
            { number: 4, title: "Definición", description: "Confirmamos diseño, talles y personalización.", order: 4 },
            { number: 5, title: "Entrega", description: "Producimos y enviamos tu pedido en 24-48h.", order: 5 }
          ]
      });
      console.log('Process Steps seeded successfully.');
  }

  const processSection = await prisma.processSection.findUnique({ where: { id: 1 }});
  if (!processSection) {
     console.log('Seeding Process Section...');
     await prisma.processSection.create({
         data: {
             id: 1,
             title: "Así de simple es trabajar con DL",
             subtitle: ""
         }
     });
     console.log('Section seeded');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
