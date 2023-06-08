/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchCoffeeShops
// ====================================================

export interface searchCoffeeShops_searchCoffeeShops_user {
  __typename: "User";
  username: string;
  avatarURL: string;
}

export interface searchCoffeeShops_searchCoffeeShops_photos {
  __typename: "CoffeeShopPhoto";
  id: number;
  url: string;
}

export interface searchCoffeeShops_searchCoffeeShops_categories {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
}

export interface searchCoffeeShops_searchCoffeeShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  user: searchCoffeeShops_searchCoffeeShops_user;
  photos: searchCoffeeShops_searchCoffeeShops_photos[];
  categories: searchCoffeeShops_searchCoffeeShops_categories[];
}

export interface searchCoffeeShops {
  searchCoffeeShops: searchCoffeeShops_searchCoffeeShops[];
}

export interface searchCoffeeShopsVariables {
  keyword: string;
}
