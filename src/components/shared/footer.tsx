"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
    <footer className="relative border-t border-border/50 bg-muted/30">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Brain className="h-5 w-5 text-white" />
              </motion.div>
              <span className="font-bold text-xl group-hover:text-primary transition-colors">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed">
              La plateforme de référence pour apprendre à maîtriser
              l'Intelligence Artificielle et booster votre productivité.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-card/50 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {[
            { title: "Plateforme", links: footerLinks.platform },
            { title: "Entreprise", links: footerLinks.company },
            { title: "Ressources", links: footerLinks.resources },
            { title: "Légal", links: footerLinks.legal },
          ].map((section, sectionIndex) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-sm">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                    >
                      <span className="w-0 h-px bg-primary transition-all duration-300 mr-0 group-hover:w-2 group-hover:mr-2" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {siteConfig.name}. Tous droits
              réservés.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Fait avec{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              </motion.span>{" "}
              en France
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
