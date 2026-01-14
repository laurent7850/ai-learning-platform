export const siteConfig = {
  name: "AI Academy",
  description: "Apprenez à maîtriser l'Intelligence Artificielle avec nos cours interactifs. Du débutant au professionnel, devenez expert en IA.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og.jpg",
  links: {
    twitter: "https://twitter.com/aiacademy",
    github: "https://github.com/aiacademy",
  },
};

export const navItems = [
  {
    title: "Cours",
    href: "/cours",
  },
  {
    title: "Tarifs",
    href: "/tarifs",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "À propos",
    href: "/a-propos",
  },
];

// Sujets des cours (indépendants du niveau)
export const subjects = [
  { id: "prompting", name: "Prompt Engineering", slug: "prompting", icon: "Sparkles", description: "Maîtriser l'art de communiquer avec l'IA" },
  { id: "chatgpt-claude", name: "ChatGPT & Claude", slug: "chatgpt-claude", icon: "MessageSquare", description: "Utiliser les assistants IA conversationnels" },
  { id: "images-ia", name: "Génération d'images", slug: "images-ia", icon: "Image", description: "Créer des visuels avec Midjourney, DALL-E..." },
  { id: "automatisation", name: "Automatisation", slug: "automatisation", icon: "Bot", description: "Automatiser ses tâches avec l'IA" },
  { id: "productivite", name: "Productivité", slug: "productivite", icon: "Zap", description: "Booster sa productivité au quotidien" },
  { id: "marketing-ia", name: "Marketing IA", slug: "marketing-ia", icon: "TrendingUp", description: "IA pour le marketing et la création de contenu" },
  { id: "dev-ia", name: "IA pour développeurs", slug: "ia-developpeurs", icon: "Code", description: "Coder plus vite avec l'IA" },
  { id: "rag", name: "RAG & Chatbots", slug: "rag", icon: "Database", description: "Créer des assistants IA personnalisés" },
];

// Niveaux de difficulté
export const levels = [
  { id: "BEGINNER", name: "Débutant", slug: "BEGINNER", description: "Aucun prérequis, idéal pour commencer" },
  { id: "INTERMEDIATE", name: "Intermédiaire", slug: "INTERMEDIATE", description: "Bases acquises, approfondir ses compétences" },
];

// Legacy: garder pour compatibilité avec l'ancien code
export const categories = {
  BEGINNER: [
    { id: "intro-ia", name: "Introduction à l'IA", slug: "introduction-ia", icon: "Brain" },
    { id: "chatgpt", name: "Maîtriser ChatGPT / Claude", slug: "chatgpt-claude", icon: "MessageSquare" },
    { id: "prompting-base", name: "L'art du prompting", slug: "prompting", icon: "Sparkles" },
    { id: "productivite", name: "IA et productivité", slug: "productivite", icon: "Zap" },
    { id: "images-ia", name: "Générer des images IA", slug: "images-ia", icon: "Image" },
    { id: "ethique", name: "IA et éthique", slug: "ethique-ia", icon: "Shield" },
  ],
  INTERMEDIATE: [
    { id: "prompting-avance", name: "Prompting avancé", slug: "prompting", icon: "Target" },
    { id: "automatisation", name: "Automatisation IA", slug: "automatisation", icon: "Bot" },
    { id: "marketing-ia", name: "IA pour le marketing", slug: "marketing-ia", icon: "TrendingUp" },
    { id: "data-ia", name: "Analyse de données IA", slug: "analyse-donnees", icon: "BarChart" },
    { id: "chatbots", name: "Chatbots personnalisés", slug: "chatbots", icon: "MessageCircle" },
    { id: "rag", name: "RAG & bases de connaissances", slug: "rag", icon: "Database" },
    { id: "dev-ia", name: "IA pour développeurs", slug: "ia-developpeurs", icon: "Code" },
  ],
};

export const testimonials = [
  {
    id: "1",
    name: "Sophie Martin",
    role: "Marketing Manager",
    avatar: "/avatars/avatar-1.jpg",
    content: "Grâce à AI Academy, j'ai pu automatiser 70% de mes tâches de création de contenu. Les cours sont clairs et très pratiques !",
    rating: 5,
  },
  {
    id: "2",
    name: "Thomas Dupont",
    role: "Entrepreneur",
    avatar: "/avatars/avatar-2.jpg",
    content: "Le cours sur l'automatisation avec Make m'a permis de gagner 15 heures par semaine. Investissement rentabilisé en 1 mois.",
    rating: 5,
  },
  {
    id: "3",
    name: "Marie Leroy",
    role: "Consultante RH",
    avatar: "/avatars/avatar-3.jpg",
    content: "Je partais de zéro et maintenant j'utilise l'IA quotidiennement. La pédagogie est excellente, même pour les non-techniques.",
    rating: 5,
  },
  {
    id: "4",
    name: "Pierre Bernard",
    role: "Développeur Full-Stack",
    avatar: "/avatars/avatar-4.jpg",
    content: "Le module RAG m'a ouvert les yeux sur les possibilités. J'ai créé mon premier assistant IA personnalisé en 2 semaines.",
    rating: 5,
  },
];

export const faqs = [
  {
    question: "Ai-je besoin de compétences techniques pour suivre les cours ?",
    answer: "Non ! Nos cours niveau Débutant sont conçus pour être accessibles à tous, sans aucune connaissance technique préalable. Nous vous guidons pas à pas.",
  },
  {
    question: "Combien de temps faut-il pour compléter un cours ?",
    answer: "Chaque cours indique sa durée estimée. En moyenne, un cours complet prend entre 3 et 8 heures. Vous pouvez apprendre à votre rythme, les cours restent accessibles indéfiniment.",
  },
  {
    question: "Les cours sont-ils mis à jour ?",
    answer: "Oui, régulièrement ! L'IA évolue rapidement, nous mettons donc à jour nos contenus pour refléter les dernières avancées et meilleures pratiques.",
  },
  {
    question: "Puis-je annuler mon abonnement à tout moment ?",
    answer: "Absolument. Vous pouvez annuler votre abonnement à tout moment depuis votre espace personnel. Vous gardez l'accès jusqu'à la fin de votre période de facturation.",
  },
  {
    question: "Y a-t-il une garantie satisfait ou remboursé ?",
    answer: "Oui, nous offrons une garantie de 14 jours. Si vous n'êtes pas satisfait, contactez-nous et nous vous rembourserons intégralement.",
  },
  {
    question: "Les certificats sont-ils reconnus ?",
    answer: "Nos certificats attestent de vos compétences acquises et peuvent être partagés sur LinkedIn. Bien qu'ils ne soient pas des diplômes officiels, ils sont de plus en plus valorisés par les employeurs.",
  },
];

export const stats = [
  { value: "10,000+", label: "Apprenants actifs" },
  { value: "50+", label: "Cours disponibles" },
  { value: "98%", label: "Taux de satisfaction" },
  { value: "24/7", label: "Accès illimité" },
];
