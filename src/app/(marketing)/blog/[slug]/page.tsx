import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

// Demo blog posts data (same as in the blog list page)
const blogPosts = [
  {
    id: "1",
    slug: "guide-complet-prompting-chatgpt-2024",
    title: "Le guide complet du prompting ChatGPT en 2024",
    excerpt:
      "Maîtrisez l'art du prompting avec nos techniques avancées pour obtenir les meilleures réponses de ChatGPT.",
    category: "Tutoriel",
    author: "Marie Leroux",
    date: new Date("2024-01-15"),
    readTime: 12,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=630&fit=crop",
    imageAlt: "Interface ChatGPT avec logo OpenAI",
    content: `
## Introduction au Prompting

Le prompting est l'art de communiquer efficacement avec les modèles d'IA comme ChatGPT. Une bonne maîtrise du prompting peut multiplier par 10 la qualité des réponses que vous obtenez.

## Les Fondamentaux

### 1. Soyez précis et spécifique

Au lieu de demander "Écris-moi un texte sur le marketing", préférez "Rédige un article de 500 mots sur les 5 tendances du marketing digital en 2024, avec des exemples concrets pour chaque tendance."

### 2. Donnez du contexte

Expliquez qui vous êtes, pour qui vous écrivez, et dans quel but. Plus vous donnez de contexte, meilleure sera la réponse.

### 3. Utilisez des exemples

Montrez à l'IA le format ou le style que vous attendez en lui donnant un exemple de ce que vous voulez obtenir.

## Techniques Avancées

### Le Chain of Thought (CoT)

Demandez à l'IA de raisonner étape par étape avant de donner sa réponse finale. Cela améliore significativement la qualité des réponses pour les problèmes complexes.

### Le Role Prompting

Assignez un rôle spécifique à l'IA : "Tu es un expert en SEO avec 15 ans d'expérience..."

## Conclusion

Le prompting est une compétence qui s'améliore avec la pratique. N'hésitez pas à expérimenter et à itérer sur vos prompts pour obtenir les meilleurs résultats.
    `,
  },
  {
    id: "2",
    slug: "ia-generative-tendances-2024",
    title: "Les 10 tendances de l'IA générative à suivre en 2024",
    excerpt:
      "De GPT-5 à Gemini, découvrez les innovations qui vont transformer notre façon de travailler cette année.",
    category: "Actualités",
    author: "Thomas Durand",
    date: new Date("2024-01-10"),
    readTime: 8,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop",
    imageAlt: "Robot humanoïde représentant l'IA générative",
    content: `
## L'IA Générative en 2024

L'année 2024 s'annonce comme une année charnière pour l'intelligence artificielle générative. Voici les 10 tendances majeures à surveiller.

## 1. Modèles Multimodaux

Les modèles capables de traiter texte, image, audio et vidéo simultanément deviennent la norme.

## 2. IA Locale

L'exécution de modèles d'IA directement sur nos appareils, sans connexion cloud, gagne en popularité.

## 3. Agents Autonomes

Les assistants IA capables d'effectuer des tâches complexes de manière autonome se développent rapidement.

## 4. Personnalisation Avancée

Les modèles s'adaptent de plus en plus aux préférences et au style de chaque utilisateur.

## 5. IA et Créativité

L'IA devient un partenaire créatif incontournable pour les artistes, designers et créateurs de contenu.

## Conclusion

2024 sera l'année où l'IA générative passera d'un outil de niche à un assistant quotidien pour des millions de professionnels.
    `,
  },
  {
    id: "3",
    slug: "automatiser-taches-repetitives-ia",
    title: "Comment automatiser vos tâches répétitives avec l'IA",
    excerpt:
      "Guide pratique pour identifier et automatiser les tâches chronophages de votre quotidien professionnel.",
    category: "Productivité",
    author: "Sophie Martin",
    date: new Date("2024-01-05"),
    readTime: 10,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop",
    imageAlt: "Dashboard d'automatisation et productivité",
    content: `
## Pourquoi Automatiser ?

Le temps passé sur des tâches répétitives est du temps perdu pour des activités à plus forte valeur ajoutée. L'IA peut vous aider à récupérer ce temps précieux.

## Identifier les Tâches Automatisables

### Critères de sélection

- Tâches répétitives et prévisibles
- Règles claires et définies
- Volume suffisant pour justifier l'automatisation

### Exemples concrets

- Réponses aux emails standards
- Génération de rapports
- Traitement de données
- Planification de réunions

## Outils Recommandés

### Make (ex-Integromat)

Excellent pour connecter différentes applications et créer des workflows automatisés.

### n8n

Alternative open-source puissante pour l'automatisation avancée.

### Zapier

Idéal pour les débutants avec une interface simple et intuitive.

## Conclusion

Commencez petit, automatisez une tâche à la fois, et mesurez les gains de temps obtenus.
    `,
  },
  {
    id: "4",
    slug: "chatgpt-vs-claude-comparatif",
    title: "ChatGPT vs Claude : quel assistant IA choisir ?",
    excerpt:
      "Comparatif détaillé des deux principaux assistants IA pour vous aider à faire le bon choix selon vos besoins.",
    category: "Comparatif",
    author: "Pierre Bernard",
    date: new Date("2024-01-02"),
    readTime: 15,
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=630&fit=crop",
    imageAlt: "Intelligence artificielle et comparaison technologique",
    content: `
## Introduction

ChatGPT d'OpenAI et Claude d'Anthropic sont les deux assistants IA les plus populaires. Mais lequel choisir selon vos besoins ?

## ChatGPT

### Points forts
- Écosystème riche avec plugins et GPTs
- Grande base d'utilisateurs et communauté active
- Intégration avec de nombreux outils

### Points faibles
- Peut parfois "halluciner"
- Limites de contexte plus strictes

## Claude

### Points forts
- Excellent en analyse de documents longs
- Réponses souvent plus nuancées
- Forte attention à l'éthique

### Points faibles
- Moins de plugins disponibles
- Communauté plus petite

## Verdict

- **Pour le code** : ChatGPT (avec GPT-4)
- **Pour l'analyse de documents** : Claude
- **Pour la créativité** : Les deux sont excellents
- **Pour les débutants** : ChatGPT (plus de ressources disponibles)

## Conclusion

Le meilleur choix dépend de votre cas d'usage. N'hésitez pas à tester les deux pour voir lequel correspond le mieux à vos besoins.
    `,
  },
  {
    id: "5",
    slug: "midjourney-debutant-guide",
    title: "Débuter avec Midjourney : créez vos premières images IA",
    excerpt:
      "Tutoriel pas à pas pour générer des images impressionnantes avec Midjourney, même sans expérience.",
    category: "Tutoriel",
    author: "Marie Leroux",
    date: new Date("2023-12-28"),
    readTime: 11,
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&h=630&fit=crop",
    imageAlt: "Art digital et création visuelle par IA",
    content: `
## Qu'est-ce que Midjourney ?

Midjourney est un outil d'IA générative qui crée des images à partir de descriptions textuelles. Il est particulièrement réputé pour la qualité artistique de ses créations.

## Premiers Pas

### 1. Créer un compte Discord

Midjourney fonctionne via Discord. Créez un compte si vous n'en avez pas.

### 2. Rejoindre le serveur Midjourney

Rendez-vous sur midjourney.com et rejoignez le serveur officiel.

### 3. Votre premier prompt

Utilisez la commande /imagine suivie de votre description.

## Techniques de Base

### Soyez descriptif

Plus votre prompt est détaillé, meilleur sera le résultat.

### Utilisez des styles

Ajoutez des références de style : "in the style of Van Gogh", "cinematic lighting", "8k resolution"

### Paramètres utiles

- --ar 16:9 : ratio d'aspect
- --v 6 : version du modèle
- --q 2 : qualité supérieure

## Conclusion

Midjourney est un outil puissant qui devient plus efficace avec la pratique. Expérimentez et amusez-vous !
    `,
  },
  {
    id: "6",
    slug: "ethique-ia-bonnes-pratiques",
    title: "Éthique et IA : les bonnes pratiques à adopter",
    excerpt:
      "Les principes essentiels pour utiliser l'IA de manière responsable et éthique dans votre travail.",
    category: "Éthique",
    author: "Thomas Durand",
    date: new Date("2023-12-20"),
    readTime: 7,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=630&fit=crop",
    imageAlt: "Éthique et intelligence artificielle",
    content: `
## Pourquoi l'Éthique IA est Importante

L'IA est un outil puissant qui peut avoir des impacts significatifs. Une utilisation responsable est essentielle.

## Principes Fondamentaux

### 1. Transparence

Soyez transparent sur votre utilisation de l'IA. Indiquez quand du contenu est généré par IA.

### 2. Vérification

Ne faites jamais confiance aveuglément aux réponses de l'IA. Vérifiez toujours les informations importantes.

### 3. Respect de la vie privée

Ne partagez pas de données personnelles sensibles avec les outils d'IA publics.

### 4. Propriété intellectuelle

Respectez les droits d'auteur. L'IA ne vous dispense pas des règles de propriété intellectuelle.

## Bonnes Pratiques au Quotidien

- Relisez et éditez le contenu généré
- Citez vos sources quand l'IA vous aide à les trouver
- Utilisez l'IA comme assistant, pas comme remplacement de votre jugement

## Conclusion

L'IA est un outil, et comme tout outil, son impact dépend de la façon dont nous l'utilisons. Adoptons des pratiques responsables pour construire un avenir où l'IA bénéficie à tous.
    `,
  },
];

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article non trouvé",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-12 md:py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au blog
            </Button>
          </Link>

          {/* Header */}
          <header className="mb-12">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-b py-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime} min de lecture
              </div>
            </div>
          </header>

          {/* Featured image */}
          <div className="aspect-video relative rounded-xl overflow-hidden mb-12">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            {post.content.split("\n").map((line, index) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              if (line.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                    {line.replace("### ", "")}
                  </h3>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={index} className="ml-4">
                    {line.replace("- ", "")}
                  </li>
                );
              }
              if (line.trim() === "") {
                return null;
              }
              return (
                <p key={index} className="mb-4 text-muted-foreground">
                  {line}
                </p>
              );
            })}
          </article>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-xl bg-muted/50 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Envie d'approfondir vos connaissances ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Découvrez nos cours complets sur l'Intelligence Artificielle.
            </p>
            <Link href="/cours">
              <Button>Voir les cours</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
