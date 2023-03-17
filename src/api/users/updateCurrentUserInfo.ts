import gql from 'graphql-tag';

export const UPDATE_CURRENT_USER_INFO = gql`
  mutation UpdateCurrentUserInfo($firstName: String!, $lastName: String) {
    updateCurrentUserInfo(firstName: $firstName, lastName: $lastName) {
      user {
        ...UserFields
      }
      status
      errors
    }
  }
`;
