"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, MessageSquare, Target, Sparkles, FileText, Smartphone, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Quiz,
  PromptBuilder,
  Checklist,
  Comparison,
  FormulaDisplay,
  TipBox,
} from "@/components/courses/interactive";
import { MarkCompleteButton } from "@/components/courses/mark-complete-button";
import { cn } from "@/lib/utils";
import type { InteractiveLessonProps } from "@/components/courses/lesson-content";

const sections = [
  { id: "intro", label: "Introduction" },
  { id: "formula", label: "La Formule" },
  { id: "examples", label: "Exemples" },
  { id: "practice", label: "Pratique" },
  { id: "quiz", label: "Quiz Final" },
];

const craftItems = [
  {
    id: "context",
    title: "Contexte",
    emoji: "🎭",
    description: 'Expliquez la situation. Qui êtes-vous ? Dans quel cadre ? Exemple : "Je suis propriétaire d\'une petite boulangerie..."',
  },
  {
    id: "role",
    title: "Rôle",
    emoji: "👤",
    description: 'Donnez une expertise à l\'IA. Exemple : "Agis comme un expert en marketing digital..."',
  },
  {
    id: "action",
    title: "Action",
    emoji: "🎯",
    description: 'Dites clairement ce que vous voulez. Exemple : "Crée 5 idées de posts..."',
  },
  {
    id: "format",
    title: "Format",
    emoji: "📋",
    description: 'Précisez comment vous voulez la réponse. Exemple : "Sous forme de liste à puces avec émojis..."',
  },
  {
    id: "tone",
    title: "Ton",
    emoji: "🎨",
    description: 'Indiquez le style souhaité. Exemple : "Avec un ton chaleureux et convivial..."',
  },
];

const builderFields = [
  {
    id: "context",
    label: "Contexte",
    emoji: "🎭",
    placeholder: "Ex: Je suis fondateur d'une agence de voyage spécialisée dans l'éco-tourisme...",
    hint: "Décrivez votre situation en 1-2 phrases",
    multiline: true,
  },
  {
    id: "role",
    label: "Rôle",
    emoji: "👤",
    placeholder: "Ex: Agis comme un expert en marketing touristique...",
    hint: "Quelle expertise voulez-vous donner à l'IA ?",
  },
  {
    id: "action",
    label: "Action",
    emoji: "🎯",
    placeholder: "Ex: Crée un programme de fidélité innovant pour mes clients...",
    hint: "Que voulez-vous que l'IA fasse ? Soyez précis !",
    multiline: true,
    required: true,
  },
  {
    id: "format",
    label: "Format",
    emoji: "📋",
    placeholder: "Ex: Sous forme de tableau avec avantages par niveau...",
    hint: "Comment voulez-vous recevoir la réponse ?",
  },
  {
    id: "tone",
    label: "Ton",
    emoji: "🎨",
    placeholder: "Ex: Inspirant et éco-responsable...",
    hint: "Quel style de communication souhaitez-vous ?",
  },
];

export function PromptingBeginnerLesson({ lessonId, isCompleted, nextLessonUrl }: InteractiveLessonProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [quizResults, setQuizResults] = useState<Record<number, boolean>>({});

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

  const handleQuizComplete = (quizIndex: number, isCorrect: boolean) => {
    setQuizResults((prev) => ({ ...prev, [quizIndex]: isCorrect }));

    if (Object.keys({ ...quizResults, [quizIndex]: isCorrect }).length === 3) {
      setCompletedSections((prev) => new Set([...prev, 4]));
    }
  };

  const allQuizzesCompleted = Object.keys(quizResults).length === 3;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="bg-card rounded-xl p-4 mb-6 border border-border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Votre progression</span>
          <span className="font-mono text-primary font-bold">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => goToSection(index)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              currentSection === index
                ? "bg-primary text-primary-foreground"
                : completedSections.has(index)
                ? "bg-primary/20 text-primary border border-primary"
                : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-foreground"
            )}
          >
            {index + 1}. {section.label}
            {completedSections.has(index) && " ✓"}
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
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
                  <MessageSquare className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Qu'est-ce qu'un prompt ?</h2>
                  <p className="text-sm text-muted-foreground">La base de toute interaction avec l'IA</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Un <strong className="text-foreground">prompt</strong>, c'est simplement le texte que vous envoyez à une IA comme ChatGPT ou Claude. C'est votre façon de lui parler, de lui poser une question ou de lui demander quelque chose.
              </p>

              <TipBox variant="tip" icon="💡" title="Pensez-y comme une conversation :">
                Plus vous êtes clair et précis dans votre demande, plus l'IA pourra vous aider efficacement. C'est exactement comme demander son chemin à quelqu'un !
              </TipBox>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
                  <Target className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Pourquoi la qualité du prompt est importante ?</h2>
                  <p className="text-sm text-muted-foreground">Le secret d'une bonne réponse</p>
                </div>
              </div>

              <Comparison
                before={{
                  label: "Prompt vague",
                  content: "Parle-moi du marketing",
                  description: "Réponse générique de 2000 mots qui ne vous aide pas vraiment",
                }}
                after={{
                  label: "Prompt précis",
                  content: "Donne-moi 3 idées de posts Instagram pour promouvoir une boulangerie artisanale",
                  description: "Réponse ciblée et directement utilisable",
                }}
              />
            </div>
          </div>
        )}

        {/* Formula */}
        {currentSection === 1 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
                  <Sparkles className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">La Formule CRAFT</h2>
                  <p className="text-sm text-muted-foreground">5 éléments pour un prompt parfait</p>
                </div>
              </div>

              <FormulaDisplay
                title="La formule à retenir"
                items={[
                  { letter: "C", word: "Contexte" },
                  { letter: "R", word: "Rôle" },
                  { letter: "A", word: "Action" },
                  { letter: "F", word: "Format" },
                  { letter: "T", word: "Ton" },
                ]}
              />
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <Checklist items={craftItems} />
            </div>

            <TipBox variant="tip" icon="🚀" title="Astuce Pro :">
              Vous n'avez pas besoin d'utiliser les 5 éléments à chaque fois. Commencez par Contexte + Action, puis ajoutez les autres selon vos besoins !
            </TipBox>
          </div>
        )}

        {/* Examples */}
        {currentSection === 2 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
                  <FileText className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Exemple 1 : Rédaction d'email</h2>
                  <p className="text-sm text-muted-foreground">Avant / Après avec la formule CRAFT</p>
                </div>
              </div>

              <Comparison
                before={{
                  content: "Écris un email professionnel",
                }}
                after={{
                  content: `[Contexte] Je suis responsable commercial dans une startup tech.

[Rôle] Agis comme un expert en communication B2B.

[Action] Rédige un email de relance pour un prospect qui n'a pas répondu depuis 2 semaines.

[Format] Email court (max 100 mots) avec objet accrocheur.

[Ton] Professionnel mais pas trop formel, légèrement amical.`,
                }}
              />
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20">
                  <Smartphone className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Exemple 2 : Réseaux sociaux</h2>
                  <p className="text-sm text-muted-foreground">Créer du contenu engageant</p>
                </div>
              </div>

              <div className="bg-green-500/5 border-2 border-green-500/30 rounded-xl p-5">
                <pre className="font-mono text-sm whitespace-pre-wrap leading-relaxed">
{`[Contexte] Je gère le compte Instagram d'un salon de coiffure à Lyon, clientèle féminine 25-45 ans.

[Rôle] Tu es community manager spécialisé beauté.

[Action] Propose 3 idées de Reels tendance pour mettre en valeur nos colorations.

[Format] Pour chaque idée : titre accrocheur + description en 2 lignes + hashtags suggérés.

[Ton] Fun, moderne, inspirant.`}
                </pre>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                  <Briefcase className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Exemple 3 : Analyse business</h2>
                  <p className="text-sm text-muted-foreground">Obtenir des insights utiles</p>
                </div>
              </div>

              <div className="bg-green-500/5 border-2 border-green-500/30 rounded-xl p-5">
                <pre className="font-mono text-sm whitespace-pre-wrap leading-relaxed">
{`[Contexte] Mon restaurant fait 15% de marge, en dessous de la moyenne du secteur (20%).

[Rôle] Agis comme un consultant en restauration avec 10 ans d'expérience.

[Action] Identifie 5 leviers pour améliorer ma marge sans augmenter les prix.

[Format] Tableau avec : Levier | Impact estimé | Difficulté de mise en œuvre

[Ton] Direct et pragmatique.`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Practice */}
        {currentSection === 3 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
                  <Target className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Construisez votre prompt</h2>
                  <p className="text-sm text-muted-foreground">Exercice interactif avec la formule CRAFT</p>
                </div>
              </div>

              <PromptBuilder
                fields={builderFields}
                title="Votre premier prompt CRAFT"
                subtitle="Remplissez les champs pour construire votre prompt"
              />
            </div>
          </div>
        )}

        {/* Quiz */}
        {currentSection === 4 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
                  <GraduationCap className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Quiz Final</h2>
                  <p className="text-sm text-muted-foreground">Testez ce que vous avez appris !</p>
                </div>
              </div>

              <div className="space-y-6">
                <Quiz
                  question='Question 1/3 : Que signifie le "C" dans la formule CRAFT ?'
                  options={[
                    { text: "Clarté", isCorrect: false },
                    { text: "Contexte", isCorrect: true },
                    { text: "Communication", isCorrect: false },
                    { text: "Créativité", isCorrect: false },
                  ]}
                  correctFeedback="Excellent ! Le Contexte permet à l'IA de comprendre votre situation."
                  incorrectFeedback="Pas tout à fait. C = Contexte. Il permet à l'IA de comprendre votre situation."
                  onComplete={(isCorrect) => handleQuizComplete(0, isCorrect)}
                />

                <Quiz
                  question="Question 2/3 : Quel prompt est le mieux structuré ?"
                  options={[
                    { text: "Aide-moi avec mon business", isCorrect: false },
                    { text: "Je veux des idées marketing", isCorrect: false },
                    { text: "En tant que consultant, propose 3 stratégies pour augmenter les ventes d'une boutique en ligne de vêtements bio, format liste avec budget estimé", isCorrect: true },
                    { text: "Marketing digital SVP", isCorrect: false },
                  ]}
                  correctFeedback="Bravo ! Ce prompt contient un rôle, une action précise, un contexte et un format."
                  incorrectFeedback="La bonne réponse était la 3ème option car elle contient rôle, action, contexte et format."
                  onComplete={(isCorrect) => handleQuizComplete(1, isCorrect)}
                />

                <Quiz
                  question="Question 3/3 : Faut-il TOUJOURS utiliser les 5 éléments CRAFT ?"
                  options={[
                    { text: "Oui, absolument, sinon ça ne fonctionne pas", isCorrect: false },
                    { text: "Non, on adapte selon le besoin. Contexte + Action suffisent souvent", isCorrect: true },
                    { text: "Non, un seul élément suffit", isCorrect: false },
                    { text: "Oui, et toujours dans cet ordre exact", isCorrect: false },
                  ]}
                  correctFeedback="Parfait ! La flexibilité est clé. Adaptez la formule à vos besoins !"
                  incorrectFeedback="En fait, non ! La formule est flexible. Contexte + Action suffisent souvent pour commencer."
                  onComplete={(isCorrect) => handleQuizComplete(2, isCorrect)}
                />
              </div>

              {allQuizzesCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 text-center p-8 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/30"
                >
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold mb-2">Félicitations !</h3>
                  <p className="text-muted-foreground mb-6">
                    Vous avez terminé la formation niveau débutant. Vous maîtrisez maintenant les bases pour créer des prompts efficaces !
                  </p>
                  <TipBox variant="tip" icon="🚀" title="Prochaine étape :">
                    Passez au niveau intermédiaire pour découvrir des techniques avancées comme le chain-of-thought, les exemples few-shot, et plus encore !
                  </TipBox>
                </motion.div>
              )}

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
          </div>
        )}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => goToSection(currentSection - 1)}
          disabled={currentSection === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Précédent
        </Button>

        {currentSection < sections.length - 1 && (
          <Button
            onClick={() => goToSection(currentSection + 1)}
            className="gap-2"
          >
            Suivant
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
