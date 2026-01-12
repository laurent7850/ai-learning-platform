"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Users, BookOpen, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGridBackground } from "@/components/ui/animated-grid-background";
import { GradientText } from "@/components/ui/text-reveal";
import { AIBrainVisual } from "@/components/ui/ai-brain-visual";

const stats = [
  { icon: BookOpen, label: "cours", value: "50+" },
  { icon: Award, label: "satisfaction", value: "98%" },
];

// Avatars fictifs pour le social proof - couleurs sobres et professionnelles
const avatars = [
  { initials: "SM", color: "from-slate-600 to-slate-700" },
  { initials: "TD", color: "from-blue-600 to-blue-700" },
  { initials: "ML", color: "from-indigo-600 to-indigo-700" },
  { initials: "PB", color: "from-cyan-600 to-cyan-700" },
  { initials: "CF", color: "from-teal-600 to-teal-700" },
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden py-20 md:py-32">
      {/* Animated background */}
      <AnimatedGridBackground />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.span>
                Nouvelle formation : RAG & Chatbots IA
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl"
            >
              Maîtrisez{" "}
              <GradientText className="font-extrabold">
                l'Intelligence Artificielle
              </GradientText>{" "}
              et transformez votre quotidien
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-muted-foreground md:text-xl max-w-xl mx-auto lg:mx-0"
            >
              Des cours pratiques et accessibles pour apprendre à utiliser
              ChatGPT, Claude et les outils IA au quotidien. Du débutant au
              professionnel.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              {/* Primary CTA with glow effect */}
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Subtle glow effect */}
                <div className="absolute -inset-0.5 rounded-xl bg-primary/20 blur-md group-hover:bg-primary/30 transition-all duration-300" />
                <Button
                  size="xl"
                  className="relative bg-primary hover:bg-primary/90 text-white shadow-lg"
                  asChild
                >
                  <Link href="/inscription">
                    Créer mon compte gratuit
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>

              <Button
                size="xl"
                variant="outline"
                className="backdrop-blur-sm border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                asChild
              >
                <Link href="/cours">
                  <Play className="mr-2 h-5 w-5" />
                  Découvrir les cours
                </Link>
              </Button>
            </motion.div>

            {/* Social proof with stacked avatars */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6"
            >
              {/* Stacked avatars with learners count */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                {/* Stacked avatars */}
                <div className="flex -space-x-3">
                  {avatars.map((avatar, index) => (
                    <motion.div
                      key={avatar.initials}
                      className={`relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${avatar.color} text-white text-xs font-semibold ring-2 ring-background`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                      style={{ zIndex: avatars.length - index }}
                    >
                      {avatar.initials}
                    </motion.div>
                  ))}
                  {/* +more indicator */}
                  <motion.div
                    className="relative flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-semibold ring-2 ring-background"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, duration: 0.3 }}
                  >
                    +9k
                  </motion.div>
                </div>
                <div>
                  <span className="block font-bold text-foreground">10,000+</span>
                  <span className="text-xs text-muted-foreground">apprenants actifs</span>
                </div>
              </motion.div>

              {/* Rating */}
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="flex -space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9/5</span>
                <span className="text-xs text-muted-foreground">(2,847 avis)</span>
              </motion.div>

              {/* Other stats */}
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-2 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="block font-bold text-foreground">{stat.value}</span>
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Visual */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <AIBrainVisual className="w-full max-w-lg mx-auto" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <span className="text-xs text-muted-foreground">Découvrir plus</span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
