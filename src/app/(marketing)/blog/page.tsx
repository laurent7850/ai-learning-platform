import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Actualités, tutoriels et conseils sur l'Intelligence Artificielle pour rester à jour sur les dernières innovations.",
};

// Demo blog posts (in production, would come from a CMS or database)
const blogPosts = [
  {
    id: "1",
    slug: "guide-complet-prompting-chatgpt-2024",
    title: "Le guide complet du prompting ChatGPT en 2024",
    excerpt:
      "Maîtrisez l'art du prompting avec nos techniques avancées pour obtenir les meilleures réponses de ChatGPT.",
    image: "/blog/prompting-guide.jpg",
    category: "Tutoriel",
    author: "Marie Leroux",
    date: new Date("2024-01-15"),
    readTime: 12,
  },
  {
    id: "2",
    slug: "ia-generative-tendances-2024",
    title: "Les 10 tendances de l'IA générative à suivre en 2024",
    excerpt:
      "De GPT-5 à Gemini, découvrez les innovations qui vont transformer notre façon de travailler cette année.",
    image: "/blog/trends-2024.jpg",
    category: "Actualités",
    author: "Thomas Durand",
    date: new Date("2024-01-10"),
    readTime: 8,
  },
  {
    id: "3",
    slug: "automatiser-taches-repetitives-ia",
    title: "Comment automatiser vos tâches répétitives avec l'IA",
    excerpt:
      "Guide pratique pour identifier et automatiser les tâches chronophages de votre quotidien professionnel.",
    image: "/blog/automation.jpg",
    category: "Productivité",
    author: "Sophie Martin",
    date: new Date("2024-01-05"),
    readTime: 10,
  },
  {
    id: "4",
    slug: "chatgpt-vs-claude-comparatif",
    title: "ChatGPT vs Claude : quel assistant IA choisir ?",
    excerpt:
      "Comparatif détaillé des deux principaux assistants IA pour vous aider à faire le bon choix selon vos besoins.",
    image: "/blog/comparison.jpg",
    category: "Comparatif",
    author: "Pierre Bernard",
    date: new Date("2024-01-02"),
    readTime: 15,
  },
  {
    id: "5",
    slug: "midjourney-debutant-guide",
    title: "Débuter avec Midjourney : créez vos premières images IA",
    excerpt:
      "Tutoriel pas à pas pour générer des images impressionnantes avec Midjourney, même sans expérience.",
    image: "/blog/midjourney.jpg",
    category: "Tutoriel",
    author: "Marie Leroux",
    date: new Date("2023-12-28"),
    readTime: 11,
  },
  {
    id: "6",
    slug: "ethique-ia-bonnes-pratiques",
    title: "Éthique et IA : les bonnes pratiques à adopter",
    excerpt:
      "Les principes essentiels pour utiliser l'IA de manière responsable et éthique dans votre travail.",
    image: "/blog/ethics.jpg",
    category: "Éthique",
    author: "Thomas Durand",
    date: new Date("2023-12-20"),
    readTime: 7,
  },
];

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="py-12 md:py-20">
      <div className="container">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Actualités, tutoriels et conseils pour maîtriser l'Intelligence
            Artificielle et booster votre productivité.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <Link href={`/blog/${featuredPost.slug}`} className="group">
            <article className="grid gap-8 lg:grid-cols-2 items-center rounded-2xl border bg-card overflow-hidden">
              <div className="relative aspect-video lg:aspect-square bg-muted">
                {featuredPost.image ? (
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                )}
              </div>
              <div className="p-8">
                <Badge className="mb-4">{featuredPost.category}</Badge>
                <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime} min de lecture
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </div>

        {/* Other Posts */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <article className="h-full rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video bg-muted">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {post.readTime} min
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline">
            Voir plus d'articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
