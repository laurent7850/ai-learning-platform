"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap, Crown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PLANS } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";

const planIcons = {
  FREE: Zap,
  BEGINNER: Sparkles,
  PRO: Crown,
};

const planGradients = {
  FREE: "from-slate-500 to-slate-600",
  BEGINNER: "from-blue-500 to-cyan-500",
  PRO: "from-primary via-accent to-primary",
};

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const plans = [
    {
      ...PLANS.FREE,
      popular: false,
    },
    {
      ...PLANS.BEGINNER,
      popular: false,
    },
    {
      ...PLANS.PRO,
      popular: true,
    },
  ];

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mx-auto max-w-2xl text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            Tarification simple
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Des tarifs adaptés à{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              vos besoins
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Commencez gratuitement et évoluez selon vos objectifs.
          </p>

          {/* Billing toggle */}
          <motion.div
            className="mt-8 inline-flex items-center gap-4 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm p-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Label
              htmlFor="billing"
              className={`cursor-pointer px-4 py-2 rounded-full transition-all ${
                !isYearly
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setIsYearly(false)}
            >
              Mensuel
            </Label>
            <Switch
              id="billing"
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <Label
              htmlFor="billing"
              className={`cursor-pointer px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                isYearly
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setIsYearly(true)}
            >
              Annuel
              <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
                -20%
              </Badge>
            </Label>
          </motion.div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = planIcons[plan.plan as keyof typeof planIcons];
            const gradient = planGradients[plan.plan as keyof typeof planGradients];

            return (
              <motion.div
                key={plan.plan}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
              >
                {/* Popular plan glow effect */}
                {plan.popular && (
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-75 blur-sm animate-pulse-glow" />
                )}

                {/* Card */}
                <div
                  className={`relative h-full rounded-2xl border bg-card p-8 transition-all duration-300 hover:shadow-xl ${
                    plan.popular
                      ? "border-primary/50 shadow-lg shadow-primary/20"
                      : "border-border/50 hover:border-primary/30"
                  }`}
                >
                  {/* Popular badge with two tags */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-2"
                      >
                        <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 shadow-lg px-3 py-1 text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Populaire
                        </Badge>
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg px-3 py-1 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Meilleur rapport qualité-prix
                        </Badge>
                      </motion.div>
                    </div>
                  )}

                  {/* Plan icon */}
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg mb-4`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Plan name */}
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mt-6 mb-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isYearly ? "yearly" : "monthly"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-4xl font-bold">
                          {formatPrice(
                            isYearly
                              ? plan.price.yearly / 12
                              : plan.price.monthly
                          )}
                        </span>
                        {plan.price.monthly > 0 && (
                          <span className="text-muted-foreground">/mois</span>
                        )}
                        {isYearly && plan.price.yearly > 0 && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            Facturé {formatPrice(plan.price.yearly)}/an
                          </p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    className={`relative mb-8 ${plan.popular ? "group/btn" : ""}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.popular && (
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary via-accent to-primary opacity-50 blur-lg group-hover/btn:opacity-75 transition-opacity duration-300" />
                    )}
                    <Button
                      variant={plan.popular ? "default" : "outline"}
                      className={`w-full relative ${
                        plan.popular
                          ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg"
                          : "hover:border-primary/40 hover:bg-primary/5"
                      }`}
                      asChild
                    >
                      <Link
                        href={
                          plan.plan === "FREE"
                            ? "/inscription"
                            : `/inscription?plan=${plan.plan}&billing=${
                                isYearly ? "yearly" : "monthly"
                              }`
                        }
                      >
                        {plan.plan === "FREE"
                          ? "Créer mon compte gratuit"
                          : "S'abonner"}
                      </Link>
                    </Button>
                  </motion.div>

                  {/* Features list */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: 0.3 + featureIndex * 0.05,
                        }}
                        className="flex items-start gap-3 text-sm"
                      >
                        <div className={`rounded-full p-0.5 bg-gradient-to-br ${gradient}`}>
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Garantie satisfait ou remboursé 14 jours.{" "}
            <Link
              href="/tarifs#faq"
              className="text-primary hover:underline underline-offset-2"
            >
              Questions fréquentes
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
