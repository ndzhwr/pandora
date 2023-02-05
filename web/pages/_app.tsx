import Head from 'next/head'
import React, { useContext } from 'react'
import '../styles/globals.css'
import { AuthProvider, useAuth } from '../store/useAuth'

function MyApp({ Component, pageProps }) {
  const { signUp }  = useAuth()
  console.log(signUp);
  
  return (
     <AuthProvider>
      <Head>
        <title>Pandora</title>
        <link rel="favicon" href='icon.svg' />
        <link rel="icon" type="image/x-icon" href="/icon.svg"></link>
      </Head>
      <Component {...pageProps} />
  </AuthProvider >
  )
}

export default MyApp
