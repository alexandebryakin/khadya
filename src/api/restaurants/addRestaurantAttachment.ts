import gql from 'graphql-tag';

export const ADD_RESTAURANT_ATTACHMENT = gql`
  mutation AddRestaurantAttachment($restaurantId: ID!, $attachment: Upload!) {
    addRestaurantAttachment(restaurantId: $restaurantId, attachment: $attachment) {
      restaurant {
        ...RestaurantFields
      }
      status
      errors
    }
  }
`;
