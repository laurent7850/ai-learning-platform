import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe, getPlanFromPriceId } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case "checkout.session.completed": {
      const subscriptionData = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      const userId = session.metadata?.userId || session.client_reference_id;

      if (!userId) {
        console.error("No userId found in session");
        return new NextResponse("No userId", { status: 400 });
      }

      const priceId = subscriptionData.items.data[0].price.id;
      const plan = getPlanFromPriceId(priceId);
      // @ts-expect-error Stripe types mismatch
      const periodEnd = subscriptionData.current_period_end || subscriptionData.currentPeriodEnd || Date.now() / 1000;

      await db.subscription.upsert({
        where: {
          userId: userId,
        },
        create: {
          userId: userId,
          stripeCustomerId: subscriptionData.customer as string,
          stripeSubscriptionId: subscriptionData.id,
          stripePriceId: priceId,
          plan: plan,
          status: "ACTIVE",
          currentPeriodEnd: new Date(periodEnd * 1000),
        },
        update: {
          stripeSubscriptionId: subscriptionData.id,
          stripePriceId: priceId,
          plan: plan,
          status: "ACTIVE",
          currentPeriodEnd: new Date(periodEnd * 1000),
        },
      });

      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      const priceId = subscription.items.data[0].price.id;
      const plan = getPlanFromPriceId(priceId);
      // @ts-expect-error Stripe types mismatch
      const subPeriodEnd = subscription.current_period_end || subscription.currentPeriodEnd || Date.now() / 1000;

      const existingSubscription = await db.subscription.findFirst({
        where: {
          stripeSubscriptionId: subscription.id,
        },
      });

      if (existingSubscription) {
        await db.subscription.update({
          where: {
            id: existingSubscription.id,
          },
          data: {
            stripePriceId: priceId,
            plan: plan,
            status: subscription.status === "active" ? "ACTIVE" :
                   subscription.status === "canceled" ? "CANCELED" :
                   subscription.status === "past_due" ? "PAST_DUE" :
                   subscription.status === "trialing" ? "TRIALING" : "ACTIVE",
            currentPeriodEnd: new Date(subPeriodEnd * 1000),
          },
        });
      }

      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      await db.subscription.updateMany({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          status: "CANCELED",
          plan: "FREE",
        },
      });

      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object;
      // @ts-expect-error Stripe types mismatch
      const subscriptionId = invoice.subscription as string;

      if (subscriptionId) {
        await db.subscription.updateMany({
          where: {
            stripeSubscriptionId: subscriptionId,
          },
          data: {
            status: "PAST_DUE",
          },
        });
      }

      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new NextResponse(null, { status: 200 });
}
