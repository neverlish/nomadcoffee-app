import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { SeeCoffeeShops } from "../__generated/SeeCoffeeShops";
import CoffeeShop from "../components/CoffeeShop";
import ScreenLayout from "../components/ScreenLayout";
import { COFFEE_SHOP_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query SeeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      ...CoffeeShopFragment
    }
  }
  ${COFFEE_SHOP_FRAGMENT}
`;

export default function Feed() {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const { data, error, loading, refetch, fetchMore } = useQuery<SeeCoffeeShops>(FEED_QUERY, { variables: { page: 1 }});
  const refresh = async () => {
    setRefreshing(true);
    await refetch();  
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%", height: "100%" }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.02}
        onEndReached={() => {
          const newPage = page + 1;
          fetchMore({ 
            variables: { page: newPage }, 
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev;
              }
              if (fetchMoreResult.seeCoffeeShops.length === 0) {
                return prev;
              }
              return Object.assign(prev, {
                seeCoffeeShops: [
                  ...prev.seeCoffeeShops,
                  ...fetchMoreResult.seeCoffeeShops,
                ],
              });
            }})
          setPage(newPage);
        }}
        refreshing={refreshing}
        onRefresh={refresh}
        data={data?.seeCoffeeShops}
        keyExtractor={(photo) => "" + photo.id}
        renderItem={({ item }) => <CoffeeShop key={item.id} {...item} />}
      />
    </ScreenLayout>
  );
}