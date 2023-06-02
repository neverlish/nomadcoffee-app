import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native";
import { SeeCoffeeShops } from "../__generated/SeeCoffeeShops";
import CoffeeShop from "../components/CoffeeShop";
import ScreenLayout from "../components/ScreenLayout";

const FEED_QUERY = gql`
  query SeeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      id
      name
      user {
        username
        avatarURL
      }
      photos {
        url
      }
      categories {
        name
        slug
      }
    }
  }
`;

export default function Feed() {
  const { data, loading, error } = useQuery<SeeCoffeeShops>(FEED_QUERY, { variables: { page: 1 }});
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeCoffeeShops}
        keyExtractor={(photo) => "" + photo.id}
        renderItem={({ item }) => <CoffeeShop {...item} />}
      />
    </ScreenLayout>
  );
}