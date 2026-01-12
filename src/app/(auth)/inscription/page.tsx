"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2, Mail, Github, Chrome, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const benefits = [
  "Accès à des cours gratuits",
  "Suivi de votre progression",
  "Certificats de complétion",
  "Communauté Discord",
];

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("redirect") || "/dashboard";
  const plan = searchParams.get("plan");
  const billing = searchParams.get("billing");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleOAuthSignIn = async (provider: string) => {
    setLoadingProvider(provider);
    const redirectUrl = plan
      ? `/dashboard?checkout=true&plan=${plan}&billing=${billing}`
      : callbackUrl;
    await signIn(provider, { callbackUrl: redirectUrl });
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    const redirectUrl = plan
      ? `/dashboard?checkout=true&plan=${plan}&billing=${billing}`
      : callbackUrl;
    await signIn("credentials", {
      email,
      password: "demo",
      callbackUrl: redirectUrl,
    });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-4xl">
      {/* Benefits */}
      <div className="lg:w-1/2 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Commencez votre apprentissage IA
          </h1>
          <p className="text-muted-foreground">
            Créez votre compte gratuit et accédez immédiatement à nos cours.
          </p>
        </div>

        <ul className="space-y-3">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-4 w-4" />
              </div>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {plan && (
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm font-medium text-primary">
              Vous avez sélectionné le plan{" "}
              {plan === "BEGINNER" ? "Débutant" : "Pro"} ({billing === "yearly" ? "annuel" : "mensuel"})
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Après inscription, vous serez redirigé vers le paiement.
            </p>
          </div>
        )}
      </div>

      {/* Form */}
      <Card className="lg:w-1/2">
        <CardHeader>
          <CardTitle>Créer un compte</CardTitle>
          <CardDescription>
            C'est gratuit et rapide
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* OAuth Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthSignIn("google")}
              disabled={loadingProvider !== null}
            >
              {loadingProvider === "google" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Chrome className="mr-2 h-4 w-4" />
              )}
              S'inscrire avec Google
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthSignIn("github")}
              disabled={loadingProvider !== null}
            >
              {loadingProvider === "github" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Github className="mr-2 h-4 w-4" />
              )}
              S'inscrire avec GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Ou avec votre email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom (optionnel)</Label>
              <Input
                id="name"
                type="text"
                placeholder="Votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Mail className="mr-2 h-4 w-4" />
              )}
              Créer mon compte
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center">
            En créant un compte, vous acceptez nos{" "}
            <Link href="/conditions" className="underline">
              conditions d'utilisation
            </Link>{" "}
            et notre{" "}
            <Link href="/confidentialite" className="underline">
              politique de confidentialité
            </Link>
            .
          </p>
        </CardContent>

        <CardFooter>
          <p className="text-sm text-muted-foreground text-center w-full">
            Déjà un compte ?{" "}
            <Link
              href="/connexion"
              className="text-primary hover:underline font-medium"
            >
              Se connecter
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
