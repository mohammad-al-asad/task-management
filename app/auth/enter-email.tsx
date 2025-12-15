import React from "react";
import { Text as RNText, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../lib/colors";

const enterEmail = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Title */}
        <RNText style={styles.title}>Verify Your Email</RNText>
        {/* Subtitle */}
        <RNText style={styles.subtitle}>
          We&apos;ll send a verification code to this email to confirm your
          account.
        </RNText>
        {/* Email */}
        <View style={styles.inputWrapper}>
          <RNText style={styles.label}>Email Address</RNText>
          <TextInput
            placeholder="e.g. kristin.cooper@example.com"
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colors.placeholder}
            style={styles.input}
          />
        </View>
        /{" "}
        <Button
          mode="contained"
          buttonColor={colors.primary}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Send OTP
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default enterEmail;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: 24, justifyContent: "center" },
  inputWrapper: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 4,
    color: colors.text,
  },
  input: {
    backgroundColor: "#F7FFEF",
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: 28,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
  },
  buttonContent: {
    paddingVertical: 3,
  },
});
