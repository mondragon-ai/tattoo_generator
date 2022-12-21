import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      // const session = await stripe.checkout.sessions.create({
      //   items: [
      //     {
      //       price_data: {
      //         currency: "usd",
      //         product: "prod_M5BDYb70j19Und",
      //         recurring: {
      //           interval: "month"
      //         },
      //         unit_amount: 4000
      //       }
      //     },
      //   ],
      //   mode: 'payment',
      //   success_url: `${req.headers.origin}/?success=true`,
      //   cancel_url: `${req.headers.origin}/?canceled=true`,
      // });
      // res.redirect(303, session.url);
    } catch (err) {

    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}