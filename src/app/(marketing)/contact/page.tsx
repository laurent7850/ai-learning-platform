import { Metadata } from "next";
import { Mail, MessageSquare, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une question ? Besoin d'aide ? Contactez notre équipe, nous vous répondons sous 24h.",
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    description: "Notre équipe répond sous 24h",
    value: "contact@aiacademy.fr",
  },
  {
    icon: MessageSquare,
    title: "Discord",
    description: "Rejoignez notre communauté",
    value: "discord.gg/aiacademy",
  },
  {
    icon: MapPin,
    title: "Adresse",
    description: "Notre siège social",
    value: "Paris, France",
  },
  {
    icon: Clock,
    title: "Horaires",
    description: "Support disponible",
    value: "Lun-Ven, 9h-18h",
  },
];

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-muted-foreground">
            Une question sur nos cours ? Un problème technique ? Notre équipe
            est là pour vous aider.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="rounded-xl border bg-card p-8">
            <h2 className="text-xl font-semibold mb-6">
              Envoyez-nous un message
            </h2>

            <form className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" placeholder="Jean" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" placeholder="Dupont" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jean.dupont@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un sujet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Question générale</SelectItem>
                    <SelectItem value="courses">
                      Question sur les cours
                    </SelectItem>
                    <SelectItem value="subscription">
                      Abonnement et facturation
                    </SelectItem>
                    <SelectItem value="technical">
                      Problème technique
                    </SelectItem>
                    <SelectItem value="partnership">Partenariat</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Décrivez votre demande..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Envoyer le message
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                En soumettant ce formulaire, vous acceptez notre{" "}
                <a href="/confidentialite" className="underline">
                  politique de confidentialité
                </a>
                .
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-6">
                Autres moyens de nous contacter
              </h2>
              <div className="grid gap-6">
                {contactInfo.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-4 rounded-lg border bg-card"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <p className="text-sm font-medium mt-1">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Link */}
            <div className="rounded-xl bg-muted/50 p-6">
              <h3 className="font-semibold mb-2">
                Consultez d'abord notre FAQ
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Vous trouverez peut-être la réponse à votre question dans notre
                foire aux questions.
              </p>
              <Button variant="outline" asChild>
                <a href="/tarifs#faq">Voir la FAQ</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
