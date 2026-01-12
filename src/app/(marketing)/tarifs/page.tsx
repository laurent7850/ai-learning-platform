import { Metadata } from "next";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FAQSection } from "@/components/marketing/faq-section";
import { CTASection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Découvrez nos plans d'abonnement pour apprendre l'IA. Commencez gratuitement et évoluez selon vos besoins.",
};

export default function PricingPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Choisissez votre plan
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Investissez dans vos compétences IA avec un plan adapté à vos
          objectifs. Garantie satisfait ou remboursé 14 jours.
        </p>
      </div>
      <PricingSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
