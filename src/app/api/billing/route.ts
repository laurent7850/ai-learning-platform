import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { createCustomerPortalSession } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST() {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const subscription = await db.subscription.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!subscription?.stripeCustomerId) {
      return new NextResponse("Aucun abonnement trouvé", { status: 404 });
    }

    const portalSession = await createCustomerPortalSession(
      subscription.stripeCustomerId
    );

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Billing portal error:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
