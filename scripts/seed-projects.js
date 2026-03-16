const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();
  console.log('Projects count:', projects.length);
  
  if (projects.length === 0) {
      console.log('Seeding initial projects...');
      await prisma.project.createMany({
          data: [
            {
                title: "Uniformes Logística",
                category: "Chalecos y Gorros",
                imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600",
                order: 1
            },
            {
                title: "Equipo Gastronómico",
                category: "Delantales Bordados",
                imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600",
                order: 2
            },
            {
                title: "Ropa de Seguridad",
                category: "Camperas Alta Visibilidad",
                imageUrl: "https://images.unsplash.com/photo-1533038590840-1cde6e56f29f?auto=format&fit=crop&q=80&w=600",
                order: 3
            },
            {
                title: "Merchandising Evento",
                category: "Remeras Algodón",
                imageUrl: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&q=80&w=600",
                order: 4
            }
          ]
      });
      console.log('Projects seeded successfully.');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
