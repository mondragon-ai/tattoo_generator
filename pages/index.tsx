import Head from 'next/head'
import main from '../styles/Main.module.css';
import CustomInput from '../components/ui/form/Input'
import { useState } from 'react'
import Header from '../components/ui/text/RotatingHeader';
import CustomSelect from '../components/ui/form/Select';
import MosaicGrid from '../components/ui/mosaic';
import Button from '../components/ui/Button';
import { impoweredRequest } from '../lib/requests';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

// const DEV_SERVER = "http://localhost:5001/tattooideas-10372/us-central1/api";
const LIVE_SERVER = "https://us-central1-tattooideas-10372.cloudfunctions.net/api"

export default function Home() {

  const tattoos = ['American Traditional', 'Blackwork', 'Celtic', 'Chicano', 'Dotwork', 'Japanese', 'Neo-Traditional', 'Realistic', 'Script', 'Watercolor'];
  const [tattoo, setTattoo] = useState<{
    topic: string,
    adj: string,
    adjectives_list: string[]
  }>({
    topic: "Tiger in a forest",
    adj: "",
    adjectives_list: []
  });

  const [selectedOption, setSelectedOption] = useState('American Traditional');

  const [images, setImages] = useState([
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6siElBc2XZvPYoP4EQHo594G/user-GJh8gOH47p8tBQJTKztQvAWm/img-Q8nHB6D7F0eaq3zBeBd7pqSh.png?st=2022-12-19T17%3A33%3A43Z&se=2022-12-19T19%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-19T12%3A38%3A03Z&ske=2022-12-20T12%3A38%3A03Z&sks=b&skv=2021-08-06&sig=ynTR%2B53tkgDRx%2BvmFf%2BEunKd8l1G2LsqQ7gdKW%2Blwek%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6siElBc2XZvPYoP4EQHo594G/user-GJh8gOH47p8tBQJTKztQvAWm/img-U8gPiit4vsWxCtRpp7h1kVoX.png?st=2022-12-19T17%3A33%3A43Z&se=2022-12-19T19%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-19T12%3A38%3A03Z&ske=2022-12-20T12%3A38%3A03Z&sks=b&skv=2021-08-06&sig=JZ6Cov/DlPXKR0u0B4mZFiRCs6NEZrHXD8CeBml2iJ8%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6siElBc2XZvPYoP4EQHo594G/user-GJh8gOH47p8tBQJTKztQvAWm/img-qm20w5xyfXpPsuZvbSIoWD5L.png?st=2022-12-19T17%3A33%3A43Z&se=2022-12-19T19%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-19T12%3A38%3A03Z&ske=2022-12-20T12%3A38%3A03Z&sks=b&skv=2021-08-06&sig=a6tITmx5HNByZloaAb7XVI3RTIyH%2B9y/C/BWpjrqky4%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6siElBc2XZvPYoP4EQHo594G/user-GJh8gOH47p8tBQJTKztQvAWm/img-NVGEj7QPhG9HMeBVTgr8E8UC.png?st=2022-12-19T17%3A33%3A43Z&se=2022-12-19T19%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-19T12%3A38%3A03Z&ske=2022-12-20T12%3A38%3A03Z&sks=b&skv=2021-08-06&sig=w/akfWMSslMLbGb/Dh8WWBJP3wbriwzRsSdSDsRfZAk%3D"
  ]);

  let [isLoading, setLoading] = useState(false);

  const headers = {
    "Content-Type": "application/json",
  }
  const handleClick = async () => {
    setLoading(true);

    console.log(" ======> [HANDLE CLICK]");
    console.log(tattoo);
    console.log(selectedOption);
    console.log(tattoo.topic);
    console.log(LIVE_SERVER + "/users/generate");

    // const response = await impoweredRequest(DEV_SERVER + "/users/generate", "POST", headers, {
    //   user_uuid: authUser.uid,
    //   style: selectedOption,
    //   topic: tattoo.topic,
    // });
  

    // console.log(" ======> [IMAGE GENERATED]");
    // console.log(response);
    // if (response) {
    //   const list = response?.data as [];
    //   let img_list: string[] = [];


    //   list.forEach((i: {url: string}) => {
    //     img_list = [
    //       ...img_list,
    //       i.url
    //     ]
    //   })
    //   setImages(img_list)
    // }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Home | Generator</title>
        <meta name="description" content="Generated Bad Ass Tattoo ideas for your next session" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${main.container} ${main.full} ${main.col} `}>

        <div className={`${main.full} ${main.col}`}>

          <div className={``} style={{height: "200px"}}>
            <Header words={tattoos} interval={1000} />
          </div>

          <div className={`${main.full} ${main.col}`}>

            <div className={`${main.full} ${main.col}`}>

              <CustomSelect
                name="tatto_style"
                label="Tatto Style"
                options={tattoos}
                value={selectedOption}
                onChange={setSelectedOption}
                w={100}
              />

              <CustomInput 
                name="topic"
                label="Short topic description"
                value={tattoo?.topic}
                onChange={(e) => setTattoo({
                  ...tattoo,
                  topic: e.target.value
                })}
                w={100}
                error={""}
              />  
              <div className={`${main.full} ${main.row} ${main.rowCenter}`}>
                {!isLoading ? <Button onClick={handleClick}>Generate Ideas ????</Button> : <Button onClick={handleClick}> Loading . . .</Button>}
              </div>
            </div>
          </div>

          <div className={`${main.full} ${main.col}`}  style={{paddingTop: "3rem"}}>
            <MosaicGrid images={images} columns={2} />
            <div className={`${main.full}`} style={{textAlign: "left"}}>
              <p className={`${main.full}`}>
                <span style={{color: "#e64343"}}>Japanese</span> style with short description of <span style={{color: "#e64343"}}>walking through forest</span> 
              </p>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const { handle } = params as ParsedUrlQuery;
  const url = LIVE_SERVER + "/users";

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
