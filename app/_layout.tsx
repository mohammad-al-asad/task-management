import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Provider } from "react-native-paper";
import AuthContextProvider from "./contexts/AuthContextProvider";

export default function RootLayout() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    (async function () {
      const isOld = (await AsyncStorage.getItem("isOld")) || "";
      const token = (await AsyncStorage.getItem("token")) || "";
      setInitialRoute(isOld ? (token ? "(tab)" : "auth") : "onboarding");
      await SplashScreen.hideAsync();
    })();
  }, []);

  if (!initialRoute) {
    return null;
  }
console.log(initialRoute);

  return (
    <AuthContextProvider>
      <Provider>
        <Stack
          screenOptions={{ headerShown: false }}
          initialRouteName={initialRoute}
        >
          <Stack.Screen name="(tab)" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="auth" />
        </Stack>
      </Provider>
    </AuthContextProvider>
  );
}
