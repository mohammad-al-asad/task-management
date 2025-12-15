import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text as RNText,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Checkbox, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../lib/colors";

export default function Auth() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const onSubmit = () => {
    if (isSignUp) {
      router.push("/auth/verify-email");
    } else {
      router.replace("/(tab)");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginVertical: "auto",
          }}
        >
          {/* Title */}
          <RNText style={styles.title}>
            {isSignUp ? "Create Your Account" : "Welcome Back!"}
          </RNText>

          {/* Subtitle */}
          <RNText style={styles.subtitle}>
            {isSignUp
              ? "Join Task Manager today — organize better, work smarter, and stay in control of your day."
              : "Stay productive and take control of your tasks."}
          </RNText>

          {/* First Name */}
          {isSignUp && (
            <View style={styles.inputWrapper}>
              <RNText style={styles.label}>First Name</RNText>
              <TextInput
                placeholder="e.g. Kristin"
                mode="outlined"
                style={styles.input}
              />
            </View>
          )}

          {/* Last Name */}
          {isSignUp && (
            <View style={styles.inputWrapper}>
              <RNText style={styles.label}>Last Name</RNText>
              <TextInput
                placeholder="e.g. Cooper"
                mode="outlined"
                style={styles.input}
              />
            </View>
          )}

          {/* Address */}
          {isSignUp && (
            <View style={styles.inputWrapper}>
              <RNText style={styles.label}>Address</RNText>
              <TextInput
                placeholder="e.g. 1234 Elm Street, Springfield, IL"
                mode="outlined"
                style={styles.input}
              />
            </View>
          )}

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

          {/* Password */}
          <View style={styles.inputWrapper}>
            <RNText style={styles.label}>Password</RNText>
            <TextInput
              placeholder="••••••••"
              mode="outlined"
              secureTextEntry
              style={styles.input}
            />
          </View>

          {/* Confirm Password */}
          {isSignUp && (
            <View style={styles.inputWrapper}>
              <RNText style={styles.label}>Confirm Password</RNText>
              <TextInput
                placeholder="••••••••"
                mode="outlined"
                secureTextEntry
                style={styles.input}
              />
            </View>
          )}

          {/* Terms & Conditions */}
          {isSignUp && (
            <View style={styles.termsRow}>
              <Checkbox
                status={acceptedTerms ? "checked" : "unchecked"}
                onPress={() => setAcceptedTerms(!acceptedTerms)}
                color={colors.primary}
              />
              <RNText style={styles.termsText}>
                I agree to the Terms & Conditions Privacy Policy.
              </RNText>
            </View>
          )}

          {/* Button */}
          <Button
            mode="contained"
            buttonColor={colors.primary}
            disabled={isSignUp && !acceptedTerms}
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={onSubmit}
          >
            {isSignUp ? "Continue" : "Log In"}
          </Button>

          {/* OR Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <RNText style={styles.orText}>OR</RNText>
            <View style={styles.divider} />
          </View>

          {/* Footer Links */}
          {isSignUp ? (
            <Pressable onPress={() => setIsSignUp(false)}>
              <RNText style={styles.loginText}>
                Already have an account?{" "}
                <RNText style={styles.link}>Log in</RNText>
              </RNText>
            </Pressable>
          ) : (
            <Pressable onPress={() => setIsSignUp(true)}>
              <RNText style={styles.loginText}>
                Don’t have an account?{" "}
                <RNText style={styles.link}>Sign Up</RNText>
              </RNText>
            </Pressable>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
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
  inputWrapper: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 4,
    color: colors.text,
  },
  input: {
    backgroundColor: "#F7FFEF",
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 12,
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: "#374151",
  },
  link: {
    color: "#84cc16",
    fontWeight: "500",
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
  },
  buttonContent: {
    paddingVertical: 10,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1.5,
    backgroundColor: "#000000",
  },
  orText: {
    marginHorizontal: 10,
    color: "0000",
    fontSize: 15,
    fontWeight: 600,
  },
  loginText: {
    textAlign: "center",
    fontSize: 14,
    paddingTop: 10,
    color: "#374151",
  },
  footer: {
    textAlign: "center",
    marginTop: 18,
    color: "#84cc16",
  },
});

