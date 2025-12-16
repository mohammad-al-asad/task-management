import { Stack } from "expo-router";
import React from "react";

export default function ProfileLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="my-profile" />
      <Stack.Screen name="change-password" />
      <Stack.Screen name="edit-profile" />
    </Stack>
  );
}
