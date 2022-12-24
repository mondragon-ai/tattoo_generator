import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from '@next/font/google'
import main from '../../styles/Main.module.css';
// import CustomInput from '../../components/ui/form/Input'
import { FunctionComponent, use, useState } from 'react'
// import Header from '../../components/ui/text/RotatingHeader';
// import CustomSelect from '../../components/ui/form/Select';
import MosaicGrid from '../../components/ui/mosaic';
// import Button from '../../components/ui/Button';
import { impoweredRequest } from '../../lib/requests';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

const DEV_SERVER = "http://localhost:5001/tattooideas-10372/us-central1/api";
// const LIVE_SERVER = "https://us-central1-tattooideas-10372.cloudfunctions.net/api"


type Prop = {
  users: {
    stripe: {
        client_secret: string,
        uuid: string,
        pm: string,
        transactions: string[],
    },
    history: {
      images: string[],
      style: string,
      topic: string
    }[],
    first_name: string,
    last_name: string,
    email: string,
    billing: {
        zip: number
    },
    search_credits: 0
  }[]
}

export const History: FunctionComponent<Prop> = ({users}) => {
  const [selectedOption, setSelectedOption] = useState('American Traditional');

  // display an error message if the users prop is not defined
  if (!users) {
    return <p>Error: Data not fetched</p>;
  }

  // Remove the user state and use the users prop directly
  const [user, setUser] = useState(users[0]);

  const [images, setImages] = useState(user.history ? user.history : []);

  let [isLoading, setLoading] = useState(false);

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

        <div className={``} style={{height: "auto"}}>
          <h3>Check out your searches </h3>
        </div>
        
        {
          images.length > 0 ? images.map((search, i) => {
            return (
              <div key={i} className={`${main.full} ${main.col}`}  style={{paddingTop: "1rem"}}>
                <MosaicGrid images={search?.images} columns={2} />
                <div className={`${main.full}`} style={{textAlign: "left"}}>
                  <p className={`${main.full}`}>
                    <span style={{color: "#e64343"}}>{search.style}</span> style with short description of <span style={{color: "#e64343"}}>{search.topic}</span> 
                  </p>
                </div>
              </div>
          )}) : null
        }
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const { handle } = params as ParsedUrlQuery;
  const url = DEV_SERVER + "/users";

  let result: any = null;

  result = await impoweredRequest(url, "POST", {
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

export default History