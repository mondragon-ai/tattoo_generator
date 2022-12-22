import Head from 'next/head';
import main from '../../styles/Main.module.css';
import { FunctionComponent, useEffect, useLayoutEffect, useState } from 'react';

import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { impoweredRequest } from '../../lib/requests';


// stripe
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

//Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

type Prop = {
  users: {
    stripe: {
        client_secret: string,
        uuid:string,
        transactions: string[]
    },
    history: string[],
    first_name: string,
    last_name: string,
    email: string,
    billing: {
        zip: number
    }[]
  }[]
}

export const Payments: FunctionComponent<Prop> = () =>  {

  // Add a state variable to store the error message
  const [errorMessage, setErrorMessage] = useState("");

  // Add a useLayoutEffect hook to check for success or canceled status in the query string
  // useLayoutEffect(() => {
  //   // Check to see if this is a redirect back from Checkout
  //   const query = new URLSearchParams(window.location.search);
  //   if (query.get("success")) {
  //     console.log("Order placed! You will receive an email confirmation.");
  //   }

  //   if (query.get("canceled")) {
  //     console.log("Order canceled -- continue to shop around and checkout when you’re ready.");
  //   }
  // }, []);

  // console.log(" => [USERS]");
  // console.log(users);

  // // display an error message if the users prop is not defined
  // if (!users) {
  //   return <p>Error: Data not fetched</p>;
  // }

  // Remove the user state and use the users prop directly
  const user = {
    stripe: {
        client_secret: "",
        uuid: "",
        transactions: []
    },
    history: [],
    first_name: "",
    last_name: "",
    email: "",
    billing: {
        zip: 0
    }
  };

  const options = {
    clientSecret: user?.stripe?.client_secret ? user?.stripe?.client_secret : "",
  };


  console.log(" => [OPTONS]");
  console.log(options);


  console.log(" => [USER]");
  console.log(user);


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
        {/* <Elements stripe={stripePromise} options={options}>
          <SetupForm />
        </Elements> */}
      </main>
    </>
  );
};

export const SetupForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  // const LIVE_FRONTEND_URL = ""
  const DEV_FRONTEND_URL = "http://localhost:3000/"

  const [errorMessage, setErrorMessage] = useState("null");

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const {error} = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: DEV_FRONTEND_URL
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage("er");
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
};





// export const getServerSideProps: GetServerSideProps = async ({params}) => {
//   const { handle } = params as ParsedUrlQuery;
//   // const LIVE_SERVER = "http://localhost:5001/tattooideas-10372/us-central1/api/users";
//   const DEV_SERVER = "http://localhost:5001/tattooideas-10372/us-central1/api/users";

//   let fetched = false;

//   let result: any = null;

//   if (!fetched) {
//     result = await impoweredRequest(DEV_SERVER, "POST", {
//       "Content-Type": "application/json",
//     }, {user_uuid: handle});
//     fetched = true;
//   }

//   console.log(" ==> SERVER SIDE");
//   console.log(result);

//   if (!result) {
//       throw new Error("Could not fetch user object(s)");
//   }

//   console.log(" ==> SERVER SIDE");
//   console.log(result);

//   let users: any[] = [];

//   if (result?.result) {
//     users = result.result;
//   }

//   console.log(users);

//   return {
//       props: {
//           // users: users
//       }
//   }
// }

export default Payments
