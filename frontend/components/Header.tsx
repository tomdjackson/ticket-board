import React from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/auth';

export default function Header() {
  const { isSignedIn, signOut } = useAuth();

  const handleClick = () => {
    signOut();
    // TODO redirect to '/'
  };

  return (
    <div>
      <h1> Ticket Board</h1>
      <Link href="/"><button type="button">Home</button></Link>
      {isSignedIn() ? (<button type="button" onClick={handleClick}>Sign Out</button>) : ''}
    </div>
  );
}
