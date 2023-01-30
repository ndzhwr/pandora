import Head from 'next/head'
import React from 'react'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>Pandora</title>
      <link rel="favicon" href='icon.svg' />
      <link rel="icon" type="image/x-icon" href="/images/icon.svg"></link>
    </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
