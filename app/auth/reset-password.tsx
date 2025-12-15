import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ResetPassword() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text variant="headlineMedium" style={styles.title}>
        Set Your New Password
      </Text>

      <TextInput
        label="New Password"
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        label="Confirm Password"
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        buttonColor="#84cc16"
        style={styles.button}
        onPress={() => router.replace("/(tab)")}
      >
        Continue
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff", padding: 24 },
  title: { fontWeight: "600", marginBottom: 20 },
  input: { marginBottom: 14 },
  button: { borderRadius: 10, marginTop: 10 },
});