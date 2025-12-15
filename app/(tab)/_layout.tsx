import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (

      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused, color }) => {
              return focused ? (
                <Entypo name="home" size={24} color={color} />
              ) : (
                <MaterialCommunityIcons
                  name="home-outline"
                  size={24}
                  color={color}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "About",
            tabBarIcon: ({ focused, color }) => {
              return focused ? (
                <Ionicons
                  name="information-circle-sharp"
                  size={24}
                  color={color}
                />
              ) : (
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color={color}
                />
              );
            },
          }}
        />
      </Tabs>
  );
}
