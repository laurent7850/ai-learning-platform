"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Target,
  FolderOpen,
  Mail,
  FileText,
  BarChart3,
  MessageCircle,
  RefreshCw,
  Reply,
  GraduationCap,
  Dumbbell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TipBox, Quiz, CodeBlock } from "@/components/courses/interactive";
import { MarkCompleteButton } from "@/components/courses/mark-complete-button";
import { cn } from "@/lib/utils";
import type { InteractiveLessonProps } from "@/components/courses/lesson-content";

const sections = [
  { id: "intro", label: "Introduction" },
  { id: "emails", label: "Emails" },
  { id: "content", label: "Contenu" },
  { id: "practice", label: "Pratique" },
  { id: "recap", label: "Récap" },
];

const useCases = [
  {
    icon: Mail,
    title: "Emails professionnels",
    description: "Répondre, relancer, prospecter — en 30 secondes",
  },
  {
    icon: FileText,
    title: "Création de contenu",
    description: "Posts LinkedIn, articles, descriptions produits",
  },
  {
    icon: BarChart3,
    title: "Résumés & synthèses",
    description: "Condensez des documents longs en points clés",
  },
  {
    icon: MessageCircle,
    title: "Réponses clients",
    description: "FAQ, support, avis — répondez avec cohérence",
  },
];

const emailTypes = [
  {
    id: "prospection",
    icon: Target,
    title: "Email de prospection",
    description: "Premier contact avec un prospect",
  },
  {
    id: "relance",
    icon: RefreshCw,
    title: "Email de relance",
    description: "Suivre sans être insistant",
  },
  {
    id: "reponse",
    icon: Reply,
    title: "Réponse à une demande",
    description: "Répondre de façon professionnelle",
  },
];

const emailDemos: Record<string, { badge: string; prompt: string; result: string }> = {
  prospection: {
    badge: "Prospection",
    prompt: `[Contexte] Je suis consultant SEO. Je contacte le responsable marketing d'une PME e-commerce qui a un site mal référencé.

[Action] Rédige un email de premier contact qui propose de l'aide sans être trop vendeur.

[Format] Objet accrocheur + corps de 80 mots max + 1 question pour engager.

[Ton] Professionnel, direct, axé sur la valeur pour lui.`,
    result: `Objet : Votre site perd 40% de trafic potentiel (et comment y remédier)

Bonjour Marie,

En analysant votre secteur, j'ai remarqué que votre site e-commerce n'apparaît pas sur plusieurs mots-clés stratégiques — des requêtes que vos concurrents captent déjà.

C'est souvent un problème technique simple à corriger, mais qui coûte des milliers d'euros en ventes perdues chaque mois.

Seriez-vous ouverte à un audit gratuit de 15 minutes pour identifier ces opportunités ?

Cordialement,
[Votre nom]`,
  },
  relance: {
    badge: "Relance",
    prompt: `[Contexte] J'ai envoyé une proposition de consulting il y a 8 jours, sans réponse. Le prospect semblait intéressé lors de notre appel.

[Action] Rédige une relance qui ne soit pas insistante mais qui rappelle la valeur.

[Format] Court (50 mots max), avec une raison valable de relancer.

[Ton] Amical, pas désespéré, orienté solution.`,
    result: `Objet : Re: Proposition consulting — une question rapide

Bonjour Pierre,

Je me permets de revenir vers vous suite à notre échange. J'ai pensé à un cas d'usage supplémentaire qui pourrait vous faire gagner 5h/semaine sur votre process actuel.

Avez-vous eu le temps de parcourir la proposition ? Je reste dispo pour en discuter.

Bonne journée,
[Votre nom]`,
  },
  reponse: {
    badge: "Réponse",
    prompt: `[Contexte] Un client mécontent se plaint d'un retard de livraison (2 jours). C'est un bon client fidèle.

[Action] Rédige une réponse qui s'excuse, explique, et propose une compensation.

[Format] Empathie d'abord, explication courte, action concrète.

[Ton] Sincère, humble, orienté solution.`,
    result: `Objet : Toutes nos excuses pour ce retard — voici ce que nous faisons

Bonjour Sophie,

Je comprends parfaitement votre frustration et je vous présente nos sincères excuses pour ce retard de livraison.

Un problème logistique exceptionnel a perturbé nos envois cette semaine. Votre commande est en route et arrivera demain avant 14h.

Pour me faire pardonner, je vous offre 20% sur votre prochaine commande (code: MERCI20).

Merci pour votre patience et votre fidélité.

Bien à vous,
[Votre nom]`,
  },
};

const linkedinPrompt = `[Contexte] Je suis [votre métier] et je veux partager une leçon apprise récemment.

[Action] Écris un post LinkedIn sur [sujet] qui commence par une accroche forte.

[Format]
- Accroche (1 ligne percutante)
- Histoire/Contexte (2-3 lignes)
- Leçon principale (2-3 lignes)
- Call-to-action sous forme de question

[Ton] Authentique, professionnel mais humain. Pas de jargon.

[Contrainte] Maximum 150 mots. Pas d'émojis excessifs (3 max).`;

const productPrompt = `[Contexte] Je vends [produit] sur ma boutique en ligne. Ma cible : [description client idéal].

[Action] Rédige une description produit qui convertit.

[Format]
- Titre accrocheur
- 3 bénéfices clés (pas de caractéristiques techniques)
- Social proof / usage
- CTA

[Ton] Enthousiaste mais pas "vendeur agressif". Focus sur la transformation.`;

export function UseCaseBeginnerLesson({ lessonId, isCompleted, nextLessonUrl }: InteractiveLessonProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [selectedEmailType, setSelectedEmailType] = useState<string | null>(null);
  const [practiceInput, setPracticeInput] = useState("");
  const [practiceFeedback, setPracticeFeedback] = useState<{ type: "good" | "improve"; message: string } | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const progress = Math.round((completedSections.size / sections.length) * 100);

  const goToSection = (index: number) => {
    if (currentSection < index && currentSection >= 0) {
      setCompletedSections((prev) => new Set([...prev, currentSection]));
    }
    setCurrentSection(index);
    // Scroll vers le haut du conteneur de leçon
    const scrollContainer = document.getElementById("lesson-content-scroll");
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const checkPractice = () => {
    const input = practiceInput.toLowerCase();
    const hasContext = input.includes("contexte") || input.includes("consultant") || input.includes("freelance");
    const hasAction = input.includes("action") || input.includes("relance") || input.includes("email");
    const hasTone = input.includes("ton") || input.includes("professionnel") || input.includes("amical");

    if (hasContext && hasAction) {
      setPracticeFeedback({
        type: "good",
        message: `Excellent ! Votre prompt contient les éléments essentiels. ${hasTone ? "Le ton est bien spécifié." : "Conseil : ajoutez une indication sur le ton souhaité."}`,
      });
    } else {
      const missing = [];
      if (!hasContext) missing.push("Contexte (qui êtes-vous, situation)");
      if (!hasAction) missing.push("Action (que voulez-vous)");
      setPracticeFeedback({
        type: "improve",
        message: `Il manque : ${missing.join(", ")}. Reprenez la structure CRAFT du Module 1 !`,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar - Design épuré */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs text-muted-foreground whitespace-nowrap">Progression</span>
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-medium text-amber-500">{progress}%</span>
      </div>

      {/* Navigation Tabs - Design léger */}
      <div className="flex flex-wrap gap-1.5 mb-8 justify-center">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => goToSection(index)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
              currentSection === index
                ? "bg-amber-500 text-white shadow-sm"
                : completedSections.has(index)
                ? "bg-amber-500/10 text-amber-600"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {section.label}
            {completedSections.has(index) && <span className="ml-1 text-[10px]">✓</span>}
          </button>
        ))}
      </div>

      {/* Section Content */}
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Introduction */}
        {currentSection === 0 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Du prompt à l'action</h2>
                  <p className="text-sm text-muted-foreground">Transformez vos compétences en résultats concrets</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Dans le Module 1, vous avez appris à construire des prompts efficaces avec la formule{" "}
                <strong className="text-foreground">CRAFT</strong>. Maintenant, passons à la pratique avec des cas
                d'usage que vous rencontrez chaque jour.
              </p>

              <TipBox variant="tip" icon="💡" title="Objectif de ce module :">
                À la fin, vous saurez utiliser l'IA pour rédiger des emails, créer du contenu, et automatiser vos
                tâches répétitives — le tout en quelques secondes.
              </TipBox>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600">
                  <FolderOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Ce que vous allez apprendre</h2>
                  <p className="text-sm text-muted-foreground">4 cas d'usage essentiels</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {useCases.map((useCase) => {
                  const Icon = useCase.icon;
                  return (
                    <div
                      key={useCase.title}
                      className="bg-muted/30 rounded-xl p-4 border border-border hover:border-amber-500 transition-all"
                    >
                      <Icon className="h-8 w-8 text-amber-500 mb-2" />
                      <h3 className="font-semibold">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground">{useCase.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => goToSection(1)} className="gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                Commencer avec les emails
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Emails */}
        {currentSection === 1 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Cas d'usage #1 : Emails professionnels</h2>
                  <p className="text-sm text-muted-foreground">Le cas d'usage le plus courant et le plus rentable</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Vous passez probablement <strong className="text-foreground">2-3 heures par jour</strong> sur vos
                emails. Avec les bons prompts, vous pouvez réduire ce temps de 70%.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-semibold mb-4">📬 Types d'emails que l'IA peut rédiger</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {emailTypes.map((emailType) => {
                  const Icon = emailType.icon;
                  const isSelected = selectedEmailType === emailType.id;
                  return (
                    <button
                      key={emailType.id}
                      onClick={() => setSelectedEmailType(emailType.id)}
                      className={cn(
                        "text-left p-4 rounded-xl border transition-all hover:-translate-y-1",
                        isSelected
                          ? "border-amber-500 bg-amber-500/5"
                          : "border-border bg-muted/30 hover:border-amber-500"
                      )}
                    >
                      <Icon className="h-8 w-8 text-amber-500 mb-2" />
                      <h4 className="font-semibold">{emailType.title}</h4>
                      <p className="text-sm text-muted-foreground">{emailType.description}</p>
                    </button>
                  );
                })}
              </div>

              {selectedEmailType && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-muted/30 rounded-xl p-5 border border-border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">🔍 Démonstration en direct</span>
                    <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 font-medium">
                      {emailDemos[selectedEmailType].badge}
                    </span>
                  </div>

                  <CodeBlock code={emailDemos[selectedEmailType].prompt} label="Prompt" />

                  <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                    <p className="text-xs uppercase tracking-wider text-green-500 font-semibold mb-2">
                      ✨ Résultat généré par l'IA
                    </p>
                    <div className="whitespace-pre-wrap text-sm">{emailDemos[selectedEmailType].result}</div>
                  </div>
                </motion.div>
              )}
            </div>

            <TipBox variant="tip" icon="⚡" title="Astuce gain de temps :">
              Créez une "bibliothèque" de prompts pour vos emails récurrents. Vous n'aurez qu'à ajuster le nom du
              destinataire et le contexte !
            </TipBox>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => goToSection(0)} className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Retour
              </Button>
              <Button onClick={() => goToSection(2)} className="gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                Création de contenu
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Content */}
        {currentSection === 2 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Cas d'usage #2 : Création de contenu</h2>
                  <p className="text-sm text-muted-foreground">Produisez du contenu de qualité en quelques minutes</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Que ce soit pour les réseaux sociaux, votre blog, ou vos fiches produits, l'IA peut vous aider à créer
                du contenu engageant tout en gardant <strong className="text-foreground">votre ton de voix</strong>.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-semibold mb-4">🎨 Templates de prompts pour le contenu</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-amber-500 font-semibold mb-3">📱 Post LinkedIn</h4>
                  <CodeBlock code={linkedinPrompt} label="Template" />
                </div>

                <div>
                  <h4 className="text-amber-500 font-semibold mb-3">🛒 Description produit</h4>
                  <CodeBlock code={productPrompt} label="Template" />
                </div>
              </div>
            </div>

            <TipBox variant="tip" icon="🎯" title="La règle d'or du contenu IA :">
              L'IA produit le brouillon, VOUS ajoutez votre touche personnelle. Un bon contenu = IA (80% du travail) +
              votre expertise (20% de finition).
            </TipBox>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => goToSection(1)} className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Retour
              </Button>
              <Button onClick={() => goToSection(3)} className="gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                Passer à la pratique
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Practice */}
        {currentSection === 3 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">À vous de jouer !</h2>
                  <p className="text-sm text-muted-foreground">Mettez en pratique ce que vous avez appris</p>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "bg-muted/30 rounded-2xl p-6 border-2 border-dashed transition-all",
                practiceFeedback ? "border-amber-500 border-solid" : "border-border"
              )}
            >
              <div className="bg-background rounded-xl p-4 mb-4 border-l-4 border-amber-500">
                <p className="text-xs uppercase tracking-wider text-amber-500 font-semibold mb-1">📋 Scénario</p>
                <p>
                  Vous êtes consultant freelance en marketing digital. Un prospect vous a contacté il y a une semaine
                  mais n'a pas répondu à votre première proposition. Rédigez un{" "}
                  <strong>prompt pour créer un email de relance</strong> efficace.
                </p>
              </div>

              <label className="block font-semibold mb-2">Votre prompt :</label>
              <textarea
                value={practiceInput}
                onChange={(e) => setPracticeInput(e.target.value)}
                placeholder={`Écrivez votre prompt ici en utilisant la structure CRAFT...

Exemple de début :
[Contexte] Je suis consultant freelance en marketing digital...`}
                className="w-full min-h-[150px] p-4 bg-background border border-border rounded-xl font-mono text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-y"
              />

              <Button onClick={checkPractice} className="mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                ✓ Vérifier mon prompt
              </Button>

              {practiceFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "mt-4 p-4 rounded-xl border",
                    practiceFeedback.type === "good"
                      ? "bg-green-500/10 border-green-500/30 text-green-500"
                      : "bg-blue-500/10 border-blue-500/30 text-blue-500"
                  )}
                >
                  <strong>{practiceFeedback.type === "good" ? "✅ " : "💡 À améliorer : "}</strong>
                  {practiceFeedback.message}
                </motion.div>
              )}
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-semibold mb-4">🎯 Mini-Quiz</h3>

              <Quiz
                question="Pour un email de prospection, quel élément est le PLUS important dans votre prompt ?"
                options={[
                  { text: "La longueur exacte de l'email", isCorrect: false },
                  { text: "Le contexte sur votre cible et son problème", isCorrect: true },
                  { text: "Le nombre d'émojis à utiliser", isCorrect: false },
                  { text: "La signature à ajouter", isCorrect: false },
                ]}
                correctFeedback="Le contexte sur votre cible permet à l'IA de personnaliser le message. Un email générique = poubelle. Un email qui parle du problème du prospect = réponse !"
                incorrectFeedback="Le contexte sur votre cible est l'élément clé. Il permet à l'IA de personnaliser le message pour parler du problème spécifique du prospect."
                onComplete={() => setQuizAnswered(true)}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => goToSection(2)} className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Retour
              </Button>
              <Button onClick={() => goToSection(4)} className="gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                Voir le récapitulatif
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Recap */}
        {currentSection === 4 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Récapitulatif du Module 2</h2>
                  <p className="text-sm text-muted-foreground">Ce que vous avez appris</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "Emails professionnels",
                    description: "Prospection, relance, réponse — avec les bons éléments de contexte",
                  },
                  {
                    title: "Création de contenu",
                    description: "Posts LinkedIn, descriptions produits — avec votre ton de voix",
                  },
                  {
                    title: "Templates réutilisables",
                    description: "Des structures de prompts prêtes à l'emploi pour gagner du temps",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl border border-border"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs shrink-0">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl border border-amber-500/30">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-2">Module 2 terminé !</h3>
              <p className="text-muted-foreground mb-6">
                Vous êtes maintenant capable d'utiliser l'IA pour vos tâches quotidiennes.
              </p>

              <TipBox variant="tip" icon="🚀" title="Prochaine étape :">
                Le Module 3 vous apprendra à automatiser ces tâches avec des workflows — pour ne plus jamais réécrire
                les mêmes prompts !
              </TipBox>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => goToSection(3)} className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Revoir la pratique
              </Button>
            </div>

            {/* Marquer comme terminée - uniquement sur la dernière section */}
            {lessonId && (
              <div className="mt-8 pt-8 border-t">
                <MarkCompleteButton
                  lessonId={lessonId}
                  isCompleted={isCompleted || false}
                  nextLessonUrl={nextLessonUrl}
                />
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
