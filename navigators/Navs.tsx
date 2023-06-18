import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import TabIcon from "../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";
import { View } from "react-native";
import UploadNav from "./UploadNav";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

const Tabs = createBottomTabNavigator();

export default function Navs() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "black", borderTopColor: "rgba(255,255,255,0.5)" },
        tabBarActiveTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="FeedTab"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Feed" />}
      </Tabs.Screen>
      {isLoggedIn && 
        <Tabs.Screen
          name="CameraTab"
          component={UploadNav}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon iconName={"camera"} color={color} focused={focused} />
            ),
          }}
        />}
      
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="MeTab"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"person"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
