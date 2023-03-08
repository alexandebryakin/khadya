import { ApolloClient, ApolloLink, InMemoryCache, concat } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

import { jwt } from '../jwt';

const link = createUploadLink({
  uri: process.env.REACT_APP_API_URL + '/graphql',
});

const JWTAuthMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: jwt.get(),
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(JWTAuthMiddleware, link),
});

export default client;
