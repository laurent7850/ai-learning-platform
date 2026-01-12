"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PLANS } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

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
    <section id="pricing" className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Des tarifs adaptés à vos besoins
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Commencez gratuitement et évoluez selon vos objectifs.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Label
              htmlFor="billing"
              className={!isYearly ? "font-medium" : "text-muted-foreground"}
            >
              Mensuel
            </Label>
            <Switch
              id="billing"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label
              htmlFor="billing"
              className={isYearly ? "font-medium" : "text-muted-foreground"}
            >
              Annuel
              <Badge variant="success" className="ml-2">
                -20%
              </Badge>
            </Label>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.plan}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl border bg-card p-8 ${
                plan.popular
                  ? "border-primary shadow-lg ring-1 ring-primary"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    Le plus populaire
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="text-center mb-6">
                <span className="text-4xl font-bold">
                  {formatPrice(
                    isYearly ? plan.price.yearly / 12 : plan.price.monthly
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
              </div>

              <Button
                variant={plan.popular ? "gradient" : "outline"}
                className="w-full mb-6"
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
                  {plan.plan === "FREE" ? "Commencer gratuitement" : "S'abonner"}
                </Link>
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Garantie satisfait ou remboursé 14 jours.{" "}
            <Link href="/tarifs#faq" className="text-primary hover:underline">
              Questions fréquentes
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
