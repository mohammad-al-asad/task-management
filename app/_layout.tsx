import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Provider } from "react-native-paper";
import AuthContextProvider from "./contexts/AuthContextProvider";
import TaskProvider from "./contexts/TaskProvider";

export default function RootLayout() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    (async function () {
      const isOld = (await AsyncStorage.getItem("isOld")) || null;
      const token = (await AsyncStorage.getItem("token")) || null;
      setInitialRoute(isOld ? (token ? "(tab)" : "auth") : "onboarding");
      await SplashScreen.hideAsync();
    })();
  }, []);

  if (!initialRoute) {
    return null;
  }

  return (
    <AuthContextProvider>
      <TaskProvider>
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
      </TaskProvider>
    </AuthContextProvider>
  );
}
