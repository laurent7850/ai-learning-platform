import { PrismaClient, Level, Plan } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Création du cours de Prompt Engineering...");

  // Supprimer le cours existant s'il existe
  const existingCourse = await prisma.course.findUnique({
    where: { slug: "prompt-engineering" },
  });

  if (existingCourse) {
    await prisma.course.delete({
      where: { slug: "prompt-engineering" },
    });
    console.log("Cours existant supprimé.");
  }

  // Créer le cours principal
  const course = await prisma.course.create({
    data: {
      slug: "prompt-engineering",
      title: "Maîtriser le Prompt Engineering",
      description:
        "Apprenez à communiquer efficacement avec l'IA. Du niveau débutant avec la formule CRAFT aux techniques avancées comme le Chain of Thought et le Few-Shot prompting.",
      thumbnail: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&q=80",
      level: Level.BEGINNER,
      category: "prompting",
      duration: 180,
      published: true,
      requiredPlan: Plan.FREE,
      chapters: {
        create: [
          {
            title: "Module 1 : Les Fondamentaux",
            order: 1,
            lessons: {
              create: [
                {
                  title: "Construire un Prompt Idéal",
                  slug: "prompt-ideal-debutant",
                  content: "INTERACTIVE_LESSON:prompting-beginner",
                  duration: 45,
                  order: 1,
                  isFree: true,
                },
              ],
            },
          },
          {
            title: "Module 2 : Cas d'usage au quotidien",
            order: 2,
            lessons: {
              create: [
                {
                  title: "Cas d'usage IA au quotidien",
                  slug: "usecase-debutant",
                  content: "INTERACTIVE_LESSON:usecase-beginner",
                  duration: 45,
                  order: 1,
                  isFree: true,
                },
              ],
            },
          },
          {
            title: "Module 3 : Techniques Avancées",
            order: 3,
            lessons: {
              create: [
                {
                  title: "Prompt Engineering Avancé",
                  slug: "prompt-avance-intermediaire",
                  content: "INTERACTIVE_LESSON:prompting-intermediate",
                  duration: 45,
                  order: 1,
                  isFree: false,
                },
              ],
            },
          },
          {
            title: "Module 4 : Cas d'usage avancés",
            order: 4,
            lessons: {
              create: [
                {
                  title: "Cas d'usage IA avancés",
                  slug: "usecase-intermediaire",
                  content: "INTERACTIVE_LESSON:usecase-intermediate",
                  duration: 45,
                  order: 1,
                  isFree: false,
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      chapters: {
        include: {
          lessons: true,
        },
      },
    },
  });

  console.log("Cours créé avec succès:");
  console.log(`  - Titre: ${course.title}`);
  console.log(`  - Slug: ${course.slug}`);
  console.log(`  - Durée: ${course.duration} minutes`);
  console.log(`  - Chapitres: ${course.chapters.length}`);
  course.chapters.forEach((chapter) => {
    console.log(`    - ${chapter.title}: ${chapter.lessons.length} leçon(s)`);
    chapter.lessons.forEach((lesson) => {
      console.log(`      - ${lesson.title} (${lesson.isFree ? "Gratuit" : "Premium"})`);
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
