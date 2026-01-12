import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { createCheckoutSession, PLANS } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const body = await req.json();
    const { plan, billingPeriod } = body;

    if (!plan || !["BEGINNER", "PRO"].includes(plan)) {
      return new NextResponse("Plan invalide", { status: 400 });
    }

    if (!billingPeriod || !["monthly", "yearly"].includes(billingPeriod)) {
      return new NextResponse("Période de facturation invalide", { status: 400 });
    }

    const selectedPlan = PLANS[plan as keyof typeof PLANS];
    const priceId = selectedPlan.stripePriceId[billingPeriod as "monthly" | "yearly"];

    if (!priceId) {
      return new NextResponse("Prix non configuré", { status: 400 });
    }

    // Vérifier si l'utilisateur a déjà un abonnement actif
    const existingSubscription = await db.subscription.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (existingSubscription?.status === "ACTIVE") {
      return new NextResponse("Vous avez déjà un abonnement actif", { status: 400 });
    }

    const checkoutSession = await createCheckoutSession({
      userId: session.user.id,
      email: session.user.email!,
      priceId,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/tarifs?canceled=true`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
