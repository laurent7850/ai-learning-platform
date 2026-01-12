import Link from "next/link";
import { Brain, Twitter, Github, Linkedin, Mail } from "lucide-react";
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

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              La plateforme de référence pour apprendre à maîtriser
              l'Intelligence Artificielle et booster votre productivité.
            </p>
            <div className="flex gap-4">
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:contact@aiacademy.fr"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3">Plateforme</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Entreprise</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Ressources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Légal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Tous droits
            réservés.
          </p>
          <p className="text-sm text-muted-foreground">
            Fait avec passion en France
          </p>
        </div>
      </div>
    </footer>
  );
}
