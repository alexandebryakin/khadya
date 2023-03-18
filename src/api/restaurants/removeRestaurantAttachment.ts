import gql from 'graphql-tag';

export const REMOVE_RESTAURANT_ATTACHMENT = gql`
  mutation RemoveRestaurantAttachment($restaurantId: ID!, $attachmentId: ID!) {
    removeRestaurantAttachment(restaurantId: $restaurantId, attachmentId: $attachmentId) {
      restaurant {
        ...RestaurantFields
      }
      status
      errors
    }
  }
`;
