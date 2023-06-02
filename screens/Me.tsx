import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React from "react";
import { Image, Text, View } from "react-native";
import { isLoggedInVar } from "../apollo";
import { me } from "../__generated/me";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationProp } from "@react-navigation/native";
import { colors } from "../colors";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatarURL
    }
  }
`;

const IconsContainer = styled.View`
  display: flex;
  align-items: center;
`;

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

const Username = styled.Text`
  color: white;
  font-weight: 600;
`;

export default function Me({ navigation }: { navigation: NavigationProp<{ LogIn: undefined }>} ) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<me>(ME_QUERY, {
    skip: !isLoggedIn,
  });
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoggedIn ? (
        <IconsContainer>
          <Username>
            {data?.me?.username}
          </Username>
          {data?.me?.avatarURL && <Image source={{ uri: data?.me?.avatarURL }} />}
        </IconsContainer>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
          <LoginLink>Log In</LoginLink>
        </TouchableOpacity>
      )}
    </View>
  );
}