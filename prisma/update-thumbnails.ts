import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const thumbnailMap: Record<string, string> = {
  // Cours existants avec chemins locaux à mettre à jour
  "chatgpt-basics": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  "prompting-basics": "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&q=80",
  "midjourney": "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=800&q=80",
  "advanced-prompting": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
  "automation": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  "rag-chatbot": "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80",
};

async function main() {
  console.log("Mise à jour des thumbnails...");

  // Récupérer tous les cours
  const courses = await prisma.course.findMany();

  for (const course of courses) {
    // Vérifier si le thumbnail est un chemin local
    if (course.thumbnail && course.thumbnail.startsWith("/courses/")) {
      // Extraire le nom du fichier
      const filename = course.thumbnail.replace("/courses/", "").replace(".jpg", "");

      // Chercher dans le map
      const newThumbnail = thumbnailMap[filename];

      if (newThumbnail) {
        await prisma.course.update({
          where: { id: course.id },
          data: { thumbnail: newThumbnail },
        });
        console.log(`Updated: ${course.title} -> ${newThumbnail}`);
      } else {
        // Utiliser une image par défaut basée sur la catégorie
        let defaultThumbnail = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80";

        if (course.category === "image") {
          defaultThumbnail = "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=800&q=80";
        } else if (course.category === "automation") {
          defaultThumbnail = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80";
        } else if (course.category === "prompting") {
          defaultThumbnail = "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&q=80";
        }

        await prisma.course.update({
          where: { id: course.id },
          data: { thumbnail: defaultThumbnail },
        });
        console.log(`Updated with default: ${course.title} -> ${defaultThumbnail}`);
      }
    } else if (!course.thumbnail || !course.thumbnail.startsWith("https://")) {
      // Pas de thumbnail ou pas une URL
      const defaultThumbnail = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80";
      await prisma.course.update({
        where: { id: course.id },
        data: { thumbnail: defaultThumbnail },
      });
      console.log(`Set default for: ${course.title}`);
    } else {
      console.log(`Skipped (already valid): ${course.title}`);
    }
  }

  console.log("Mise à jour terminée!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
