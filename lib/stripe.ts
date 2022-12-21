import * as Stripe from "stripe";

export const stripe = new Stripe.Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)