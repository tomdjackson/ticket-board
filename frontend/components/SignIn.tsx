import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../lib/auth';

const LOGIN_MUTATION = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  if (loading) { return <p>Submitting...</p>; }
  if (error) {
    return (<p>Error: {error.message}</p>);
  }

  const { setAuthToken } = useAuth();

  async function handleSubmit(e: any) {
    e.preventDefault();

    const result = await login({
      variables: { email, password },
    });

    setAuthToken(result?.data?.login?.token);
  }

  return (
    <div>
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Sign In" />
      </form>
    </div>
  );
}
