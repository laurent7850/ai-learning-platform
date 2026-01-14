"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, BookOpen, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { GradientText } from "@/components/ui/text-reveal";
import { AIBrainVisual } from "@/components/ui/ai-brain-visual";

const stats = [
  { icon: BookOpen, label: "cours", value: "50+" },
  { icon: Award, label: "satisfaction", value: "98%" },
];

const avatars = [
  { initials: "SM", color: "bg-slate-500" },
  { initials: "TD", color: "bg-blue-500" },
  { initials: "ML", color: "bg-indigo-500" },
  { initials: "PB", color: "bg-cyan-500" },
  { initials: "CF", color: "bg-teal-500" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden py-16 md:py-24">
      <AnimatedGridBackground />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left column - Text content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Nouvelle formation : RAG & Chatbots IA
            </span>

            {/* Headline */}
            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-5xl">
              Maîtrisez{" "}
              <GradientText className="font-bold">
                l'Intelligence Artificielle
              </GradientText>{" "}
              et transformez votre quotidien
            </h1>

            {/* Subheadline */}
            <p className="mt-4 text-base text-muted-foreground md:text-lg max-w-xl mx-auto lg:mx-0">
              Des cours pratiques et accessibles pour apprendre à utiliser
              ChatGPT, Claude et les outils IA au quotidien. Du débutant au
              professionnel.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Button size="lg" asChild>
                <Link href="/inscription">
                  Créer mon compte gratuit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href="/cours">
                  <Play className="mr-2 h-4 w-4" />
                  Découvrir les cours
                </Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-5">
              {/* Stacked avatars */}
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  {avatars.map((avatar, index) => (
                    <div
                      key={avatar.initials}
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${avatar.color} text-white text-[10px] font-medium ring-2 ring-background`}
                      style={{ zIndex: avatars.length - index }}
                    >
                      {avatar.initials}
                    </div>
                  ))}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-[10px] font-medium ring-2 ring-background">
                    +9k
                  </div>
                </div>
                <div>
                  <span className="block text-sm font-semibold">10,000+</span>
                  <span className="text-[11px] text-muted-foreground">apprenants</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9/5</span>
                <span className="text-[11px] text-muted-foreground">(2,847 avis)</span>
              </div>

              {/* Stats */}
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold">{stat.value}</span>
                    <span className="text-[11px] text-muted-foreground">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column - Visual */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AIBrainVisual className="w-full max-w-md mx-auto" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5">
          <span className="text-[11px] text-muted-foreground">Découvrir plus</span>
          <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1 h-1 rounded-full bg-primary"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
