import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

export const PLANS = {
  FREE: {
    name: "Gratuit",
    description: "Découvrez nos cours gratuitement",
    price: {
      monthly: 0,
      yearly: 0,
    },
    stripePriceId: {
      monthly: "",
      yearly: "",
    },
    features: [
      "Accès aux aperçus de tous les cours",
      "2 cours complets gratuits",
      "Communauté Discord",
      "Newsletter hebdomadaire",
    ],
    plan: "FREE" as const,
  },
  BEGINNER: {
    name: "Débutant",
    description: "Parfait pour commencer avec l'IA",
    price: {
      monthly: 9.99,
      yearly: 95.90,
    },
    stripePriceId: {
      monthly: process.env.STRIPE_PRICE_BEGINNER_MONTHLY || "",
      yearly: process.env.STRIPE_PRICE_BEGINNER_YEARLY || "",
    },
    features: [
      "Tous les cours niveau Débutant",
      "Quiz interactifs",
      "Certificats de complétion",
      "Support par email",
      "Accès mobile",
      "Mises à jour gratuites",
    ],
    plan: "BEGINNER" as const,
    highlighted: false,
  },
  PRO: {
    name: "Pro",
    description: "Accès complet pour les professionnels",
    price: {
      monthly: 19.99,
      yearly: 191.90,
    },
    stripePriceId: {
      monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || "",
      yearly: process.env.STRIPE_PRICE_PRO_YEARLY || "",
    },
    features: [
      "Tous les cours (Débutant + Intermédiaire)",
      "Ressources bonus exclusives",
      "Templates et prompts premium",
      "Coaching mensuel en groupe",
      "Accès prioritaire aux nouveaux cours",
      "Support prioritaire",
      "Certificats avancés",
    ],
    plan: "PRO" as const,
    highlighted: true,
  },
};

export const getPlanFromPriceId = (priceId: string) => {
  for (const [key, plan] of Object.entries(PLANS)) {
    if (
      plan.stripePriceId.monthly === priceId ||
      plan.stripePriceId.yearly === priceId
    ) {
      return key as keyof typeof PLANS;
    }
  }
  return "FREE";
};

export const hasAccessToCourse = (
  userPlan: string | undefined,
  requiredPlan: string
): boolean => {
  const planHierarchy = ["FREE", "BEGINNER", "PRO"];
  const userPlanIndex = planHierarchy.indexOf(userPlan || "FREE");
  const requiredPlanIndex = planHierarchy.indexOf(requiredPlan);
  return userPlanIndex >= requiredPlanIndex;
};

export const createCheckoutSession = async ({
  userId,
  email,
  priceId,
  successUrl,
  cancelUrl,
}: {
  userId: string;
  email: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    client_reference_id: userId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      metadata: {
        userId,
      },
    },
    metadata: {
      userId,
    },
  });

  return session;
};

export const createCustomerPortalSession = async (customerId: string) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/profil`,
  });

  return session;
};

export const getSubscription = async (subscriptionId: string) => {
  return await stripe.subscriptions.retrieve(subscriptionId);
};

export const cancelSubscription = async (subscriptionId: string) => {
  return await stripe.subscriptions.cancel(subscriptionId);
};
