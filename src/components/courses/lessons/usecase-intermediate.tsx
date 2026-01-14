"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Target,
  FlaskConical,
  Trophy,
  BookOpen,
  Search,
  PenTool,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TipBox, Quiz, CodeBlock } from "@/components/courses/interactive";
import { MarkCompleteButton } from "@/components/courses/mark-complete-button";
import { cn } from "@/lib/utils";
import type { InteractiveLessonProps } from "@/components/courses/lesson-content";

const sections = [
  { id: "workflows", label: "Workflows" },
  { id: "advanced", label: "Techniques" },
  { id: "sandbox", label: "Laboratoire" },
  { id: "challenges", label: "Défis" },
  { id: "reference", label: "Référence" },
];

const workflowSteps = [
  {
    num: 1,
    title: "Extraction des données",
    description: "Lister les concurrents et leurs caractéristiques",
    prompt: `# ÉTAPE 1 : Extraction
Liste mes 5 concurrents sur [marché].
Pour chacun : nom, positionnement, prix, forces, faiblesses.
Format : tableau markdown.`,
  },
  {
    num: 2,
    title: "Analyse comparative",
    description: "Comparer forces/faiblesses en tableau",
    prompt: `# ÉTAPE 2 : Analyse
Voici les données : [COLLER TABLEAU]
Compare sur : prix, qualité, innovation.
Format : matrice de scores /10.`,
  },
  {
    num: 3,
    title: "Synthèse stratégique",
    description: "Générer les recommandations finales",
    prompt: `# ÉTAPE 3 : Recommandations
Voici l'analyse : [COLLER MATRICE]
Génère 3 recommandations stratégiques.
Format : action + impact + difficulté.`,
  },
];

const usecaseTechniques = {
  research: {
    title: "🔍 Recherche — Technique : Output JSON structuré",
    code: `# FORMAT DE SORTIE
Réponds UNIQUEMENT avec ce JSON :
{
  "resume": "[max 50 mots]",
  "points_cles": ["point 1", "point 2"],
  "pertinence": "[score 1-10]"
}

# CONTRAINTES
- NE PAS inventer de données
- Si info manquante, mettre "N/A"`,
  },
  writing: {
    title: "✍️ Rédaction — Technique : Pipeline itératif",
    code: `# PIPELINE EN 3 ÉTAPES

Étape 1: Génère 5 angles possibles
Étape 2: Développe l'angle choisi en plan
Étape 3: Rédige section par section

# AVANTAGE
Contrôle à chaque étape, cohérence garantie`,
  },
  analysis: {
    title: "📊 Analyse — Technique : Chain of Thought guidé",
    code: `# PROCESSUS D'ANALYSE

Étape 1: OBSERVATION
Liste les 5 faits importants

Étape 2: PATTERNS
Identifie 3 tendances

Étape 3: RECOMMANDATIONS
3 actions concrètes

# CONTRAINTE
Montre ton raisonnement à chaque étape.`,
  },
};

const templates = {
  workflow: `# WORKFLOW : [Nom]

## ÉTAPE 1
[Prompt 1]
→ Output : [format]

## ÉTAPE 2
Input : [output étape 1]
[Prompt 2]`,
  json: `# TÂCHE
[Description]

# FORMAT
Réponds UNIQUEMENT avec ce JSON :
{
  "champ1": "[valeur]",
  "champ2": ["item1", "item2"]
}`,
  cot: `# CONTEXTE
[Situation]

# PROCESSUS
Étape 1 : OBSERVATION
Étape 2 : PATTERNS
Étape 3 : RECOMMANDATIONS

Montre ton raisonnement.`,
};

const referenceItems = [
  { emoji: "🔄", title: "Workflow", desc: "Tâches complexes", code: "P1 → Output → P2 → Output → P3" },
  { emoji: "📊", title: "Output JSON", desc: "Automatisation", code: "Réponds UNIQUEMENT avec ce JSON" },
  { emoji: "💭", title: "CoT guidé", desc: "Analyse", code: "Étape 1... Étape 2... Montre ton raisonnement" },
  { emoji: "🔁", title: "Pipeline", desc: "Rédaction longue", code: "Angles → Plan → Sections → Révision" },
];

export function UseCaseIntermediateLesson({ lessonId, isCompleted, nextLessonUrl }: InteractiveLessonProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [selectedWorkflowStep, setSelectedWorkflowStep] = useState<number | null>(null);
  const [selectedUsecase, setSelectedUsecase] = useState<keyof typeof usecaseTechniques>("research");
  const [sandboxValue, setSandboxValue] = useState("");
  const [quizResults, setQuizResults] = useState<Record<number, boolean>>({});

  const progress = Math.round((completedSections.size / sections.length) * 100);
  const skillTech = Math.min(100, completedSections.size * 25);
  const skillPractice = (quizResults[0] ? 50 : 0) + (quizResults[1] ? 50 : 0);
  const skillMastery = Math.round((skillTech + skillPractice) / 2);

  const goToSection = (index: number) => {
    if (currentSection < index && currentSection >= 0) {
      setCompletedSections((prev) => new Set([...prev, currentSection]));
    }
    setCurrentSection(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const analyzeAdvanced = (text: string) => {
    const lower = text.toLowerCase();
    return [
      { name: "Structure multi-étapes", present: lower.includes("étape") },
      { name: "Format de sortie", present: lower.includes("format") || lower.includes("json") },
      { name: "Contraintes", present: lower.includes("contrainte") || lower.includes("ne pas") },
      { name: "Chain of Thought", present: lower.includes("raisonnement") },
      { name: "Output structuré", present: lower.includes("{") || lower.includes("tableau") },
    ];
  };

  const loadTemplate = (type: keyof typeof templates) => {
    setSandboxValue(templates[type]);
  };

  const analysisChecks = analyzeAdvanced(sandboxValue);
  const analysisScore = analysisChecks.filter((c) => c.present).length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress & Skills */}
      <div className="bg-card rounded-xl p-4 mb-6 border border-border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Progression</span>
          <span className="font-mono text-orange-500 font-bold">
            {completedSections.size} / {sections.length}
          </span>
        </div>
        <Progress value={progress} className="h-2 mb-4" />

        <div className="flex justify-center gap-8 pt-2">
          {[
            { label: "Techniques", value: skillTech, color: "text-orange-500" },
            { label: "Pratique", value: skillPractice, color: "text-purple-500" },
            { label: "Maîtrise", value: skillMastery, color: "text-teal-500" },
          ].map((skill) => (
            <div key={skill.label} className="text-center">
              <div className={cn("text-2xl font-bold", skill.color)}>{skill.value}%</div>
              <div className="text-xs text-muted-foreground">{skill.label}</div>
            </div>
          ))}
        </div>
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
                ? "bg-gradient-to-r from-orange-500 to-purple-500 text-white"
                : completedSections.has(index)
                ? "bg-orange-500/20 text-orange-500 border border-orange-500"
                : "bg-card border border-border text-muted-foreground hover:border-orange-500 hover:text-foreground"
            )}
          >
            {completedSections.has(index) && "✓ "}
            {index + 1}. {section.label}
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
        {/* Workflows */}
        {currentSection === 0 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
                  <RefreshCw className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Workflows IA multi-étapes</h2>
                  <p className="text-sm text-muted-foreground">
                    Enchaînez plusieurs prompts pour des résultats complexes
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Un workflow IA, c'est une <strong className="text-foreground">séquence de prompts</strong> où la
                sortie de l'un devient l'entrée du suivant. C'est la clé pour traiter des tâches complexes.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-semibold mb-4">📊 Exemple : Analyse concurrentielle automatisée</h3>

              <div className="bg-muted/30 rounded-xl p-4 border border-border space-y-3">
                {workflowSteps.map((step) => (
                  <button
                    key={step.num}
                    onClick={() => setSelectedWorkflowStep(step.num)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                      selectedWorkflowStep === step.num
                        ? "border-orange-500 bg-orange-500/5"
                        : "border-border bg-card hover:border-orange-500 hover:translate-x-1"
                    )}
                  >
                    <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center font-mono font-bold text-orange-500">
                      {step.num}
                    </div>
                    <div>
                      <div className="font-semibold">{step.title}</div>
                      <div className="text-sm text-muted-foreground">{step.description}</div>
                    </div>
                  </button>
                ))}
              </div>

              {selectedWorkflowStep && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                  <CodeBlock
                    code={workflowSteps.find((s) => s.num === selectedWorkflowStep)?.prompt || ""}
                    label={`Étape ${selectedWorkflowStep}`}
                  />
                </motion.div>
              )}
            </div>

            <TipBox variant="tip" icon="💡" title="Règle des workflows :">
              Chaque étape doit avoir un output clair et structuré (JSON, tableau, liste) qui peut être injecté dans
              le prompt suivant.
            </TipBox>

            <div className="flex justify-end">
              <Button
                onClick={() => goToSection(1)}
                className="gap-2 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600"
              >
                Techniques avancées
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Advanced Techniques */}
        {currentSection === 1 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Techniques avancées par cas d'usage</h2>
                  <p className="text-sm text-muted-foreground">Sélectionnez un cas pour voir la technique optimale</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { id: "research" as const, icon: Search, label: "🔍 Recherche" },
                  { id: "writing" as const, icon: PenTool, label: "✍️ Rédaction" },
                  { id: "analysis" as const, icon: BarChart3, label: "📊 Analyse" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedUsecase(tab.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium transition-all",
                      selectedUsecase === tab.id
                        ? "bg-orange-500 text-white"
                        : "bg-muted/30 border border-border hover:border-orange-500"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <motion.div key={selectedUsecase} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h4 className="font-semibold mb-3">{usecaseTechniques[selectedUsecase].title}</h4>
                <CodeBlock code={usecaseTechniques[selectedUsecase].code} label="Technique" />
              </motion.div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => goToSection(0)} className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Retour
              </Button>
              <Button
                onClick={() => goToSection(2)}
                className="gap-2 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600"
              >
                Laboratoire
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Sandbox */}
        {currentSection === 2 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600">
                  <FlaskConical className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Laboratoire avancé</h2>
                  <p className="text-sm text-muted-foreground">Testez vos prompts complexes</p>
                </div>
              </div>

              <div className="bg-muted/30 rounded-xl p-5 border border-border">
                <p className="font-semibold mb-3">✍️ Zone d'expérimentation</p>
                <textarea
                  value={sandboxValue}
                  onChange={(e) => setSandboxValue(e.target.value)}
                  placeholder="Écrivez votre prompt avancé..."
                  className="w-full min-h-[180px] p-4 bg-background border border-border rounded-xl font-mono text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-y"
                />

                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    onClick={() => loadTemplate("workflow")}
                    className="px-3 py-1.5 text-sm bg-card border border-border rounded-lg hover:border-orange-500 transition-all"
                  >
                    🔄 Workflow
                  </button>
                  <button
                    onClick={() => loadTemplate("json")}
                    className="px-3 py-1.5 text-sm bg-card border border-border rounded-lg hover:border-orange-500 transition-all"
                  >
                    📊 Output JSON
                  </button>
                  <button
                    onClick={() => loadTemplate("cot")}
                    className="px-3 py-1.5 text-sm bg-card border border-border rounded-lg hover:border-orange-500 transition-all"
                  >
                    💭 Chain of Thought
                  </button>
                </div>

                <div className="mt-4 p-4 bg-card rounded-xl border border-border">
                  <h4 className="font-semibold mb-3">
                    📊 Analyse avancée
                    {sandboxValue.trim() && (
                      <span className="text-sm text-orange-500 font-mono ml-2">
                        Score: {analysisScore}/{analysisChecks.length}
                      </span>
                    )}
                  </h4>
                  {!sandboxValue.trim() ? (
                    <p className="text-sm text-muted-foreground">Commencez à écrire...</p>
                  ) : (
                    <div className="space-y-2">
                      {analysisChecks.map((check) => (
                        <div key={check.name} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                              check.present ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                            )}
                          >
                            {check.present ? "✓" : "○"}
                          </div>
                          <span className="text-sm">{check.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => goToSection(1)} className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Retour
              </Button>
              <Button
                onClick={() => goToSection(3)}
                className="gap-2 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600"
              >
                Défis
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Challenges */}
        {currentSection === 3 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Défis avancés</h2>
                  <p className="text-sm text-muted-foreground">Testez votre maîtrise</p>
                </div>
              </div>
            </div>

            <Quiz
              question="Pour automatiser l'analyse de 50 feedbacks clients, quelle approche est la plus efficace ?"
              options={[
                { text: "Un seul prompt avec tous les feedbacks", isCorrect: false },
                { text: "Un prompt avec output JSON structuré, traité en batch", isCorrect: true },
                { text: "50 prompts individuels", isCorrect: false },
              ]}
              correctFeedback="Le format JSON structuré permet d'automatiser le traitement. Les batchs de 5-10 feedbacks optimisent le ratio qualité/tokens."
              incorrectFeedback="Le format JSON structuré est la meilleure approche car il permet d'automatiser le traitement et les batchs optimisent le ratio qualité/tokens."
              onComplete={(isCorrect) => setQuizResults((prev) => ({ ...prev, 0: isCorrect }))}
            />

            <Quiz
              question="Pour créer un article de 2000 mots de haute qualité, quelle stratégie ?"
              options={[
                { text: "Un seul prompt demandant 2000 mots", isCorrect: false },
                { text: "Pipeline : angles → plan → rédaction par section → révision", isCorrect: true },
                { text: 'Demander un brouillon puis "améliore"', isCorrect: false },
              ]}
              correctFeedback="Le pipeline itératif garantit cohérence et qualité. Chaque étape a un objectif précis."
              incorrectFeedback="Le pipeline itératif est la meilleure stratégie car il garantit cohérence et qualité avec des étapes bien définies."
              onComplete={(isCorrect) => setQuizResults((prev) => ({ ...prev, 1: isCorrect }))}
            />

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => goToSection(2)} className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Retour
              </Button>
              <Button
                onClick={() => goToSection(4)}
                className="gap-2 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600"
              >
                Référence
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Reference */}
        {currentSection === 4 && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-purple-500">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Fiche de référence</h2>
                  <p className="text-sm text-muted-foreground">À garder sous la main</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {referenceItems.map((item) => (
                  <div key={item.title} className="bg-muted/30 rounded-xl p-4 border border-border">
                    <h4 className="font-bold text-orange-500 flex items-center gap-2">
                      <span>{item.emoji}</span>
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    <code className="block mt-2 text-xs bg-background p-2 rounded font-mono">{item.code}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-orange-500/10 to-purple-500/5 rounded-2xl border border-orange-500/30">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-2">Module 2 Intermédiaire terminé !</h3>
              <p className="text-muted-foreground">Vous maîtrisez les workflows et techniques avancées.</p>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" onClick={() => goToSection(3)} className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Revoir les défis
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
