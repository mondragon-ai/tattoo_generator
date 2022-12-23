import Head from 'next/head';
import main from '../../styles/Main.module.css';
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useLayoutEffect, useState } from 'react';

import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { impoweredRequest } from '../../lib/requests';

// const DEV_SERVER = "http://localhost:5001/tattooideas-10372/us-central1/api";
const LIVE_SERVER = "http://localhost:5001/tattooideas-10372/us-central1/api"

// stripe
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';

//Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

type Prop = {
  users: {
    stripe: {
        client_secret: string,
        uuid: string,
        pm: string,
        transactions: string[],
    },
    history: string[],
    first_name: string,
    last_name: string,
    email: string,
    billing: {
        zip: number
    },
    search_credits: 0
  }[]
}

export const Payments: FunctionComponent<Prop> = ({users}) =>  {

  // Add a useLayoutEffect hook to check for success or canceled status in the query string
  useLayoutEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log("Order canceled -- continue to shop around and checkout when you’re ready.");
    }
  }, [users]);

  // display an error message if the users prop is not defined
  if (!users) {
    return <p>Error: Data not fetched</p>;
  }

  // Remove the user state and use the users prop directly
  const [user, setUser] = useState(users[0]);
  const [isLoading, setLoading] = useState(false);

  const options = {
    clientSecret: user?.stripe?.client_secret ? user?.stripe?.client_secret : "",
  };

  const router = useRouter();
  const {handle} = router.query;
 
  const chargeCard = async () => {
    setLoading(true)
    console.log(" => [CHARGE CARD]")
    console.log(handle)
    console.log(user?.stripe?.uuid ?  user?.stripe?.uuid : "")
    console.log(user)
    console.log(" => [CHARGE CARD]")
    const response = await impoweredRequest(LIVE_SERVER + "/payments/charge",
    "POST", {
        "Content-Type": "application/json",
    }, {
        user_uuid: handle,
        stripe_uuid: user?.stripe?.uuid ?  user?.stripe?.uuid : "",
        user: user,
    })

    if (response.ok) {
      console.log(" => [GET SECRET]")
      console.log(response)
      setTimeout(() =>  setLoading(false), 3000);
      setUser({
        ...user,
        stripe: {
          ...user?.stripe,
          client_secret: response?.result && response?.result?.stripe_client_secret ? response?.result?.stripe_client_secret : ""
        }
      })
      
    }
  }

  const getSecret = async () => {

    console.log(" => [GET SECRET] - Before")
    const response = await impoweredRequest(LIVE_SERVER + "/payments/client",
    "POST", {
        "Content-Type": "application/json",
    }, {
        user_uuid: handle
    })

    if (response.ok) {
      console.log(" => [GET SECRET]")
      console.log(response)
      setUser({
        ...user,
        stripe: {
          ...user?.stripe,
          client_secret: response?.result && response?.result?.stripe_client_secret ? response?.result?.stripe_client_secret : ""
        }
      })

    }
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
          <div className={`${main.full} ${main.row}`} style={{paddingTop: "2rem", justifyContent: "space-between"}}>
            <h3>Remaining Credits </h3>
            <h3>{user?.search_credits ? user?.search_credits : 0}</h3>
          </div>
        </div>
        <div className={` ${main.full} ${main.col}`} style={{height: "auto", padding: "2rem 0"}}>
          {
            user?.stripe?.pm ? <>
            <div className={` ${main.full} ${main.col}`} style={{height: "auto", padding: "2rem 0"}}>
              <button className={` ${main.full} ${main.button}`} onClick={chargeCard} disabled={isLoading}>
              {!isLoading ? "BUY CREDITS" : "Loading . . "}
              </button>
            </div>
            </> :  user?.stripe?.client_secret === "" ? <>
              <div className={` ${main.full} ${main.col}`} style={{height: "auto", padding: "2rem 0"}}>
                <button className={` ${main.full} ${main.button}`} onClick={getSecret} disabled={isLoading}>
                  {!isLoading ? "ADD CARD" : "Loading . . "}
                </button>
              </div>
            </> : <Elements stripe={stripePromise} options={options}>
            <SetupForm setUser={setUser} user={user} />
          </Elements>
          }
        </div>
      </main>
    </>
  );
};

export type SetUpProp = {
  setUser:  Dispatch<SetStateAction<{
    stripe: {
        client_secret: string,
        uuid:string,
        transactions: string[],
        pm: string,
    },
    history: string[],
    first_name: string,
    last_name: string,
    email: string,
    billing: {
        zip: number
    },
    search_credits: 0
  }>>
  user:  {
    stripe: {
        client_secret: string,
        uuid:string,
        transactions: string[],
        pm: string,
    },
    history: string[],
    first_name: string,
    last_name: string,
    email: string,
    billing: {
        zip: number
    },
    search_credits: 0
  }
}

export const SetupForm = ({setUser, user}: SetUpProp) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setLoading] = useState(false);

  const DEV_FRONTEND_URL = "http://localhost:3000/"

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    console.log(" => [CHARGE CARD - Handle submit]")
    const response = await impoweredRequest(LIVE_SERVER + "/payments/charge",
    "POST", {
        "Content-Type": "application/json",
    }, {
      user_uuid: handle,
      stripe_uuid: user?.stripe?.uuid ?  user?.stripe?.uuid : "",
      email: user?.email ?  user?.email : "",
    })

    console.log(" => [CHARGE CARD - Handle submit]")
    console.log(response)
    setUser({
      ...user,
      stripe: {
        ...user?.stripe,
        client_secret: response !== "" ? response : ""
      }
    })

    if (!stripe || !elements) {
      return;
    }

    const {error} = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: DEV_FRONTEND_URL
      },
    });

    if (error) {
      setErrorMessage("" + error.message);
    } else {
    }
  };
  const router = useRouter();
  const {handle} = router.query;
 

  return (
    <form className={` ${main.full} ${main.col}`}>
        <PaymentElement />
        <div className={` ${main.full} ${main.col}`} style={{height: "auto", padding: "2rem 0"}}>
          <button className={` ${main.full} ${main.button}`} disabled={!stripe || isLoading} onClick={handleSubmit}>
            {!isLoading ? "ADD PAYMENT" : "Loading . . ."}
          </button>
        </div>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const { handle } = params as ParsedUrlQuery;
  const DEV_SERVER = LIVE_SERVER + "/api/users";

  let result: any = null;

  result = await impoweredRequest(DEV_SERVER, "POST", {
    "Content-Type": "application/json",
  }, {user_uuid: handle});


  if (!result) {
      throw new Error("Could not fetch user users(s)");
  }
  let users: any[] = [];

  if (result?.result) {
    users = result.result;
  }

  console.log(" => SERVER ->")
  console.log(result)

  return {
      props: {
          users: users
      }
  }
}

export default Payments
