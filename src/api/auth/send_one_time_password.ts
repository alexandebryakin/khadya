import gql from 'graphql-tag';

export const SEND_ONE_TIME_PASSWORD = gql`
  mutation SendOneTimePassword($code: String!, $number: String!) {
    sendOneTimePassword(code: $code, number: $number) {
      status
      errors
    }
  }
`;
