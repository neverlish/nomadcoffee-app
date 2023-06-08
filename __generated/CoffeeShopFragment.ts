/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CoffeeShopFragment
// ====================================================

export interface CoffeeShopFragment_user {
  __typename: "User";
  username: string;
  avatarURL: string;
}

export interface CoffeeShopFragment_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
}

export interface CoffeeShopFragment_categories {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
}

export interface CoffeeShopFragment {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  user: CoffeeShopFragment_user;
  photos: CoffeeShopFragment_photos[];
  categories: CoffeeShopFragment_categories[];
}
