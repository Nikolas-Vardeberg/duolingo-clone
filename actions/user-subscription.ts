"use server"

import { stripe } from "@/lib/stripe"
import { auth, currentUser } from "@clerk/nextjs"

import { absoluteUrl } from "@/lib/utils"
import { getUserSubscription } from "@/db/queries"


const returnUrl = absoluteUrl("/shop");

export const createStripeUrl = async () => {
    const { userId} = await auth();
    const user = await currentUser();

    if(!userId || !user){
        throw new Error("Unauthorized")
    }

    const userSubscription = await getUserSubscription();

    if (userSubscription && userSubscription.stripeCustomerId) {
        const stripeSesson = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url: returnUrl
        });

        return { data: stripeSesson.url}
    }

    const stripeSesson = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: "Nettvett PRO",
                        description: "Uendelig med liv",
                    },
                    unit_amount: 2000, //20$
                    recurring: {
                        interval: "month"
                    }
                }
            }
        ],
        metadata: {
            userId,
        },
        success_url: returnUrl,
        cancel_url: returnUrl,
    });

    return { data: stripeSesson.url }
}