import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import main from '../styles/Main.module.css';
import CustomInput from '../components/ui/form/Input'
import { use, useState } from 'react'
import Header from '../components/ui/text/RotatingHeader';
import CustomSelect from '../components/ui/form/Select';
import MosaicGrid from '../components/ui/mosaic';
import Button from '../components/ui/Button';
import { impoweredRequest } from '../lib/requests';
export default function History() {
  const [selectedOption, setSelectedOption] = useState('American Traditional');


  const [images, setImages] = useState([
    {
      search_list: [
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6siElBc2XZvPYoP4EQHo594G/user-GJh8gOH47p8tBQJTKztQvAWm/img-Q8nHB6D7F0eaq3zBeBd7pqSh.png?st=2022-12-19T17%3A33%3A43Z&se=2022-12-19T19%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-19T12%3A38%3A03Z&ske=2022-12-20T12%3A38%3A03Z&sks=b&skv=2021-08-06&sig=ynTR%2B53tkgDRx%2BvmFf%2BEunKd8l1G2LsqQ7gdKW%2Blwek%3D",
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6siElBc2XZvPYoP4EQHo594G/user-GJh8gOH47p8tBQJTKztQvAWm/img-U8gPiit4vsWxCtRpp7h1kVoX.png?st=2022-12-19T17%3A33%3A43Z&se=2022-12-19T19%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-19T12%3A38%3A03Z&ske=2022-12-20T12%3A38%3A03Z&sks=b&skv=2021-08-06&sig=JZ6Cov/DlPXKR0u0B4mZFiRCs6NEZrHXD8CeBml2iJ8%3D",
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6siElBc2XZvPYoP4EQHo594G/user-GJh8gOH47p8tBQJTKztQvAWm/img-qm20w5xyfXpPsuZvbSIoWD5L.png?st=2022-12-19T17%3A33%3A43Z&se=2022-12-19T19%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-19T12%3A38%3A03Z&ske=2022-12-20T12%3A38%3A03Z&sks=b&skv=2021-08-06&sig=a6tITmx5HNByZloaAb7XVI3RTIyH%2B9y/C/BWpjrqky4%3D",
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6siElBc2XZvPYoP4EQHo594G/user-GJh8gOH47p8tBQJTKztQvAWm/img-NVGEj7QPhG9HMeBVTgr8E8UC.png?st=2022-12-19T17%3A33%3A43Z&se=2022-12-19T19%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-19T12%3A38%3A03Z&ske=2022-12-20T12%3A38%3A03Z&sks=b&skv=2021-08-06&sig=w/akfWMSslMLbGb/Dh8WWBJP3wbriwzRsSdSDsRfZAk%3D"
      ],
      style: "Japanese Style",
      topic: "Tiger walking through the forest",
    },
    {
      search_list: [
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6siElBc2XZvPYoP4EQHo594G/user-GJh8gOH47p8tBQJTKztQvAWm/img-Q8nHB6D7F0eaq3zBeBd7pqSh.png?st=2022-12-19T17%3A33%3A43Z&se=2022-12-19T19%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-19T12%3A38%3A03Z&ske=2022-12-20T12%3A38%3A03Z&sks=b&skv=2021-08-06&sig=ynTR%2B53tkgDRx%2BvmFf%2BEunKd8l1G2LsqQ7gdKW%2Blwek%3D",
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6siElBc2XZvPYoP4EQHo594G/user-GJh8gOH47p8tBQJTKztQvAWm/img-U8gPiit4vsWxCtRpp7h1kVoX.png?st=2022-12-19T17%3A33%3A43Z&se=2022-12-19T19%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-19T12%3A38%3A03Z&ske=2022-12-20T12%3A38%3A03Z&sks=b&skv=2021-08-06&sig=JZ6Cov/DlPXKR0u0B4mZFiRCs6NEZrHXD8CeBml2iJ8%3D",
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6siElBc2XZvPYoP4EQHo594G/user-GJh8gOH47p8tBQJTKztQvAWm/img-qm20w5xyfXpPsuZvbSIoWD5L.png?st=2022-12-19T17%3A33%3A43Z&se=2022-12-19T19%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-19T12%3A38%3A03Z&ske=2022-12-20T12%3A38%3A03Z&sks=b&skv=2021-08-06&sig=a6tITmx5HNByZloaAb7XVI3RTIyH%2B9y/C/BWpjrqky4%3D",
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-6siElBc2XZvPYoP4EQHo594G/user-GJh8gOH47p8tBQJTKztQvAWm/img-NVGEj7QPhG9HMeBVTgr8E8UC.png?st=2022-12-19T17%3A33%3A43Z&se=2022-12-19T19%3A33%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-19T12%3A38%3A03Z&ske=2022-12-20T12%3A38%3A03Z&sks=b&skv=2021-08-06&sig=w/akfWMSslMLbGb/Dh8WWBJP3wbriwzRsSdSDsRfZAk%3D"
      ],
      style: "Dot Work",
      topic: "Greek god fighting deamon",
    }
  ]);

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
          images.length > 0 ? images.map(search => {
            return (
              <div className={`${main.full} ${main.col}`}  style={{paddingTop: "1rem"}}>
                <MosaicGrid images={search.search_list} columns={2} />
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
