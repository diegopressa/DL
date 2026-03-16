const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const whyUs = await prisma.whyChooseUs.findMany();
  console.log('WhyUs count:', whyUs.length);
  
  if (whyUs.length === 0) {
      console.log('Seeding initial why us items...');
      await prisma.whyChooseUs.createMany({
          data: [
            { title: "Nos encargamos de todo", description: "Desde la selección de la prenda hasta el estampado final y la logística.", order: 1 },
            { title: "Presupuesto inmediato", description: "Te damos una respuesta rápida para que no pierdas tiempo en gesitones.", order: 2 },
            { title: "Entrega rápida", description: "Cumplimos con plazos de 24 a 48 horas en pedidos seleccionados.", order: 3 },
            { title: "Experiencia con empresas", description: "Entendemos las necesidades corporativas y los estándares de calidad.", order: 4 },
            { title: "Proceso simple y ágil", description: "Menos burocracia, más soluciones directas para tu equipo.", order: 5 }
          ]
      });
      console.log('WhyUs seeded successfully.');
  }

  const whyUsSection = await prisma.whyUsSection.findUnique({ where: { id: 1 }});
  if (!whyUsSection) {
     console.log('Seeding WhyUs Section...');
     await prisma.whyUsSection.create({
         data: {
             id: 1,
             title: "Por qué las empresas nos eligen",
             subtitle: "Combinamos materiales de primera con un servicio enfocado en resolver las necesidades de tu negocio.",
             backgroundColor: "#5a87ba"
         }
     });
     console.log('Section seeded');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
