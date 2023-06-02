/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SeeCoffeeShops
// ====================================================

export interface SeeCoffeeShops_seeCoffeeShops_user {
  __typename: "User";
  username: string;
  avatarURL: string;
}

export interface SeeCoffeeShops_seeCoffeeShops_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface SeeCoffeeShops_seeCoffeeShops_categories {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface SeeCoffeeShops_seeCoffeeShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  user: SeeCoffeeShops_seeCoffeeShops_user;
  photos: SeeCoffeeShops_seeCoffeeShops_photos[];
  categories: SeeCoffeeShops_seeCoffeeShops_categories[];
}

export interface SeeCoffeeShops {
  seeCoffeeShops: SeeCoffeeShops_seeCoffeeShops[];
}

export interface SeeCoffeeShopsVariables {
  page: number;
}
