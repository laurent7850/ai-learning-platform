import Link from "next/link";
import { Brain, Twitter, Github, Linkedin, Mail, Heart } from "lucide-react";
import { siteConfig } from "@/lib/config";

const footerLinks = {
  platform: [
    { label: "Catalogue des cours", href: "/cours" },
    { label: "Tarifs", href: "/tarifs" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/tarifs#faq" },
  ],
  company: [
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
    { label: "Carrières", href: "/carrieres" },
    { label: "Presse", href: "/presse" },
  ],
  legal: [
    { label: "Conditions d'utilisation", href: "/conditions" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "CGV", href: "/cgv" },
  ],
  resources: [
    { label: "Centre d'aide", href: "/aide" },
    { label: "Communauté Discord", href: "/discord" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Partenaires", href: "/partenaires" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: siteConfig.links.twitter, label: "Twitter" },
  { icon: Github, href: siteConfig.links.github, label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:contact@aiacademy.fr", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-muted/10">
      <div className="container py-12 md:py-14">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-lg">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              La plateforme de référence pour apprendre à maîtriser
              l'Intelligence Artificielle et booster votre productivité.
            </p>

            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border/40 text-muted-foreground hover:text-foreground hover:border-border/60 transition-colors"
                >
                  <social.icon className="h-3.5 w-3.5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Plateforme", links: footerLinks.platform },
            { title: "Entreprise", links: footerLinks.company },
            { title: "Ressources", links: footerLinks.resources },
            { title: "Légal", links: footerLinks.legal },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="font-medium mb-3 text-sm">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Fait avec <Heart className="h-3 w-3 text-red-500 fill-red-500" /> en France
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
