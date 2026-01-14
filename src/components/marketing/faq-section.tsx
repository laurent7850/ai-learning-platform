"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/config";

export function FAQSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="relative py-16 md:py-24 overflow-hidden">
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
            <HelpCircle className="h-3.5 w-3.5" />
            FAQ
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Questions fréquentes
          </h2>
          <p className="mt-3 text-muted-foreground">
            Vous avez des questions ? Nous avons les réponses.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl"
        >
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-border/40 bg-card px-4 data-[state=open]:border-border/60 transition-colors"
              >
                <AccordionTrigger className="text-left py-4 hover:no-underline text-sm">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Vous ne trouvez pas la réponse que vous cherchez ?{" "}
            <a
              href="/contact"
              className="text-primary hover:underline underline-offset-2"
            >
              Contactez-nous
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
