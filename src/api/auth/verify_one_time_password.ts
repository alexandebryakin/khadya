import gql from 'graphql-tag';

export const SEND_ONE_TIME_PASSWORD = gql`
  mutation VerifyOneTimePassword($oneTimePassword: String!, $code: String!, $number: String!) {
    verifyOneTimePassword(oneTimePassword: $oneTimePassword, code: $code, number: $number) {
      user {
        ...UserFields
      }
      status
      errors {
        oneTimePassword
      }
    }
  }
`;
