"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Marquee } from "@/components/ui/marquee";
import { getInitials } from "@/lib/utils";

const testimonials = [
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
  {
    id: "5",
    name: "Claire Fontaine",
    role: "Chef de projet",
    avatar: "/avatars/avatar-5.jpg",
    content: "Formation de qualité professionnelle. J'ai appris à créer des prompts efficaces qui ont transformé ma productivité.",
    rating: 5,
  },
  {
    id: "6",
    name: "Lucas Moreau",
    role: "Freelance Designer",
    avatar: "/avatars/avatar-6.jpg",
    content: "Les cours sur Midjourney et DALL-E ont révolutionné mon workflow créatif. Je recommande à 100% !",
    rating: 5,
  },
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="w-[320px] shrink-0 rounded-lg border border-border/40 bg-card p-5 transition-colors hover:border-border/60">
      <Quote className="absolute top-3 right-3 h-8 w-8 text-muted-foreground/10" />

      <div className="relative">
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          "{testimonial.content}"
        </p>

        <div className="flex items-center gap-2.5">
          <Avatar className="h-9 w-9">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {getInitials(testimonial.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{testimonial.name}</p>
            <p className="text-[11px] text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const firstRow = testimonials.slice(0, 3);
  const secondRow = testimonials.slice(3);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-muted/20">
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="container relative mb-12">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Témoignages
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ce que disent nos apprenants
          </h2>
          <p className="mt-3 text-muted-foreground">
            Rejoignez des milliers de personnes qui ont transformé leur façon de
            travailler grâce à l'IA.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <Marquee speed="slow" pauseOnHover className="mb-3">
          {firstRow.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Marquee>

        <Marquee speed="slow" reverse pauseOnHover>
          {secondRow.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Marquee>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mt-12"
      >
        <div className="mx-auto max-w-3xl rounded-lg border border-border/40 bg-card p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "10,000+", label: "Apprenants actifs" },
              { value: "50+", label: "Cours disponibles" },
              { value: "98%", label: "Taux de satisfaction" },
              { value: "24/7", label: "Accès illimité" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
