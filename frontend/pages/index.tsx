import React from 'react';
import Head from 'next/head';
import { useAuth } from '../lib/auth';
import SignIn from '../components/SignIn';
import Register from '../components/Register';
import Boards from '../components/Boards';

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <div>
      <Head>
        <title>Ticket Board</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main>
        {isSignedIn()
          ? (<Boards />)
          : (
            <div>
              <SignIn />
              <Register />
            </div>
          )}
      </main>
    </div>
  );
}
