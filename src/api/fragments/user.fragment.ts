import gql from "graphql-tag";

export const USER_FRAGMENT = gql`
  fragment UserFields on User {
    id
    firstName
    lastName
    languageCode
    kind
    phones {
      ...PhoneFields
    }
    emails {
      ...EmailFields
    }
  }
`;