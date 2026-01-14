"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PLANS } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";

const planIcons = {
  FREE: Zap,
  BEGINNER: Sparkles,
  PRO: Crown,
};

const planColors = {
  FREE: "bg-slate-500",
  BEGINNER: "bg-blue-500",
  PRO: "bg-indigo-500",
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
    <section id="pricing" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="container relative">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Tarification simple
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Des tarifs adaptés à vos besoins
          </h2>
          <p className="mt-3 text-muted-foreground">
            Commencez gratuitement et évoluez selon vos objectifs.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-border/40 bg-card p-1.5">
            <Label
              htmlFor="billing"
              className={`cursor-pointer px-3 py-1.5 rounded-full text-sm transition-colors ${
                !isYearly
                  ? "bg-primary text-primary-foreground"
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
              className={`cursor-pointer px-3 py-1.5 rounded-full text-sm transition-colors flex items-center gap-1.5 ${
                isYearly
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setIsYearly(true)}
            >
              Annuel
              <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-full">
                -20%
              </span>
            </Label>
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = planIcons[plan.plan as keyof typeof planIcons];
            const color = planColors[plan.plan as keyof typeof planColors];

            return (
              <motion.div
                key={plan.plan}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative rounded-lg border bg-card p-6 transition-colors ${
                  plan.popular
                    ? "border-primary/40"
                    : "border-border/40 hover:border-border/60"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-medium px-2 py-0.5 rounded-full">
                    Populaire
                  </span>
                )}

                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${color} mb-4`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <h3 className="text-lg font-medium">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.description}
                </p>

                <div className="mt-4 mb-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isYearly ? "yearly" : "monthly"}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                    >
                      <span className="text-3xl font-bold">
                        {formatPrice(
                          isYearly
                            ? plan.price.yearly / 12
                            : plan.price.monthly
                        )}
                      </span>
                      {plan.price.monthly > 0 && (
                        <span className="text-sm text-muted-foreground">/mois</span>
                      )}
                      {isYearly && plan.price.yearly > 0 && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Facturé {formatPrice(plan.price.yearly)}/an
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <Button
                  variant={plan.popular ? "default" : "outline"}
                  size="sm"
                  className="w-full mb-5"
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

                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check className={`h-4 w-4 ${plan.popular ? "text-primary" : "text-muted-foreground"} shrink-0 mt-0.5`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Garantie satisfait ou remboursé 14 jours.{" "}
            <Link
              href="/tarifs#faq"
              className="text-primary hover:underline underline-offset-2"
            >
              Questions fréquentes
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
