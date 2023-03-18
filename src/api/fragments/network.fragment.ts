import gql from 'graphql-tag';

export const NETWORK_FRAGMENT = gql`
  fragment NetworkFields on Network {
    id
    name
  }
`;
