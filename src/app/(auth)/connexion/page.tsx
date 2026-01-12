"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2, Mail, Github, Chrome } from "lucide-react";
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

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("redirect") || "/dashboard";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleOAuthSignIn = async (provider: string) => {
    setLoadingProvider(provider);
    await signIn(provider, { callbackUrl });
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await signIn("credentials", {
      email,
      password: "demo",
      callbackUrl,
    });
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Connexion</CardTitle>
        <CardDescription>
          Connectez-vous pour accéder à vos cours
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
            {error === "OAuthSignin" && "Erreur lors de la connexion OAuth."}
            {error === "OAuthCallback" && "Erreur de callback OAuth."}
            {error === "OAuthCreateAccount" && "Impossible de créer le compte."}
            {error === "Callback" && "Erreur de callback."}
            {error === "Default" && "Une erreur est survenue."}
          </div>
        )}

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
            Continuer avec Google
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
            Continuer avec GitHub
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
        <form onSubmit={handleEmailSignIn} className="space-y-4">
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
            Se connecter avec l'email
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center">
          Mode démo : entrez n'importe quel email pour vous connecter.
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground text-center">
          Pas encore de compte ?{" "}
          <Link
            href="/inscription"
            className="text-primary hover:underline font-medium"
          >
            Créer un compte
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
