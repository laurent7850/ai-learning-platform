import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, Target, Heart, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez notre mission : rendre l'Intelligence Artificielle accessible à tous et transformer votre façon de travailler.",
};

const values = [
  {
    icon: Users,
    title: "Accessibilité",
    description:
      "Nous croyons que tout le monde peut apprendre l'IA, sans prérequis technique.",
  },
  {
    icon: Target,
    title: "Pratique",
    description:
      "Nos cours sont conçus pour être appliqués immédiatement dans votre quotidien.",
  },
  {
    icon: Heart,
    title: "Qualité",
    description:
      "Nous mettons à jour régulièrement nos contenus pour suivre les évolutions de l'IA.",
  },
  {
    icon: Lightbulb,
    title: "Éthique",
    description:
      "Nous promouvons une utilisation responsable et éthique de l'IA.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Notre mission : démocratiser l'Intelligence Artificielle
          </h1>
          <p className="text-lg text-muted-foreground">
            Nous avons créé AI Academy avec une conviction simple : l'IA ne doit
            pas rester un domaine réservé aux experts techniques. Chacun peut et
            doit pouvoir bénéficier de cette révolution technologique.
          </p>
        </div>

        {/* Story */}
        <div className="grid gap-12 lg:grid-cols-2 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold mb-4">Notre histoire</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Tout a commencé fin 2022, avec l'arrivée de ChatGPT. Nous avons
                vu le potentiel immense de ces outils, mais aussi la confusion
                qui les entourait. Beaucoup de personnes voulaient apprendre,
                mais ne savaient pas par où commencer.
              </p>
              <p>
                Nous avons alors décidé de créer une plateforme qui rendrait
                l'apprentissage de l'IA simple, pratique et accessible. Pas de
                jargon technique inutile, pas de prérequis en programmation.
                Juste des cours clairs et applicables.
              </p>
              <p>
                Aujourd'hui, plus de 10 000 personnes ont transformé leur façon
                de travailler grâce à nos formations. Des entrepreneurs, des
                marketeurs, des RH, des développeurs... tous unis par une même
                envie : maîtriser l'IA pour gagner en productivité.
              </p>
            </div>
          </div>
          <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
              <div className="text-center">
                <p className="text-6xl font-bold text-primary mb-2">10K+</p>
                <p className="text-lg text-muted-foreground">
                  apprenants satisfaits
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-12">Nos valeurs</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-xl border bg-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="text-center mb-20">
          <h2 className="text-2xl font-bold mb-4">Une équipe passionnée</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Derrière AI Academy, une équipe de pédagogues et de passionnés d'IA
            qui travaillent chaque jour pour vous offrir les meilleurs contenus.
          </p>
          <Button asChild>
            <Link href="/contact">
              Nous contacter
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
