import gql from 'graphql-tag';

export const CREATE_RESTAURANT = gql`
  mutation CreateRestaurant($name: String!) {
    createRestaurant(name: $name) {
      restaurant {
        ...RestaurantFields
      }
      network {
        ...NetworkFields
      }
      status
      errors
    }
  }
`;
