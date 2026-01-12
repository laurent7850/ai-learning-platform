import { NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import type { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/connexion",
    signOut: "/",
    error: "/connexion",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        // Pour la démo, accepter n'importe quel email/password
        // En production, implémenter une vraie vérification
        if (!credentials?.email) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        }

        // Créer un nouvel utilisateur si n'existe pas (mode démo)
        const newUser = await db.user.create({
          data: {
            email: credentials.email,
            name: credentials.email.split("@")[0],
          },
        });

        return {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          image: newUser.image,
        };
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role as "USER" | "ADMIN";
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        role: dbUser.role,
      };
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);

export const getCurrentUser = async () => {
  const session = await getAuthSession();
  return session?.user;
};

export const requireAuth = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error("Non autorisé");
  }
  return session.user;
};

export const requireAdmin = async () => {
  const user = await requireAuth();
  if (user.role !== "ADMIN") {
    throw new Error("Accès administrateur requis");
  }
  return user;
};
