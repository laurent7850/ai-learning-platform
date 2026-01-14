"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Brain, Layers, FlaskConical, Trophy, BookOpen, MessageSquare, ListChecks, Users, Ruler, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Quiz,
  Comparison,
  TipBox,
  CodeBlock,
} from "@/components/courses/interactive";
import { MarkCompleteButton } from "@/components/courses/mark-complete-button";
import { cn } from "@/lib/utils";
import type { InteractiveLessonProps } from "@/components/courses/lesson-content";

const sections = [
  { id: "techniques", label: "Techniques" },
  { id: "patterns", label: "Patterns Pro" },
  { id: "sandbox", label: "Laboratoire" },
  { id: "challenges", label: "Défis" },
  { id: "reference", label: "Référence" },
];

const techniques = [
  {
    id: "cot",
    name: "Chain of Thought (CoT)",
    tag: "Raisonnement",
    icon: MessageSquare,
    description: "Guidez l'IA pour qu'elle réfléchisse étape par étape.",
    before: 'Combien font 17 × 24 ?',
    after: 'Combien font 17 × 24 ? Réfléchis étape par étape.',
    tip: "Quand l'utiliser : Calculs, logique, analyse complexe, debugging. Ajoutez \"Réfléchis étape par étape\".",
  },
  {
    id: "fewshot",
    name: "Few-Shot Prompting",
    tag: "Apprentissage",
    icon: ListChecks,
    description: "Donnez des exemples pour que l'IA comprenne exactement ce que vous voulez.",
    code: `// Classifie le sentiment

Exemple 1: "Livraison rapide" → Positif
Exemple 2: "Article cassé" → Négatif
Exemple 3: "Correct sans plus" → Neutre

À classifier: "Excellent rapport qualité-prix !"`,
    tip: "Règle d'or : 2-5 exemples suffisent. Variez-les pour couvrir différents cas.",
  },
  {
    id: "persona",
    name: "Persona Engineering",
    tag: "Expertise",
    icon: Users,
    description: "Créez un personnage expert avec des caractéristiques précises.",
    before: "Tu es un expert marketing",
    after: "Tu es Sophie, CMO avec 15 ans d'expérience B2B SaaS. Ex-HubSpot. Approche data-driven, ton direct sans jargon.",
    tip: "Éléments clés : Nom, expérience, entreprises, spécialité, style de communication.",
  },
  {
    id: "constraints",
    name: "Contraintes Structurées",
    tag: "Précision",
    icon: Ruler,
    description: "Définissez des règles claires pour des outputs précis.",
    code: `CONTRAINTES :
- Maximum 150 mots
- Format : 3 bullet points
- NE PAS utiliser de jargon
- TOUJOURS inclure un CTA`,
    tip: "Astuce : Utilisez NE PAS et TOUJOURS en majuscules pour les règles importantes.",
  },
];

const patterns = [
  { emoji: "🔄", name: "Pattern Itératif", desc: "Affiner progressivement", code: "V1 → Feedback → V2 → Répète" },
  { emoji: "⚖️", name: "Avocat du Diable", desc: "Challenger une idée", code: "5 arguments POUR, puis 5 CONTRE, puis synthèse" },
  { emoji: "🔍", name: "Pattern Socratique", desc: "Approfondir un sujet", code: '"Pose-moi 5 questions avant de répondre"' },
  { emoji: "🎭", name: "Multi-Perspectives", desc: "Plusieurs points de vue", code: "Réponds comme: 1) Optimiste 2) Pessimiste 3) Pragmatique" },
];

const megaPromptTemplate = `# RÔLE
Tu es [Persona détaillé]

# CONTEXTE
[Situation, objectifs]

# TÂCHE
[Action précise]

# EXEMPLES
Input: [...] → Output: [...]

# CONTRAINTES
- NE PAS [...]
- TOUJOURS [...]

# FORMAT
[Structure attendue]

Réfléchis étape par étape.`;

const snippets = {
  cot: '\n\nRéfléchis étape par étape.',
  constraints: '\n\n# CONTRAINTES\n- Maximum [X] mots\n- NE PAS [...]\n- TOUJOURS [...]',
  persona: "# RÔLE\nTu es [Nom], [expertise] avec [X] ans d'expérience.\n\n",
  examples: '\n\n# EXEMPLES\nInput: [...] → Output: [...]\nInput: [...] → Output: [...]',
};

const templates = {
  blank: '',
  email: `# RÔLE
Tu es un expert en communication B2B.

# TÂCHE
Rédige un email de prospection.

# CONTRAINTES
- Maximum 100 mots
- Ton professionnel mais chaleureux`,
  analysis: `# RÔLE
Tu es un consultant stratégique.

# TÂCHE
Analyse [SUJET] et fournis des recommandations.

# PROCESSUS
Réfléchis étape par étape.`,
};

export function PromptingIntermediateLesson({ lessonId, isCompleted, nextLessonUrl }: InteractiveLessonProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [expandedTechnique, setExpandedTechnique] = useState<string | null>(null);
  const [sandboxValue, setSandboxValue] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof templates>('blank');
  const [challengeResults, setChallengeResults] = useState<Record<number, boolean>>({});

  const skillTechniques = Math.min(100, completedSections.size * 25);
  const skillPractice = (challengeResults[0] ? 50 : 0) + (challengeResults[1] ? 50 : 0);
  const skillMastery = Math.round((skillTechniques + skillPractice) / 2);

  const progress = Math.round((completedSections.size / sections.length) * 100);

  const goToSection = (index: number) => {
    if (currentSection < index && currentSection >= 0) {
      setCompletedSections((prev) => new Set([...prev, currentSection]));
    }
    setCurrentSection(index);
    // Scroll vers le haut de la page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const analyzePrompt = (text: string) => {
    const lower = text.toLowerCase();
    const checks = [
      { name: 'Rôle/Persona', present: lower.includes('rôle') || lower.includes('tu es'), icon: '🎭' },
      { name: 'Contexte', present: lower.includes('contexte'), icon: '📋' },
      { name: 'Tâche', present: lower.includes('tâche') || lower.includes('crée') || lower.includes('génère'), icon: '🎯' },
      { name: 'Contraintes', present: lower.includes('contrainte') || lower.includes('ne pas') || lower.includes('maximum'), icon: '📐' },
      { name: 'Chain of Thought', present: lower.includes('étape par étape'), icon: '💭' },
      { name: 'Exemples', present: lower.includes('exemple') || lower.includes('input'), icon: '📝' },
    ];
    return checks;
  };

  const insertSnippet = (type: keyof typeof snippets) => {
    setSandboxValue((prev) => prev + snippets[type]);
  };

  const setTemplate = (type: keyof typeof templates) => {
    setSelectedTemplate(type);
    setSandboxValue(templates[type]);
  };

  const analysisChecks = analyzePrompt(sandboxValue);
  const analysisScore = Math.round((analysisChecks.filter(c => c.present).length / analysisChecks.length) * 100);

  const handleChallengeComplete = (index: number, isCorrect: boolean) => {
    setChallengeResults((prev) => ({ ...prev, [index]: isCorrect }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress & Skills */}
      <div className="bg-card rounded-xl p-4 mb-6 border border-border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Progression du module</span>
          <span className="font-mono text-primary font-bold">{completedSections.size} / {sections.length} complétés</span>
        </div>
        <Progress value={progress} className="h-2 mb-4" />

        <div className="flex justify-center gap-8 pt-2">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-1">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-muted" />
                <circle
                  cx="32" cy="32" r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${skillTechniques * 1.76} 176`}
                  className="text-primary transition-all duration-500"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-primary">
                {skillTechniques}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground">Techniques</span>
          </div>
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-1">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-muted" />
                <circle
                  cx="32" cy="32" r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${skillPractice * 1.76} 176`}
                  className="text-pink-500 transition-all duration-500"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-pink-500">
                {skillPractice}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground">Pratique</span>
          </div>
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-1">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-muted" />
                <circle
                  cx="32" cy="32" r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${skillMastery * 1.76} 176`}
                  className="text-violet-500 transition-all duration-500"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-violet-500">
                {skillMastery}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground">Maîtrise</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => goToSection(index)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
              currentSection === index
                ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/25"
                : completedSections.has(index)
                ? "bg-violet-500/20 text-violet-400 border border-violet-500/50"
                : "bg-card border border-border text-muted-foreground hover:border-violet-500 hover:text-foreground"
            )}
          >
            <span className={cn(
              "w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold",
              currentSection === index ? "bg-white/20" : "bg-muted"
            )}>
              {completedSections.has(index) ? "✓" : index + 1}
            </span>
            {section.label}
          </button>
        ))}
      </div>

      {/* Section Content */}
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Techniques */}
        {currentSection === 0 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-pink-500" />
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Les 4 Techniques Essentielles</h2>
                  <p className="text-sm text-muted-foreground">Cliquez sur chaque technique pour la découvrir</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {techniques.map((tech) => {
                const isExpanded = expandedTechnique === tech.id;
                const Icon = tech.icon;

                return (
                  <motion.div
                    key={tech.id}
                    layout
                    className={cn(
                      "bg-card rounded-xl p-5 border border-border cursor-pointer transition-all hover:border-violet-500 hover:shadow-lg",
                      isExpanded && "md:col-span-2"
                    )}
                    onClick={() => setExpandedTechnique(isExpanded ? null : tech.id)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <Icon className="h-5 w-5 text-violet-500" />
                      </div>
                      <div>
                        <h3 className="font-bold">{tech.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400">{tech.tag}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 pt-4 border-t border-border"
                      >
                        {tech.before && tech.after ? (
                          <Comparison
                            before={{ label: "Sans " + tech.name.split(" ")[0], content: tech.before }}
                            after={{ label: "Avec " + tech.name.split(" ")[0], content: tech.after }}
                          />
                        ) : tech.code ? (
                          <CodeBlock code={tech.code} label="Exemple" />
                        ) : null}

                        <TipBox variant={tech.id === "constraints" ? "warning" : "success"} className="mt-4">
                          {tech.tip}
                        </TipBox>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Patterns */}
        {currentSection === 1 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Layers className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Patterns Professionnels</h2>
                  <p className="text-sm text-muted-foreground">Templates réutilisables</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="grid md:grid-cols-2 gap-4">
                {patterns.map((pattern) => (
                  <div key={pattern.name} className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-bold text-violet-400 flex items-center gap-2">
                      <span>{pattern.emoji}</span>
                      {pattern.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{pattern.desc}</p>
                    <code className="block mt-2 text-xs bg-background p-2 rounded font-mono">
                      {pattern.code}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-pink-500" />
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Le Mega-Prompt</h2>
                  <p className="text-sm text-muted-foreground">Combinez toutes les techniques</p>
                </div>
              </div>
              <CodeBlock code={megaPromptTemplate} label="Template" />
            </div>
          </div>
        )}

        {/* Sandbox */}
        {currentSection === 2 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-pink-500" />
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500">
                  <FlaskConical className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Laboratoire de Prompts</h2>
                  <p className="text-sm text-muted-foreground">Analysez vos prompts en temps réel</p>
                </div>
              </div>

              <div className="mt-6 bg-muted/30 rounded-xl p-5 border border-border">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <span className="font-semibold">✍️ Votre prompt</span>
                  <div className="flex gap-2">
                    {(Object.keys(templates) as (keyof typeof templates)[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => setTemplate(key)}
                        className={cn(
                          "px-3 py-1.5 text-sm rounded-lg border transition-all",
                          selectedTemplate === key
                            ? "bg-violet-500 border-violet-500 text-white"
                            : "bg-card border-border hover:border-violet-500"
                        )}
                      >
                        {key === 'blank' ? 'Vierge' : key === 'email' ? 'Email' : 'Analyse'}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={sandboxValue}
                  onChange={(e) => setSandboxValue(e.target.value)}
                  placeholder="Écrivez votre prompt ici..."
                  className="w-full min-h-[200px] p-4 bg-background border border-border rounded-xl font-mono text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-y"
                />

                <div className="flex flex-wrap gap-2 mt-3">
                  <button onClick={() => insertSnippet('cot')} className="px-3 py-1.5 text-xs bg-card border border-border rounded-lg hover:border-violet-500 transition-all">
                    + Chain of Thought
                  </button>
                  <button onClick={() => insertSnippet('constraints')} className="px-3 py-1.5 text-xs bg-card border border-border rounded-lg hover:border-violet-500 transition-all">
                    + Contraintes
                  </button>
                  <button onClick={() => insertSnippet('persona')} className="px-3 py-1.5 text-xs bg-card border border-border rounded-lg hover:border-violet-500 transition-all">
                    + Persona
                  </button>
                  <button onClick={() => insertSnippet('examples')} className="px-3 py-1.5 text-xs bg-card border border-border rounded-lg hover:border-violet-500 transition-all">
                    + Exemples
                  </button>
                </div>

                <div className="mt-4 p-4 bg-card rounded-xl border border-border">
                  <h4 className="font-semibold flex items-center gap-2 mb-3">
                    📊 Analyse
                    {sandboxValue.trim() && (
                      <span className="text-sm text-violet-400 font-mono">Score: {analysisScore}%</span>
                    )}
                  </h4>
                  {!sandboxValue.trim() ? (
                    <p className="text-sm text-muted-foreground">Commencez à écrire...</p>
                  ) : (
                    <div className="grid gap-2">
                      {analysisChecks.map((check) => (
                        <div key={check.name} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                          <div className={cn(
                            "w-7 h-7 rounded-md flex items-center justify-center text-sm",
                            check.present ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                          )}>
                            {check.present ? "✓" : "○"}
                          </div>
                          <span className="text-sm">
                            {check.icon} <strong>{check.name}</strong>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Challenges */}
        {currentSection === 3 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Défis Pratiques</h2>
                  <p className="text-sm text-muted-foreground">Testez vos compétences</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="bg-background rounded-lg p-4 mb-4 border-l-4 border-violet-500">
                <span className="text-xs text-violet-400 uppercase tracking-wider font-medium">📋 Scénario 1</span>
                <p className="mt-1">Créer des descriptions e-commerce : exactement 50 mots, 3 bénéfices, un CTA.</p>
              </div>

              <Quiz
                question="Quelle technique est la PLUS efficace ?"
                options={[
                  { text: "Chain of Thought", isCorrect: false },
                  { text: "Few-Shot + Contraintes", isCorrect: true },
                  { text: "Persona seul", isCorrect: false },
                ]}
                correctFeedback="Few-Shot + Contraintes : les exemples montrent le format, les contraintes garantissent la cohérence."
                incorrectFeedback="La meilleure réponse est Few-Shot + Contraintes : les exemples montrent le format attendu, et les contraintes garantissent la cohérence des outputs."
                onComplete={(isCorrect) => handleChallengeComplete(0, isCorrect)}
              />
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="bg-background rounded-lg p-4 mb-4 border-l-4 border-violet-500">
                <span className="text-xs text-violet-400 uppercase tracking-wider font-medium">📋 Scénario 2</span>
                <p className="mt-1">Analyser pourquoi le taux de conversion a chuté de 40%. Besoin d'une analyse méthodique.</p>
              </div>

              <Quiz
                question="Quelle approche recommanderiez-vous ?"
                options={[
                  { text: "Few-Shot avec exemples", isCorrect: false },
                  { text: "Chain of Thought + Avocat du Diable", isCorrect: true },
                  { text: "Contraintes strictes", isCorrect: false },
                ]}
                correctFeedback="CoT pour le raisonnement structuré + Avocat du Diable pour challenger les hypothèses."
                incorrectFeedback="La meilleure approche est Chain of Thought + Avocat du Diable : CoT pour le raisonnement structuré, et Avocat du Diable pour challenger les hypothèses."
                onComplete={(isCorrect) => handleChallengeComplete(1, isCorrect)}
              />
            </div>
          </div>
        )}

        {/* Reference */}
        {currentSection === 4 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-pink-500" />
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Fiche de Référence</h2>
                  <p className="text-sm text-muted-foreground">À garder sous la main !</p>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-bold text-violet-400 flex items-center gap-2">💭 Chain of Thought</h4>
                  <p className="text-sm text-muted-foreground mt-1">Raisonnement, calculs, logique</p>
                  <code className="block mt-2 text-xs bg-background p-2 rounded font-mono">"Réfléchis étape par étape"</code>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-bold text-violet-400 flex items-center gap-2">📋 Few-Shot</h4>
                  <p className="text-sm text-muted-foreground mt-1">Formats répétables, classification</p>
                  <code className="block mt-2 text-xs bg-background p-2 rounded font-mono">2-5 exemples Input → Output</code>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-bold text-violet-400 flex items-center gap-2">🎭 Persona</h4>
                  <p className="text-sm text-muted-foreground mt-1">Expertise, ton particulier</p>
                  <code className="block mt-2 text-xs bg-background p-2 rounded font-mono">Nom + Exp + Style + Valeurs</code>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-bold text-violet-400 flex items-center gap-2">📐 Contraintes</h4>
                  <p className="text-sm text-muted-foreground mt-1">Longueur, format, règles</p>
                  <code className="block mt-2 text-xs bg-background p-2 rounded font-mono">NE PAS / TOUJOURS / MAX</code>
                </div>
              </div>

              <TipBox variant="success" icon="🎓" className="mt-6">
                Félicitations ! Vous maîtrisez maintenant les techniques avancées de prompt engineering !
              </TipBox>

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
            className="gap-2 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600"
          >
            Suivant
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
