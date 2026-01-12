# AI Learning Platform

Plateforme d'apprentissage de l'Intelligence Artificielle avec cours interactifs, système d'abonnement et certification.

## Technologies

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Base de données**: PostgreSQL (Supabase/Neon)
- **Authentification**: NextAuth.js (Google, GitHub, Email)
- **Paiements**: Stripe (Abonnements)
- **Animations**: Framer Motion

## Fonctionnalités

- Catalogue de cours avec filtrage par niveau
- Lecteur de cours avec suivi de progression
- Système d'abonnement (Gratuit, Débutant, Pro)
- Dashboard utilisateur personnalisé
- Certificats de complétion
- Interface d'administration complète
- Mode sombre/clair

## Installation

### Prérequis

- Node.js 18+
- PostgreSQL (ou compte Supabase/Neon)
- Compte Stripe
- Comptes OAuth (Google, GitHub)

### Configuration

1. Cloner le repository :

```bash
git clone <repository-url>
cd ai-learning-platform
```

2. Installer les dépendances :

```bash
npm install
```

3. Copier le fichier d'environnement :

```bash
cp .env.example .env
```

4. Configurer les variables d'environnement dans `.env` :

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="générer avec: openssl rand -base64 32"

# OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_ID="..."
GITHUB_SECRET="..."

# Stripe
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_PRICE_BEGINNER_MONTHLY="price_..."
STRIPE_PRICE_PRO_MONTHLY="price_..."
```

5. Initialiser la base de données :

```bash
npm run db:push
npm run db:seed
```

6. Lancer le serveur de développement :

```bash
npm run dev
```

## Déploiement sur Vercel

### 1. Préparer la base de données

Créer une base de données PostgreSQL sur Supabase ou Neon.

### 2. Configurer Stripe

1. Créer les produits et prix dans le dashboard Stripe
2. Configurer le webhook vers `https://votre-domaine.vercel.app/api/webhooks/stripe`
3. Événements webhook requis :
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

### 3. Déployer sur Vercel

1. Connecter le repository GitHub à Vercel
2. Configurer les variables d'environnement :
   - Toutes les variables du `.env`
   - `NEXTAUTH_URL` = URL de production
3. Le build inclut automatiquement `prisma generate`

### 4. Exécuter les migrations

```bash
npx prisma db push
npm run db:seed
```

## Scripts

```bash
npm run dev        # Serveur de développement
npm run build      # Build de production
npm run start      # Serveur de production
npm run lint       # Linter ESLint
npm run db:push    # Appliquer le schema Prisma
npm run db:seed    # Peupler la base de données
npm run db:studio  # Interface Prisma Studio
```

## Structure du projet

```
src/
├── app/
│   ├── (marketing)/     # Pages publiques
│   ├── (auth)/          # Pages d'authentification
│   ├── admin/           # Interface d'administration
│   ├── dashboard/       # Dashboard utilisateur
│   └── api/             # Routes API
├── components/
│   ├── ui/              # Composants shadcn/ui
│   ├── marketing/       # Composants marketing
│   ├── dashboard/       # Composants dashboard
│   ├── courses/         # Composants cours
│   └── shared/          # Composants partagés
├── lib/
│   ├── auth.ts          # Configuration NextAuth
│   ├── db.ts            # Client Prisma
│   ├── stripe.ts        # Configuration Stripe
│   └── utils.ts         # Utilitaires
└── prisma/
    ├── schema.prisma    # Schema de base de données
    └── seed.ts          # Données de seed
```

## Plans tarifaires

| Plan | Prix | Accès |
|------|------|-------|
| Gratuit | 0€ | Cours gratuits uniquement |
| Débutant | 9,99€/mois | Tous les cours débutant |
| Pro | 19,99€/mois | Tous les cours |

## Licence

MIT
# Trigger rebuild
