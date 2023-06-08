import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { CoffeeShopFragment } from "../__generated/CoffeeShopFragment";

const Container = styled.View`
  border: 1px solid white;
  display: flex;
  width: 200px;
  flex-direction: column;
  align-self: center;
  align-items: center;
  margin-bottom: 20px;
`;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5;
`;

const WhiteText = styled.Text`
  color: white;
  font-weight: 600;
`;
const Photos = styled.View`
  display: flex;
`;
const Categories = styled.View`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
const Category = styled.Text`
  color: white;
`;

function CoffeeShop({ id, user, name, photos, categories }: CoffeeShopFragment) {
  const navigation = useNavigation<NavigationProp<{ Profile: undefined }>>();
  return (
    <Container>
      <Header onPress={() => navigation.navigate("Profile")}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <WhiteText>{user.username}</WhiteText>
          {user.avatarURL && <UserAvatar resizeMode="cover" source={{ uri: user.avatarURL }} />}
        </TouchableOpacity>
      </Header>
      <WhiteText>
        {name}
      </WhiteText>
      <Photos>
        {photos.map((photo) => <Image key={photo.id} source={{ uri: photo.url }} />)}
      </Photos>
      <Categories>
        {categories.map((c) => <Category key={c.id}>{c.name}</Category>)}
      </Categories>
    </Container>
  );
}

export default CoffeeShop;