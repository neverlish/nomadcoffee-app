import { gql, useLazyQuery } from "@apollo/client";
import { NavigationProp } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { searchCoffeeShops, searchCoffeeShopsVariables } from "../__generated/searchCoffeeShops";
import CoffeeShop from "../components/CoffeeShop";
import { TextInput } from "../components/auth/AuthShared";
import { COFFEE_SHOP_FRAGMENT } from "../fragments";

const SEARCH_COFFEE_SHOPS = gql`
  query searchCoffeeShops($keyword: String!) {
    searchCoffeeShops(keyword: $keyword) {
      ...CoffeeShopFragment
    }
  }
  ${COFFEE_SHOP_FRAGMENT}
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;


export default function Search({ navigation }: { navigation: NavigationProp<any> }) {
  const { setValue, register, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery<searchCoffeeShops, searchCoffeeShopsVariables>(SEARCH_COFFEE_SHOPS);
  const onValid = ({ keyword }: FieldValues) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };

  const SearchBox = () => (
    <TextInput
      placeholderTextColor="rgba(0, 0, 0, 0.8)"
      placeholder="Search photos"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
      minLength: 3,
    });
  }, []);

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {(data?.searchCoffeeShops && data?.searchCoffeeShops.length > 0) && (
          <FlatList
            style={{ width: "100%", height: "100%" }}
            data={data?.searchCoffeeShops}
            keyExtractor={(photo) => "" + photo.id}
            renderItem={({ item }) => <CoffeeShop key={item.id} {...item} />}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}