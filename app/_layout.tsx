import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import React, { useEffect, useRef } from "react";
import AuthContextProvider from "./contexts/AuthContextProvider";
// SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const isOld = useRef("");
  const isAuth = useRef("");
  useEffect(() => {
    (async function () {
      isOld.current = (await AsyncStorage.getItem("isOld")) || "";
      isAuth.current = (await AsyncStorage.getItem("token")) || "";
    })();
  }, []);

  return (
    <AuthContextProvider>
      <Stack
        initialRouteName={isOld ? (isAuth ? "(tab)" : "auth") : "onboarding"}
      >
        <Stack.Screen
          name="(tab)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="onboarding"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="auth"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AuthContextProvider>
  );
}
