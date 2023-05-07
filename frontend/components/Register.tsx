import React from 'react';
import { gql, useMutation } from '@apollo/client';

const REGISTER_MUTATION = gql`
mutation register($firstName: String $lastName: String $email: String $password: String!) {
  register(firstName: $firstName lastName: $lastName email: $email password: $password) {
    token
  }
}
`;

export default function SignIn() {
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);

  if (loading) { return <p>Submitting...</p>; }
  if (error) {
    return (<p>Error: {error.message}</p>);
  }

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    register({
      variables: {
        firstName: event.target?.firstName.value,
        lastName: event.target?.lastName.value,
        email: event.target?.email?.value,
        password: event.target?.password?.value,
      },
    });

    // TODO: sign in straight away
  };

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          required
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          required
          placeholder="lastName"
        />
        <input
          type="text"
          name="email"
          required
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          required
          minLength={8}
          placeholder="password"
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
