import { ApolloProvider } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import client, { isLoggedInVar, tokenVar } from "./apollo";
import Navs from "./navigators/Navs";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preloadAssets = async () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require("./assets/logo.png"),
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    await Promise.all([...fontPromises, ...imagePromises]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    return preloadAssets();
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Navs />
        </GestureHandlerRootView>
      </NavigationContainer>
    </ApolloProvider>
  );
}
