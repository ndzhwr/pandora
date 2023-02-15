import Head from 'next/head'
import React, { useContext } from 'react'
import '../styles/globals.css'
import { AuthProvider, useAuth } from '../store/useAuth'
import MainLayout from '../layouts/MainLayout'

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Head>
        <title>Pandora</title>
        <link rel="favicon" href='icon.svg' />
        <link rel="icon" type="image/x-icon" href="/icon.svg"></link>
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AuthProvider >
  )
}

export default MyApp
