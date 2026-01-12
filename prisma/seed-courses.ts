import { PrismaClient, Level, Plan } from "@prisma/client";

const prisma = new PrismaClient();

const courses = [
  {
    slug: "introduction-chatgpt",
    title: "Introduction à ChatGPT",
    description: "Apprenez les bases de ChatGPT et comment l'utiliser efficacement pour vos tâches quotidiennes. Ce cours vous guidera à travers les fondamentaux de l'IA conversationnelle.",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    level: Level.BEGINNER,
    category: "chatgpt",
    duration: 120,
    requiredPlan: Plan.FREE,
    published: true,
  },
  {
    slug: "prompting-avance",
    title: "Prompting Avancé",
    description: "Maîtrisez l'art du prompting pour obtenir des résultats optimaux avec les modèles de langage. Techniques avancées et meilleures pratiques.",
    thumbnail: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&q=80",
    level: Level.INTERMEDIATE,
    category: "prompting",
    duration: 180,
    requiredPlan: Plan.BEGINNER,
    published: true,
  },
  {
    slug: "midjourney-creation-images",
    title: "Création d'images avec Midjourney",
    description: "Générez des images impressionnantes avec Midjourney, de la conception à la réalisation. Apprenez à créer des visuels uniques.",
    thumbnail: "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=800&q=80",
    level: Level.BEGINNER,
    category: "image",
    duration: 150,
    requiredPlan: Plan.FREE,
    published: true,
  },
  {
    slug: "automatisation-ia",
    title: "Automatisation avec l'IA",
    description: "Automatisez vos tâches répétitives en utilisant les outils d'IA les plus performants. Gagnez du temps et augmentez votre productivité.",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    level: Level.INTERMEDIATE,
    category: "automation",
    duration: 240,
    requiredPlan: Plan.PRO,
    published: true,
  },
  {
    slug: "claude-ai-assistant",
    title: "Maîtriser Claude AI",
    description: "Découvrez Claude, l'assistant IA d'Anthropic, et apprenez à l'utiliser pour vos projets professionnels et personnels.",
    thumbnail: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80",
    level: Level.BEGINNER,
    category: "chatgpt",
    duration: 90,
    requiredPlan: Plan.FREE,
    published: true,
  },
  {
    slug: "dall-e-creation-visuelle",
    title: "DALL-E : Création Visuelle",
    description: "Créez des visuels uniques avec DALL-E et intégrez-les dans vos projets créatifs. De l'idée à l'image finale.",
    thumbnail: "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=800&q=80",
    level: Level.INTERMEDIATE,
    category: "image",
    duration: 160,
    requiredPlan: Plan.BEGINNER,
    published: true,
  },
];

async function main() {
  console.log("Seeding courses...");

  for (const course of courses) {
    const existing = await prisma.course.findUnique({
      where: { slug: course.slug },
    });

    if (existing) {
      await prisma.course.update({
        where: { slug: course.slug },
        data: course,
      });
      console.log(`Updated: ${course.title}`);
    } else {
      await prisma.course.create({
        data: course,
      });
      console.log(`Created: ${course.title}`);
    }
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
