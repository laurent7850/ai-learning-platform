"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Users, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stats } from "@/lib/config";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Nouvelle formation : RAG & Chatbots IA
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Maîtrisez{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              l'Intelligence Artificielle
            </span>{" "}
            et transformez votre quotidien
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto"
          >
            Des cours pratiques et accessibles pour apprendre à utiliser
            ChatGPT, Claude et les outils IA au quotidien. Du débutant au
            professionnel.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="xl" variant="gradient" asChild>
              <Link href="/inscription">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/cours">
                <Play className="mr-2 h-5 w-5" />
                Découvrir les cours
              </Link>
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>
                <strong className="text-foreground">10,000+</strong> apprenants
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>
                <strong className="text-foreground">50+</strong> cours
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span>
                <strong className="text-foreground">98%</strong> satisfaction
              </span>
            </div>
          </motion.div>
        </div>

        {/* Hero Image/Video Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 mx-auto max-w-5xl"
        >
          <div className="relative rounded-xl border bg-background shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
            <div className="aspect-video bg-muted flex items-center justify-center">
              <div className="relative z-20 flex flex-col items-center gap-4">
                <button className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform">
                  <Play className="h-6 w-6 ml-1" />
                </button>
                <span className="text-sm font-medium">Voir la présentation</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
