import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text as RNText, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../lib/colors";

export default function ResetPassword() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Title */}
      <RNText style={styles.title}>Set Your New Password</RNText>

      {/* Subtitle */}
      <RNText style={styles.subtitle}>
        Create a secure password to protect your account and get started
        seamlessly!
      </RNText>

      {/* New Password */}
      <View style={styles.inputWrapper}>
        <RNText style={styles.label}>Password</RNText>
        <TextInput
          placeholder="••••••••"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
          right={
            <TextInput.Icon
              forceTextInputFocus={false}
              onPress={() => setShowPassword(!showPassword)}
              icon={() => (
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#6b7280"
                />
              )}
            />
          }
        />
      </View>

      {/* Confirm Password */}
      <View style={styles.inputWrapper}>
        <RNText style={styles.label}>Password</RNText>
        <TextInput
          placeholder="••••••••"
          mode="outlined"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          style={styles.input}
          right={
            <TextInput.Icon
              forceTextInputFocus={false}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              icon={() => (
                <MaterialCommunityIcons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#6b7280"
                />
              )}
            />
          }
        />
      </View>

      {/* Button */}
      <Button
        mode="contained"
        buttonColor="#84cc16"
        style={styles.button}
        onPress={() => router.replace("/(tab)/home" as any)}
      >
        Continue
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    paddingTop: 0,
    justifyContent: "center",
  },
  title: {
    fontWeight: "600",
    marginBottom: 5,
    fontSize: 30,
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: 28,
  },
  input: {
    marginBottom: 14,
  },
  button: {
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 3,
  },
  inputWrapper: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 4,
    color: colors.text,
  },
});
