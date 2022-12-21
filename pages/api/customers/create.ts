import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../../lib/stripe";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { createDocumentWithID } from "../../../lib/databse/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    functions.logger.debug(" ====> Ready to upload data to train a model for imPowered. 👽 ");
    let status = 200,
        text = "SUCCESS: Uploaded data to train a model for imPowered 👽",
        ok = true;

    const user_uuid = req.body.merchant_id;

    console.log(user_uuid);

    let payment_intent: any = null;
    let stripe_customer_uuid = "";

    try {
        // create Stripe customer
        const stripe_customer = await stripe.customers.create({
            description: "TT Generator",
        });

        stripe_customer_uuid = stripe_customer.id;
    
        // Create a SetUp Intent to get client side secrete key
        payment_intent = await stripe.setupIntents.create({
            customer: stripe_customer_uuid,
            payment_method_types: ['card']
        });
    
    } catch (error) {
        status = 400;
        text = "ERROR: Likely due to stripe creation & secrete generation 💸";
        ok = false;
    }

    try {

        await createDocumentWithID(user_uuid, user_uuid, {
            updated_at: admin.firestore.Timestamp.now(),
            creatd_at: admin.firestore.Timestamp.now(),
            stripe: {
                uuid: stripe_customer_uuid,
                transactions: [
                    payment_intent.id
                ]
            },
        });
        
    
    } catch (error) {
        status = 400;
        text = "ERROR: Likely due to creating customer document in primary database 🤷🏻‍♂️";
        ok = false;
    }

        
    res.status(status).json({
        ok: ok,
        text: text,
        result: payment_intent
    })
}