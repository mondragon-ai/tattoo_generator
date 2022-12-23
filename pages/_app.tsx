import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Enter from './enter';
import { auth } from '../lib/firebase';

const AUTH = auth;

export default function App({ Component, pageProps }: AppProps) {

  const [authState, setAuth] = useState(false);
  const [authUser, setAuthUser] = useState({
    name: "",
    email: "",
    uid: ""
  })

  // Check status of FB User
  onAuthStateChanged(AUTH, (user) => {
    if (user !== null) {
      setAuth(true);
      setAuthUser({
        name: user?.displayName ? user?.displayName : "",
        email: user?.email ? user?.email : "",
        uid: user?.uid ? user?.uid : ""
      });
    } else {
      setAuth(false);
    }
  });

  if (!authState) {
    return (
      <div>
        <Enter />
      </div>
    )
  }

  return (
    <Layout state={authUser} >
      <Component {...pageProps}  state={authUser} />
    </Layout>
  )
}
