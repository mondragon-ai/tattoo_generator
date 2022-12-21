import Head from 'next/head';
import main from '../styles/Main.module.css';
import { useEffect, useState } from 'react';

//Stripe
import { loadStripe } from '@stripe/stripe-js';

//Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function payments() {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const [user, serUser] = useState({
    first_name: "Angel",
    last_name: "Mondragon",
    email: "angel@gobigly.com",
    address: {
      line1: "420 Bigly"
    }
  })

  const dalleHeaders = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + process.env.NEXT_PUBLIC_OPEN_API_KEY
  }

  return (
    <>
      <Head>
        <title>User H | Generator</title>
        <meta name="description" content="Generated Bad Ass Tattoo ideas for your next session" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${main.container} ${main.full} ${main.col}`} style={{minHeight: `100vh`}}>

        <div className={` ${main.full} ${main.col}`} style={{height: "auto"}}>
          <h3>Basic Information </h3>
          <div className={`${main.full} ${main.col}`} style={{paddingTop: "0.2rem"}}>
            <p>{user?.first_name} {user?.last_name}</p>
            <p>{user?.email}</p>
          </div>
          <h4 style={{paddingTop: "1.5rem"}}>Billing Information </h4>
          <div className={`${main.full} ${main.col}`} style={{paddingTop: "0.2rem"}}>

          </div>

        </div>
        <form action="/api/checkout_sessions" method="POST">
          <section>
            <button type="submit" role="link">
              Checkout
            </button>
          </section>
          <style jsx>
            {`
              section {
                background: #ffffff;
                display: flex;
                flex-direction: column;
                width: 400px;
                height: 112px;
                border-radius: 6px;
                justify-content: space-between;
              }
              button {
                height: 36px;
                background: #556cd6;
                border-radius: 4px;
                color: white;
                border: 0;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
              }
              button:hover {
                opacity: 0.8;
              }
            `}
          </style>
        </form>

      </main>
    </>
  )
}
