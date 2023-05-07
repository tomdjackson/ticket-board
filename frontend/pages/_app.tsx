import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import { AuthProvider } from '../lib/auth';

function MyApp({ Component, pageProps }: AppProps) {
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

MyApp.getInitialProps = async function getInitialProps({ Component, ctx }: { Component: any, ctx: any }) {
  let pageProps: any = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps.query = ctx.query;
  return { pageProps };
};

export default MyApp;
