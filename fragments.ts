import { gql } from "@apollo/client";

export const COFFEE_SHOP_FRAGMENT = gql`
  fragment CoffeeShopFragment on CoffeeShop {
    id
    name
    user {
      username
      avatarURL
    }
    photos {
      id
      url
    }
    categories {
      id
      name
      slug
    }
  }
`