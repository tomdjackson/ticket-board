import React, { useState, useContext, createContext } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';

const authContext = createContext('Default Value');

export const useAuth: any = () => useContext(authContext);

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null);

  const isSignedIn = () => {
    if (authToken) {
      return true;
    }
    return false;
  };

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: 'http://localhost:4000/graphql',
      headers: authToken ? { authorization: `Bearer ${authToken}` } : {},
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  const signOut = () => {
    setAuthToken(null);
  };

  return {
    setAuthToken,
    isSignedIn,
    signOut,
    createApolloClient,
  };
}

export function AuthProvider({ children }: any) {
  const auth :any = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  );
}
