import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const beginnerCourses = [
  {
    slug: "debuter-chatgpt-guide-complet",
    title: "Débuter avec ChatGPT : Le Guide Complet",
    description:
      "Apprenez à utiliser ChatGPT efficacement, de la création de votre premier prompt aux techniques avancées de conversation. Ce cours vous donnera toutes les bases pour tirer le meilleur parti de l'IA conversationnelle.",
    thumbnail: "/courses/chatgpt-basics.jpg",
    level: "BEGINNER" as const,
    category: "chatgpt-claude",
    duration: 180, // 3 heures
    requiredPlan: "FREE" as const,
    chapters: [
      {
        title: "Introduction à ChatGPT",
        order: 1,
        lessons: [
          {
            title: "Qu'est-ce que ChatGPT ?",
            slug: "quest-ce-que-chatgpt",
            duration: 10,
            isFree: true,
            content: `# Qu'est-ce que ChatGPT ?

ChatGPT est un modèle de langage développé par OpenAI, capable de comprendre et de générer du texte de manière naturelle et contextuelle.

## Les capacités de ChatGPT

ChatGPT peut vous aider dans de nombreuses tâches :

- **Rédaction** : articles, emails, rapports
- **Analyse** : synthèse de documents, comparaisons
- **Créativité** : brainstorming, génération d'idées
- **Programmation** : code, débogage, explications
- **Apprentissage** : explications, tutoriels personnalisés

## Comment fonctionne ChatGPT ?

ChatGPT a été entraîné sur d'énormes quantités de texte provenant d'Internet. Il utilise des techniques de deep learning pour prédire la suite la plus probable d'une conversation.

> Important : ChatGPT ne "comprend" pas vraiment le contenu au sens humain du terme. Il génère des réponses statistiquement probables basées sur son entraînement.

## Les limites à connaître

- Les informations peuvent être obsolètes (date de coupure des connaissances)
- ChatGPT peut générer des informations incorrectes avec assurance
- Il n'a pas accès à Internet en temps réel (sauf plugins spécifiques)
- Les réponses peuvent varier d'une session à l'autre`,
          },
          {
            title: "Créer son compte OpenAI",
            slug: "creer-compte-openai",
            duration: 8,
            isFree: true,
            content: `# Créer son compte OpenAI

Dans cette leçon, nous allons voir comment créer votre compte OpenAI et accéder à ChatGPT.

## Étape 1 : Inscription

1. Rendez-vous sur chat.openai.com
2. Cliquez sur "Sign up"
3. Choisissez votre méthode d'inscription :
   - Email et mot de passe
   - Compte Google
   - Compte Microsoft
   - Compte Apple

## Étape 2 : Vérification

Après l'inscription, vous devrez :

- Vérifier votre adresse email
- Configurer l'authentification à deux facteurs (recommandé)

## Les différentes versions de ChatGPT

### ChatGPT gratuit
- Accès au modèle GPT-3.5
- Usage limité en heures de pointe
- Parfait pour débuter

### ChatGPT Plus (20$/mois)
- Accès prioritaire
- Modèle GPT-4 (plus puissant)
- Plugins et fonctionnalités avancées
- Navigation web

> Conseil : Commencez avec la version gratuite pour vous familiariser avec l'outil avant de passer à la version payante.`,
          },
          {
            title: "L'interface de ChatGPT",
            slug: "interface-chatgpt",
            duration: 12,
            isFree: false,
            content: `# L'interface de ChatGPT

Découvrons ensemble l'interface de ChatGPT et ses différentes fonctionnalités.

## La zone de conversation

La partie centrale de l'écran est dédiée à votre conversation avec ChatGPT. Chaque échange est affiché de manière claire avec :

- Vos messages (à droite ou marqués "You")
- Les réponses de ChatGPT (à gauche ou marquées avec le logo)

## La barre de saisie

En bas de l'écran, vous trouvez :

- Le champ de texte pour écrire vos prompts
- Le bouton d'envoi
- L'option d'ajout de fichiers (ChatGPT Plus)

## La barre latérale

Sur le côté gauche :

- **Nouveau chat** : démarrer une nouvelle conversation
- **Historique** : accéder à vos conversations passées
- **Paramètres** : personnaliser votre expérience

## Fonctionnalités utiles

### Régénérer une réponse
Si la réponse ne vous convient pas, cliquez sur l'icône de régénération pour obtenir une alternative.

### Copier le code
Pour les blocs de code, un bouton "Copy" permet de copier facilement le contenu.

### Mode sombre/clair
Accessible depuis les paramètres pour adapter l'interface à vos préférences.`,
          },
        ],
      },
      {
        title: "Vos premiers prompts",
        order: 2,
        lessons: [
          {
            title: "Anatomie d'un bon prompt",
            slug: "anatomie-bon-prompt",
            duration: 15,
            isFree: false,
            content: `# Anatomie d'un bon prompt

Un prompt efficace contient généralement plusieurs éléments clés qui permettent d'obtenir des résultats précis et utiles.

## Les composants d'un prompt

### 1. Le contexte
Donnez des informations sur votre situation :

\`\`\`
Je suis un responsable marketing dans une startup tech...
\`\`\`

### 2. La tâche
Expliquez clairement ce que vous attendez :

\`\`\`
...et j'ai besoin de créer une série d'emails pour notre campagne de lancement.
\`\`\`

### 3. Les contraintes
Précisez les limites ou exigences :

\`\`\`
Les emails doivent être courts (max 150 mots), professionnels mais dynamiques.
\`\`\`

### 4. Le format souhaité
Indiquez comment vous voulez la réponse :

\`\`\`
Présente-moi 3 versions différentes, chacune avec un objet et un corps de mail.
\`\`\`

## Exemple complet

> Je suis un responsable marketing dans une startup tech et j'ai besoin de créer une série d'emails pour notre campagne de lancement. Les emails doivent être courts (max 150 mots), professionnels mais dynamiques. Présente-moi 3 versions différentes, chacune avec un objet et un corps de mail.

Ce prompt combine tous les éléments pour un résultat optimal.`,
          },
          {
            title: "Exemples de prompts efficaces",
            slug: "exemples-prompts-efficaces",
            duration: 20,
            isFree: false,
            content: `# Exemples de prompts efficaces

Voici une collection de prompts testés et approuvés pour différents cas d'usage.

## Pour la rédaction

### Email professionnel
\`\`\`
Rédige un email de relance pour un client qui n'a pas répondu à notre proposition commerciale depuis 2 semaines. Le ton doit être professionnel mais chaleureux, sans être insistant. Maximum 100 mots.
\`\`\`

### Article de blog
\`\`\`
Crée un plan détaillé pour un article de blog sur [sujet]. Le public cible est [audience]. L'objectif est [but]. Inclus une introduction accrocheuse, 5 sections principales avec sous-points, et une conclusion avec appel à l'action.
\`\`\`

## Pour l'analyse

### Synthèse de document
\`\`\`
Résume ce texte en 5 points clés, en mettant en évidence les informations les plus importantes pour un décideur pressé :

[Coller le texte ici]
\`\`\`

## Pour la créativité

### Brainstorming
\`\`\`
Génère 10 idées créatives de noms pour [produit/entreprise]. Le nom doit évoquer [valeurs], être facile à prononcer en français et anglais, et avoir un domaine .com disponible potentiellement.
\`\`\`

## Conseil pro

Gardez ces templates et adaptez-les à vos besoins. Un bon prompt est souvent un prompt testé et amélioré au fil du temps.`,
          },
        ],
      },
      {
        title: "Techniques avancées",
        order: 3,
        lessons: [
          {
            title: "Les rôles et personas",
            slug: "roles-et-personas",
            duration: 15,
            isFree: false,
            content: `# Les rôles et personas

Attribuer un rôle à ChatGPT peut considérablement améliorer la qualité et la pertinence des réponses.

## Pourquoi utiliser des rôles ?

Quand vous donnez un rôle à ChatGPT, il adapte :
- Son vocabulaire et ton
- Son niveau de détail
- Ses références et exemples
- Sa structure de réponse

## Comment définir un rôle

### Format de base
\`\`\`
Tu es un [profession/expert] spécialisé dans [domaine]. Tu as [X années] d'expérience et tu es reconnu pour [compétence].
\`\`\`

### Exemples pratiques

**Expert SEO**
\`\`\`
Tu es un consultant SEO senior avec 15 ans d'expérience. Tu as travaillé avec des entreprises du CAC 40 et des startups. Tu connais parfaitement les algorithmes Google et les meilleures pratiques actuelles.
\`\`\`

**Coach business**
\`\`\`
Tu es un coach business pour entrepreneurs. Tu utilises la méthode SMART et tu poses des questions pertinentes pour aider à clarifier les objectifs. Tu encourages tout en restant pragmatique.
\`\`\`

## Astuce avancée : le multi-persona

Vous pouvez demander à ChatGPT de jouer plusieurs rôles dans une même conversation :

\`\`\`
Simule un débat entre un développeur senior favorable à Python et un autre favorable à JavaScript. Chacun doit défendre sa position avec des arguments techniques.
\`\`\``,
          },
          {
            title: "Le chaînage de prompts",
            slug: "chainage-prompts",
            duration: 18,
            isFree: false,
            content: `# Le chaînage de prompts

Le chaînage consiste à décomposer une tâche complexe en plusieurs étapes successives.

## Pourquoi chaîner ?

- Meilleur contrôle sur le processus
- Possibilité de corriger à chaque étape
- Résultats plus précis et détaillés
- Réduction des erreurs

## Exemple : créer une stratégie marketing

### Étape 1 : Analyse
\`\`\`
Analyse le marché des [produit] en France. Identifie les 3 principaux concurrents, leurs forces et faiblesses, et les opportunités non exploitées.
\`\`\`

### Étape 2 : Ciblage
\`\`\`
Sur la base de cette analyse, définis 3 personas clients idéaux. Pour chacun, précise : démographie, comportements, motivations, freins.
\`\`\`

### Étape 3 : Positionnement
\`\`\`
Propose 3 positionnements différents qui répondent aux opportunités identifiées et aux besoins des personas. Pour chaque positionnement, suggère un slogan.
\`\`\`

### Étape 4 : Plan d'action
\`\`\`
Développe un plan marketing sur 6 mois pour le positionnement n°2. Inclus les canaux, le budget estimé, et les KPIs à suivre.
\`\`\`

## Le "Continue" intelligent

Si ChatGPT s'arrête avant la fin, vous pouvez utiliser :
- "Continue"
- "Développe le point 3"
- "Détaille avec des exemples"`,
          },
        ],
      },
      {
        title: "Cas pratiques",
        order: 4,
        lessons: [
          {
            title: "ChatGPT pour la rédaction",
            slug: "chatgpt-redaction",
            duration: 20,
            isFree: false,
            content: `# ChatGPT pour la rédaction

Découvrez comment utiliser ChatGPT pour tous vos besoins rédactionnels.

## Emails professionnels

### Template de base
\`\`\`
Rédige un email [type: prospection/relance/remerciement]
- Destinataire : [qui]
- Contexte : [situation]
- Objectif : [ce que je veux obtenir]
- Ton : [formel/amical/urgent]
- Longueur : [court/moyen/détaillé]
\`\`\`

## Articles et contenus

### Optimisation SEO
\`\`\`
Optimise ce texte pour le SEO avec le mot-clé principal "[mot-clé]".
Contraintes :
- Intègre naturellement le mot-clé 3-4 fois
- Ajoute des sous-titres H2/H3 pertinents
- Propose une meta description de 155 caractères

[Votre texte]
\`\`\`

## Amélioration de texte

### Reformulation
\`\`\`
Reformule ce paragraphe pour le rendre plus :
- [ ] Concis
- [ ] Impactant
- [ ] Accessible
- [ ] Professionnel

[Votre texte]
\`\`\`

## Posts réseaux sociaux

### LinkedIn
\`\`\`
Transforme cette information en post LinkedIn engageant :
- Hook accrocheur en première ligne
- Structure aérée avec emojis professionnels
- Call-to-action en fin de post
- 3 hashtags pertinents

Information : [votre contenu]
\`\`\``,
          },
          {
            title: "ChatGPT pour l'analyse",
            slug: "chatgpt-analyse",
            duration: 18,
            isFree: false,
            content: `# ChatGPT pour l'analyse

ChatGPT excelle dans l'analyse et la synthèse d'informations. Voici comment en tirer le meilleur parti.

## Synthèse de documents

### Format efficace
\`\`\`
Analyse ce document et fournis :
1. Un résumé en 3 phrases
2. Les 5 points clés
3. Les implications principales
4. Les questions à se poser

Document :
[Coller le texte]
\`\`\`

## Analyse comparative

### Template
\`\`\`
Compare [option A] et [option B] selon ces critères :
- Prix
- Fonctionnalités
- Facilité d'utilisation
- Support client
- Évolutivité

Présente le résultat sous forme de tableau avec une recommandation finale.
\`\`\`

## Analyse SWOT

\`\`\`
Réalise une analyse SWOT complète pour [entreprise/projet] :

Contexte : [description]
Secteur : [industrie]
Objectif : [ce que vous voulez accomplir]

Fournis 4-5 éléments pour chaque catégorie avec des exemples concrets.
\`\`\`

## Extraction d'insights

\`\`\`
Voici des avis clients sur notre produit. Analyse-les et identifie :
- Les 3 points positifs les plus mentionnés
- Les 3 points d'amélioration récurrents
- Les suggestions clients à considérer
- Le sentiment général (score /10)

[Coller les avis]
\`\`\``,
          },
        ],
      },
      {
        title: "Bonnes pratiques",
        order: 5,
        lessons: [
          {
            title: "Éviter les pièges courants",
            slug: "eviter-pieges-courants",
            duration: 12,
            isFree: false,
            content: `# Éviter les pièges courants

Même avec de l'expérience, certains pièges peuvent compromettre vos résultats avec ChatGPT.

## Piège 1 : Faire confiance aveugle

ChatGPT peut affirmer des informations incorrectes avec assurance.

**Solution** : Vérifiez toujours les faits importants, surtout :
- Les chiffres et statistiques
- Les dates et événements historiques
- Les informations légales ou médicales

## Piège 2 : Prompts trop vagues

"Écris-moi quelque chose sur le marketing" donnera des résultats génériques.

**Solution** : Soyez spécifique sur :
- Le sujet exact
- L'audience cible
- Le format souhaité
- La longueur

## Piège 3 : Ignorer le contexte

ChatGPT ne se souvient pas des conversations précédentes (dans une nouvelle session).

**Solution** :
- Récapitulez le contexte important
- Gardez vos meilleurs prompts dans un document

## Piège 4 : Ne pas itérer

Le premier résultat n'est pas toujours le meilleur.

**Solution** :
- Demandez des alternatives
- Affinez avec des feedbacks
- Utilisez "plus de X, moins de Y"

## Piège 5 : Oublier les limites

ChatGPT n'est pas adapté pour tout.

**À éviter** :
- Conseils médicaux/juridiques précis
- Calculs complexes
- Informations très récentes`,
          },
          {
            title: "Organiser ses prompts",
            slug: "organiser-prompts",
            duration: 10,
            isFree: false,
            content: `# Organiser ses prompts

Une bonne organisation de vos prompts vous fera gagner un temps précieux.

## Créer une bibliothèque de prompts

### Par catégorie
- **Rédaction** : emails, articles, posts sociaux
- **Analyse** : synthèses, SWOT, comparatifs
- **Créativité** : brainstorming, noms, slogans
- **Code** : debug, documentation, refactoring

### Template de documentation

\`\`\`markdown
## Nom du prompt

**Objectif** : [description courte]
**Cas d'usage** : [quand l'utiliser]

### Prompt

[Le prompt complet]

### Variables à remplacer
- [VARIABLE1] : description
- [VARIABLE2] : description

### Exemple de résultat
[Un exemple de sortie réussie]

### Notes
[Conseils, variations possibles]
\`\`\`

## Outils de gestion

### Solutions simples
- Document Google/Notion partagé
- Application de notes (Obsidian, Evernote)
- Fichier Markdown sur GitHub

### Solutions avancées
- PromptBase (marketplace)
- FlowGPT (communauté)
- Extensions Chrome dédiées

## Conseil final

Mettez à jour régulièrement votre bibliothèque. Les prompts qui fonctionnent bien aujourd'hui peuvent être améliorés demain !`,
          },
        ],
      },
    ],
  },
  {
    slug: "art-du-prompting-debutants",
    title: "L'Art du Prompting pour Débutants",
    description:
      "Maîtrisez les fondamentaux du prompting pour obtenir des résultats exceptionnels avec n'importe quelle IA. Techniques, frameworks et exercices pratiques.",
    thumbnail: "/courses/prompting-basics.jpg",
    level: "BEGINNER" as const,
    category: "prompting-bases",
    duration: 150,
    requiredPlan: "BEGINNER" as const,
    chapters: [
      {
        title: "Les fondamentaux du prompting",
        order: 1,
        lessons: [
          {
            title: "Qu'est-ce que le prompting ?",
            slug: "introduction-prompting",
            duration: 12,
            isFree: true,
            content: `# Qu'est-ce que le prompting ?

Le prompting est l'art de communiquer efficacement avec les IA génératives pour obtenir les résultats souhaités.

## Définition

Un **prompt** est une instruction ou une requête que vous donnez à une IA. La qualité de votre prompt détermine directement la qualité de la réponse.

## Pourquoi le prompting est crucial

- Un bon prompt peut multiplier la qualité du résultat par 10
- C'est une compétence transversale : applicable à ChatGPT, Claude, Midjourney, etc.
- C'est de plus en plus demandé professionnellement

## Les piliers du bon prompting

1. **Clarté** : Soyez précis et sans ambiguïté
2. **Contexte** : Fournissez les informations nécessaires
3. **Contraintes** : Définissez les limites et formats
4. **Exemples** : Illustrez ce que vous attendez

## Ce que vous allez apprendre

Dans ce cours, vous découvrirez :
- Les différentes techniques de prompting
- Des frameworks éprouvés
- Des exercices pratiques
- Des cas d'usage concrets

Prêt à devenir un expert du prompting ?`,
          },
          {
            title: "Les types de prompts",
            slug: "types-de-prompts",
            duration: 15,
            isFree: true,
            content: `# Les types de prompts

Il existe plusieurs catégories de prompts, chacune adaptée à des situations spécifiques.

## 1. Prompts directifs

Instructions simples et directes.

**Exemple** :
\`\`\`
Traduis ce texte en anglais : "Bonjour, comment allez-vous ?"
\`\`\`

**Utilisation** : Tâches simples et bien définies.

## 2. Prompts descriptifs

Décrivent en détail le résultat attendu.

**Exemple** :
\`\`\`
Écris une description de produit de 100 mots pour des écouteurs sans fil. La description doit mettre en avant le confort, la qualité sonore et l'autonomie. Le ton doit être dynamique et moderne.
\`\`\`

## 3. Prompts conversationnels

Engagent un dialogue pour affiner progressivement.

**Exemple** :
\`\`\`
J'ai besoin d'aide pour organiser un événement professionnel. Commençons par les questions que tu as besoin de me poser.
\`\`\`

## 4. Prompts systèmes

Définissent le comportement global de l'IA.

**Exemple** :
\`\`\`
Tu es un assistant marketing expert. Tu réponds toujours de manière structurée avec des bullet points. Tu utilises des exemples concrets.
\`\`\`

## Choisir le bon type

| Situation | Type recommandé |
|-----------|----------------|
| Tâche simple | Directif |
| Création de contenu | Descriptif |
| Exploration d'idées | Conversationnel |
| Sessions récurrentes | Système |`,
          },
        ],
      },
      {
        title: "Frameworks de prompting",
        order: 2,
        lessons: [
          {
            title: "Le framework CRISPE",
            slug: "framework-crispe",
            duration: 20,
            isFree: false,
            content: `# Le framework CRISPE

CRISPE est un framework populaire pour structurer des prompts efficaces.

## Les composants

### C - Capacité (Capacity/Role)
Définissez le rôle que doit jouer l'IA.
\`\`\`
Tu es un consultant senior en stratégie d'entreprise...
\`\`\`

### R - Résultat (Insight)
Décrivez le résultat attendu.
\`\`\`
...et tu dois me fournir une analyse stratégique complète...
\`\`\`

### I - Information (Statement)
Donnez les informations contextuelles.
\`\`\`
...pour une entreprise de 50 personnes dans le secteur SaaS B2B qui souhaite s'internationaliser.
\`\`\`

### S - Style (Personality)
Précisez le style de communication.
\`\`\`
Utilise un ton professionnel mais accessible, avec des exemples concrets.
\`\`\`

### P - Présentation (Experiment)
Définissez le format de sortie.
\`\`\`
Présente ta réponse en 5 parties avec des titres clairs et des bullet points.
\`\`\`

### E - Exclusions (Exclusion)
Indiquez ce qu'il faut éviter.
\`\`\`
N'inclus pas de jargon technique complexe et évite les recommandations génériques.
\`\`\`

## Exemple complet CRISPE

\`\`\`
Tu es un consultant senior en stratégie d'entreprise [C]. Tu dois me fournir une analyse stratégique complète [R] pour une entreprise de 50 personnes dans le secteur SaaS B2B qui souhaite s'internationaliser vers le marché américain [I]. Utilise un ton professionnel mais accessible, avec des exemples concrets d'entreprises similaires [S]. Présente ta réponse en 5 parties : 1) Analyse du marché US, 2) Opportunités, 3) Risques, 4) Plan d'action, 5) Budget estimé. Utilise des bullet points [P]. N'inclus pas de jargon technique complexe et évite les recommandations génériques comme "faire du marketing" [E].
\`\`\``,
          },
        ],
      },
    ],
  },
  {
    slug: "generer-images-ia-midjourney",
    title: "Créer des Images IA avec Midjourney",
    description:
      "Apprenez à générer des images époustouflantes avec Midjourney. Du premier prompt aux techniques de style avancées, devenez un artiste de l'IA.",
    thumbnail: "/courses/midjourney.jpg",
    level: "BEGINNER" as const,
    category: "images-ia",
    duration: 140,
    requiredPlan: "BEGINNER" as const,
    chapters: [
      {
        title: "Découvrir Midjourney",
        order: 1,
        lessons: [
          {
            title: "Introduction à Midjourney",
            slug: "introduction-midjourney",
            duration: 10,
            isFree: true,
            content: `# Introduction à Midjourney

Midjourney est l'un des outils de génération d'images par IA les plus puissants et créatifs disponibles aujourd'hui.

## Qu'est-ce que Midjourney ?

Midjourney est un laboratoire de recherche indépendant qui a créé un programme d'IA capable de générer des images à partir de descriptions textuelles (prompts).

## Ce qui distingue Midjourney

- **Qualité artistique** : Images de très haute qualité esthétique
- **Style distinctif** : Rendu unique et reconnaissable
- **Communauté active** : Discord avec millions d'utilisateurs
- **Évolution constante** : Mises à jour régulières

## Types d'images possibles

- Illustrations artistiques
- Concepts de design
- Portraits stylisés
- Paysages fantastiques
- Produits et mockups
- Art abstrait

## Prérequis

- Un compte Discord
- Un abonnement Midjourney
- De la créativité !

## Ce que vous allez créer

À la fin de ce cours, vous serez capable de :
- Générer des images de qualité professionnelle
- Maîtriser les paramètres avancés
- Développer votre style personnel`,
          },
        ],
      },
    ],
  },
];

const intermediateCourses = [
  {
    slug: "automatiser-business-ia",
    title: "Automatiser son Business avec l'IA",
    description:
      "Découvrez comment utiliser Make, n8n et Zapier avec l'IA pour automatiser vos processus métier et gagner des heures chaque semaine.",
    thumbnail: "/courses/automation.jpg",
    level: "INTERMEDIATE" as const,
    category: "automatisation",
    duration: 240,
    requiredPlan: "PRO" as const,
    chapters: [
      {
        title: "Introduction à l'automatisation IA",
        order: 1,
        lessons: [
          {
            title: "Pourquoi automatiser avec l'IA ?",
            slug: "pourquoi-automatiser-ia",
            duration: 15,
            isFree: true,
            content: `# Pourquoi automatiser avec l'IA ?

L'automatisation boostée par l'IA représente une révolution dans la façon dont nous travaillons.

## Le problème des tâches répétitives

En moyenne, un professionnel passe :
- **28%** de son temps sur des emails
- **20%** à rechercher des informations
- **14%** à communiquer en interne

## Ce que l'IA change

L'IA permet d'automatiser non plus seulement les tâches **mécaniques** mais aussi les tâches **cognitives** :

- Rédiger des emails personnalisés
- Analyser et résumer des documents
- Catégoriser et prioriser des demandes
- Générer des rapports

## Les outils que nous allons utiliser

### Make (ex-Integromat)
Plateforme visuelle d'automatisation avec plus de 1000 intégrations.

### n8n
Alternative open-source puissante et flexible.

### Zapier
Le plus accessible pour débuter.

## Exemples d'automatisations IA

1. **Service client** : Tri et réponse automatique aux emails
2. **Marketing** : Génération de contenu personnalisé
3. **RH** : Présélection de CVs
4. **Finance** : Extraction et analyse de factures

## ROI typique

Une automatisation bien conçue peut faire économiser :
- 5-15 heures par semaine
- Retour sur investissement en 1-3 mois`,
          },
          {
            title: "Choisir le bon outil",
            slug: "choisir-bon-outil",
            duration: 20,
            isFree: false,
            content: `# Choisir le bon outil d'automatisation

Chaque outil a ses forces et ses cas d'usage idéaux.

## Comparatif rapide

| Critère | Make | n8n | Zapier |
|---------|------|-----|--------|
| Facilité | ★★★☆☆ | ★★☆☆☆ | ★★★★★ |
| Puissance | ★★★★★ | ★★★★★ | ★★★☆☆ |
| Prix | €€ | Gratuit/€€ | €€€ |
| Support IA | ★★★★☆ | ★★★★☆ | ★★★☆☆ |

## Make : le choix polyvalent

**Idéal pour** :
- Scénarios complexes avec branches conditionnelles
- Manipulation de données avancée
- Budget modéré

**Points forts** :
- Interface visuelle intuitive
- Puissant module HTTP pour les APIs
- Intégration native OpenAI

## n8n : le choix technique

**Idéal pour** :
- Équipes techniques
- Auto-hébergement souhaité
- Workflows très complexes

**Points forts** :
- Open source et gratuit
- Personnalisation illimitée
- Communauté active

## Zapier : le choix simple

**Idéal pour** :
- Débutants en automatisation
- Automatisations simples
- Intégrations standard

**Points forts** :
- Très facile à prendre en main
- Énorme catalogue d'apps
- Templates prêts à l'emploi

## Ma recommandation

Commencez avec **Make** pour un bon équilibre entre accessibilité et puissance.`,
          },
        ],
      },
      {
        title: "Make + ChatGPT",
        order: 2,
        lessons: [
          {
            title: "Configurer l'intégration OpenAI",
            slug: "configurer-openai-make",
            duration: 18,
            isFree: false,
            content: `# Configurer l'intégration OpenAI dans Make

Apprenez à connecter ChatGPT à vos automatisations Make.

## Prérequis

- Compte Make (gratuit pour commencer)
- Clé API OpenAI
- Crédits OpenAI (quelques dollars suffisent)

## Étape 1 : Obtenir votre clé API OpenAI

1. Connectez-vous sur platform.openai.com
2. Allez dans "API keys"
3. Créez une nouvelle clé
4. **Copiez-la immédiatement** (elle ne sera plus visible)

## Étape 2 : Créer la connexion dans Make

1. Dans Make, créez un nouveau scénario
2. Ajoutez un module "OpenAI"
3. Cliquez sur "Add" pour créer une connexion
4. Collez votre clé API
5. Nommez la connexion (ex: "Mon compte OpenAI")

## Configuration du module ChatGPT

### Paramètres essentiels

- **Model** : gpt-4 ou gpt-3.5-turbo
- **Messages** : Vos prompts système et utilisateur
- **Temperature** : 0.7 par défaut (0 = déterministe, 1 = créatif)
- **Max tokens** : Limite de la réponse

### Structure des messages

\`\`\`json
[
  {
    "role": "system",
    "content": "Tu es un assistant professionnel..."
  },
  {
    "role": "user",
    "content": "{{1.email_content}}"
  }
]
\`\`\`

## Conseils de coût

- Utilisez gpt-3.5-turbo pour les tâches simples (10x moins cher)
- Limitez les tokens de réponse
- Cachez les réponses fréquentes`,
          },
        ],
      },
    ],
  },
  {
    slug: "prompting-avance-techniques-pro",
    title: "Prompting Avancé : Techniques Pro",
    description:
      "Maîtrisez les techniques de prompting les plus avancées : Chain of Thought, Tree of Thoughts, agents autonomes et plus encore.",
    thumbnail: "/courses/advanced-prompting.jpg",
    level: "INTERMEDIATE" as const,
    category: "prompting-avance",
    duration: 200,
    requiredPlan: "PRO" as const,
    chapters: [
      {
        title: "Au-delà des basics",
        order: 1,
        lessons: [
          {
            title: "Chain of Thought (CoT)",
            slug: "chain-of-thought",
            duration: 25,
            isFree: true,
            content: `# Chain of Thought (CoT)

La technique Chain of Thought améliore significativement les capacités de raisonnement des LLMs.

## Le principe

Au lieu de demander directement la réponse, on demande à l'IA de "réfléchir étape par étape".

## Pourquoi ça fonctionne ?

Les LLMs sont meilleurs quand ils :
1. Décomposent un problème complexe
2. Verbalisent leur raisonnement
3. Construisent sur les étapes précédentes

## Prompt standard vs CoT

### Standard (moins efficace)
\`\`\`
Quelle est la réponse à ce problème : Jean a 5 pommes, Marie lui en donne 3, puis il en mange 2 et en achète 4. Combien en a-t-il ?
\`\`\`

### Avec CoT (plus efficace)
\`\`\`
Résous ce problème étape par étape :
Jean a 5 pommes, Marie lui en donne 3, puis il en mange 2 et en achète 4. Combien en a-t-il ?

Montre ton raisonnement à chaque étape.
\`\`\`

## Variantes de CoT

### Zero-shot CoT
Ajoutez simplement "Réfléchis étape par étape" ou "Let's think step by step" à la fin de votre prompt.

### Few-shot CoT
Fournissez des exemples de raisonnement :

\`\`\`
Q: Roger a 5 balles de tennis. Il achète 2 packs de 3 balles. Combien de balles a-t-il maintenant ?
A: Roger a commencé avec 5 balles. 2 packs de 3 balles = 2 × 3 = 6 balles. 5 + 6 = 11 balles. Réponse: 11

Q: [Votre question]
A:
\`\`\`

## Cas d'usage idéaux

- Problèmes mathématiques
- Raisonnement logique
- Analyse complexe
- Prise de décision`,
          },
        ],
      },
    ],
  },
  {
    slug: "construire-chatbot-rag",
    title: "Construire un Chatbot RAG",
    description:
      "Apprenez à créer un chatbot intelligent qui répond en s'appuyant sur vos propres documents grâce à la technique RAG (Retrieval Augmented Generation).",
    thumbnail: "/courses/rag-chatbot.jpg",
    level: "INTERMEDIATE" as const,
    category: "rag",
    duration: 220,
    requiredPlan: "PRO" as const,
    chapters: [
      {
        title: "Comprendre le RAG",
        order: 1,
        lessons: [
          {
            title: "Introduction au RAG",
            slug: "introduction-rag",
            duration: 20,
            isFree: true,
            content: `# Introduction au RAG

RAG (Retrieval Augmented Generation) est une technique révolutionnaire qui permet aux LLMs d'accéder à vos données spécifiques.

## Le problème des LLMs classiques

Les modèles comme ChatGPT ont des limites :
- Connaissances figées (date de coupure)
- Pas d'accès à vos données internes
- Peuvent "halluciner" des informations

## La solution RAG

RAG combine deux approches :

### 1. Retrieval (Récupération)
Recherche dans votre base de documents les passages pertinents pour la question posée.

### 2. Augmented Generation (Génération augmentée)
Utilise ces passages comme contexte pour générer une réponse précise et sourcée.

## Le flux RAG

\`\`\`
Question utilisateur
        ↓
[Recherche sémantique dans vos documents]
        ↓
Passages pertinents récupérés
        ↓
[Contexte + Question envoyés au LLM]
        ↓
Réponse basée sur VOS données
\`\`\`

## Cas d'usage

- **Support client** : FAQ intelligente basée sur votre documentation
- **Interne** : Assistant qui connaît vos processus
- **Juridique** : Recherche dans des contrats
- **Médical** : Aide au diagnostic basée sur la littérature

## Ce que vous allez construire

Un chatbot capable de :
- Ingérer vos documents (PDF, Word, etc.)
- Répondre aux questions en citant ses sources
- Avouer quand il ne sait pas`,
          },
        ],
      },
    ],
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.progress.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.course.deleteMany();

  // Create beginner courses
  for (const courseData of beginnerCourses) {
    const { chapters, ...course } = courseData;

    const createdCourse = await prisma.course.create({
      data: {
        ...course,
        published: true,
      },
    });

    for (const chapterData of chapters) {
      const { lessons, ...chapter } = chapterData;

      const createdChapter = await prisma.chapter.create({
        data: {
          ...chapter,
          courseId: createdCourse.id,
        },
      });

      for (const lesson of lessons) {
        await prisma.lesson.create({
          data: {
            ...lesson,
            chapterId: createdChapter.id,
            order: lessons.indexOf(lesson) + 1,
          },
        });
      }
    }

    console.log(`✅ Created course: ${course.title}`);
  }

  // Create intermediate courses
  for (const courseData of intermediateCourses) {
    const { chapters, ...course } = courseData;

    const createdCourse = await prisma.course.create({
      data: {
        ...course,
        published: true,
      },
    });

    for (const chapterData of chapters) {
      const { lessons, ...chapter } = chapterData;

      const createdChapter = await prisma.chapter.create({
        data: {
          ...chapter,
          courseId: createdCourse.id,
        },
      });

      for (const lesson of lessons) {
        await prisma.lesson.create({
          data: {
            ...lesson,
            chapterId: createdChapter.id,
            order: lessons.indexOf(lesson) + 1,
          },
        });
      }
    }

    console.log(`✅ Created course: ${course.title}`);
  }

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@aiacademy.fr" },
    update: {},
    create: {
      email: "admin@aiacademy.fr",
      name: "Admin AI Academy",
      role: "ADMIN",
    },
  });

  console.log(`✅ Created admin user: ${adminUser.email}`);

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
