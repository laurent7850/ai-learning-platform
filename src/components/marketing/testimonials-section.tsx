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
    <div className="group relative w-[350px] shrink-0 rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
      {/* Subtle glow on hover */}
      <div className="absolute -inset-px rounded-2xl bg-primary/5 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />

      {/* Quote icon */}
      <Quote className="absolute top-4 right-4 h-10 w-10 text-primary/10 group-hover:text-primary/20 transition-colors" />

      {/* Content */}
      <div className="relative z-10">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.2 }}
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </motion.div>
          ))}
        </div>

        {/* Testimonial text */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          "{testimonial.content}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 ring-2 ring-background shadow-md">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-semibold">
              {getInitials(testimonial.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
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
    <section className="relative py-24 md:py-32 overflow-hidden bg-muted/30">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative mb-16">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            Témoignages
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Ce que disent{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              nos apprenants
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Rejoignez des milliers de personnes qui ont transformé leur façon de
            travailler grâce à l'IA.
          </p>
        </motion.div>
      </div>

      {/* Testimonials marquee */}
      <div className="relative">
        <Marquee speed="slow" pauseOnHover className="mb-4">
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

      {/* Stats banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mt-16"
      >
        <div className="mx-auto max-w-4xl rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10,000+", label: "Apprenants actifs" },
              { value: "50+", label: "Cours disponibles" },
              { value: "98%", label: "Taux de satisfaction" },
              { value: "24/7", label: "Accès illimité" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
