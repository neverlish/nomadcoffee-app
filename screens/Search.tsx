import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Search() {
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
        <Text style={{ color: "white" }}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}