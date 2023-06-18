import { gql, useMutation } from "@apollo/client";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { ReactNativeFile } from "apollo-upload-client";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ActivityIndicator, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { createCoffeeShop, createCoffeeShopVariables } from "../__generated/createCoffeeShop";
import { colors } from "../colors";

const CREATE_COFFEE_SHOP = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $categoryNames: [String!]!
    $photos: [Upload!]!
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      categoryNames: $categoryNames
      photos: $photos
    ) {
      ok
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Input = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default function UploadForm({ route, navigation }: { route: RouteProp<any>, navigation: NavigationProp<any> }) {
  const [CreateMutation, { loading }] = useMutation<createCoffeeShop, createCoffeeShopVariables>(
    CREATE_COFFEE_SHOP
  );
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    register("name");
    register("latitude");
    register("longtitude");
    register("categoryNames");
  }, [register]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);
  const onValid = ({ name, latitude, longitude, categoryNames }: FieldValues) => {
    const file = new ReactNativeFile({
      uri: route.params?.file,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    CreateMutation({
      variables: {
        photos: [file],
        categoryNames: categoryNames.split(","),
        name,
        latitude,
        longitude,
      },
    });
    // navigation.navigate("Feed")
  };
  return (
    <Container>
      <Photo resizeMode="contain" source={{ uri: route.params?.file }} />
      <CaptionContainer>
        <Input
          returnKeyType="done"
          placeholder="Write a name"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          onChangeText={(text) => setValue("name", text)}
        />
        <Input
          returnKeyType="done"
          placeholder="Write a latitude"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          onChangeText={(text) => setValue("latitude", text)}
        />
        <Input
          returnKeyType="done"
          placeholder="Write a longitude"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          onChangeText={(text) => setValue("longitude", text)}
        />
        <Input
          returnKeyType="done"
          placeholder="Write a categoryNames"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          onChangeText={(text) => setValue("categoryNames", text)}
        />
        <Button 
          title='submit'
          onPress={handleSubmit(onValid)}
        />
      </CaptionContainer>
    </Container>
  );
}