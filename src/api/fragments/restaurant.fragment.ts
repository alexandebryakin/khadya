import gql from 'graphql-tag';

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantFields on Restaurant {
    id
    name
    currencyCode
    images {
      ...AttachmentFields
    }
  }
`;
