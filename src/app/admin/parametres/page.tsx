"use client";

import { useState } from "react";
import { Save, Loader2, Globe, Mail, CreditCard, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "AI Learning Platform",
    siteDescription: "Apprenez l'IA avec des cours pratiques et interactifs",
    siteUrl: "https://ai-learning.example.com",
    contactEmail: "contact@ai-learning.example.com",
    supportEmail: "support@ai-learning.example.com",
    enableRegistration: true,
    enableBlog: true,
    enableNewsletter: true,
    maintenanceMode: false,
    emailNotifications: true,
    stripeTestMode: true,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert("Paramètres enregistrés");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">
          Configurez les paramètres généraux de la plateforme
        </p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <CardTitle>Paramètres généraux</CardTitle>
            </div>
            <CardDescription>
              Informations de base sur votre plateforme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Nom du site</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, siteName: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteDescription">Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    siteDescription: e.target.value,
                  }))
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteUrl">URL du site</Label>
              <Input
                id="siteUrl"
                type="url"
                value={settings.siteUrl}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, siteUrl: e.target.value }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <CardTitle>Configuration email</CardTitle>
            </div>
            <CardDescription>
              Adresses email utilisées par la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email de contact</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    contactEmail: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportEmail">Email de support</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    supportEmail: e.target.value,
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Feature Toggles */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Fonctionnalités</CardTitle>
            </div>
            <CardDescription>
              Activez ou désactivez les fonctionnalités de la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Inscription des utilisateurs</Label>
                <p className="text-sm text-muted-foreground">
                  Permettre aux nouveaux utilisateurs de s&apos;inscrire
                </p>
              </div>
              <Switch
                checked={settings.enableRegistration}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({
                    ...prev,
                    enableRegistration: checked,
                  }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Blog</Label>
                <p className="text-sm text-muted-foreground">
                  Afficher la section blog sur le site
                </p>
              </div>
              <Switch
                checked={settings.enableBlog}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, enableBlog: checked }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Newsletter</Label>
                <p className="text-sm text-muted-foreground">
                  Permettre l&apos;inscription à la newsletter
                </p>
              </div>
              <Switch
                checked={settings.enableNewsletter}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, enableNewsletter: checked }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-destructive">Mode maintenance</Label>
                <p className="text-sm text-muted-foreground">
                  Mettre le site en mode maintenance (accès admin uniquement)
                </p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, maintenanceMode: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Gérez les notifications email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifications email</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir des notifications pour les nouveaux inscrits et
                  abonnements
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({
                    ...prev,
                    emailNotifications: checked,
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Stripe */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <CardTitle>Paiements (Stripe)</CardTitle>
            </div>
            <CardDescription>
              Configuration des paiements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Mode test</Label>
                <p className="text-sm text-muted-foreground">
                  Utiliser les clés de test Stripe (aucun paiement réel)
                </p>
              </div>
              <Switch
                checked={settings.stripeTestMode}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, stripeTestMode: checked }))
                }
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Clé publique Stripe</Label>
              <Input
                type="password"
                value="pk_test_•••••••••••••••••••••••••••"
                disabled
              />
              <p className="text-xs text-muted-foreground">
                Configurée via les variables d&apos;environnement
              </p>
            </div>

            <div className="space-y-2">
              <Label>Clé secrète Stripe</Label>
              <Input
                type="password"
                value="sk_test_•••••••••••••••••••••••••••"
                disabled
              />
              <p className="text-xs text-muted-foreground">
                Configurée via les variables d&apos;environnement
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer les paramètres
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
