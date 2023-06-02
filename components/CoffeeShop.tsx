import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { SeeCoffeeShops_seeCoffeeShops } from "../__generated/SeeCoffeeShops";

const Container = styled.View``;
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

const Username = styled.Text`
  color: white;
  font-weight: 600;
`;
const Actions = styled.View``;
const Action = styled.TouchableOpacity``;
const Caption = styled.View``;

function CoffeeShop({ id, user }: SeeCoffeeShops_seeCoffeeShops) {
  const navigation = useNavigation<NavigationProp<{ Profile: undefined }>>();
  return (
    <Container>
      <Header onPress={() => navigation.navigate("Profile")}>
        {user.avatarURL && <UserAvatar resizeMode="cover" source={{ uri: user.avatarURL }} />}
        <Username>{user.username}</Username>
      </Header>
      <Actions>
        <Action />
        <Action />
      </Actions>
      <Caption>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Username>{user.username}</Username>
        </TouchableOpacity>
      </Caption>
    </Container>
  );
}

export default CoffeeShop;