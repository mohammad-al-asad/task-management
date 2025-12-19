import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Provider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux";

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
    <ReduxProvider store={store}>
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
    </ReduxProvider>
  );
}
