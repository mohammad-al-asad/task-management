import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Provider } from "react-native-paper";
import AuthContextProvider from "./contexts/AuthContextProvider";

export default function RootLayout() {
  SplashScreen.preventAutoHideAsync();
  const isOld = useRef("");
  const isAuth = useRef("");
  useEffect(() => {
    (async function () {
      isOld.current = (await AsyncStorage.getItem("isOld")) || "";
      isAuth.current = (await AsyncStorage.getItem("token")) || "";
      await SplashScreen.hideAsync();
    })();
  }, []);

  return (
    <AuthContextProvider>
      <Provider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={isOld ? (isAuth ? "(tab)" : "auth") : "onboarding"}
        >
          <Stack.Screen name="(tab)" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="auth" />
        </Stack>
      </Provider>
    </AuthContextProvider>
  );
}
