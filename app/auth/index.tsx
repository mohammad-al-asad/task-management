import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Asset } from "expo-asset";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
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
import { useAuth } from "../contexts/AuthContextProvider";
import { colors } from "../lib/colors";

export default function Auth() {
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedRememberMe, setAcceptedRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { refetchUser } = useAuth();

  const loginUser = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("http://172.252.13.92:8052/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Login failed");
      }

      //Save user & token
      await AsyncStorage.setItem("token", result.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(result.data.user));
      refetchUser!();
      router.replace("/(tab)" as any);
    } catch (error: any) {
      Alert.alert("Login Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async () => {
    if (
      !firstName ||
      !lastName ||
      !address ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      const asset = Asset.fromModule(require("../../assets/images/splash.png"));
      await asset.downloadAsync();

      formData.append("file", {
        uri: asset.localUri || asset.uri,
        name: "image.png",
        type: "image/png",
      } as any);

      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("address", address);
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch("http://172.252.13.92:8052/user/register", {
        method: "POST",
        body: formData,
        headers:{
          "Content-Type": "application/x-www-form-urlencoded",
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Registration failed");
      }

      router.push("/auth/verify-email");
    } catch (error: any) {
      Alert.alert("Registration Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () => {
    if (isSignUp) {
      registerUser();
    } else {
      loginUser();
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
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <RNText style={styles.title}>
            {isSignUp ? "Create Your Account" : "Welcome Back!"}
          </RNText>

          <RNText style={styles.subtitle}>
            {isSignUp
              ? "Join Task Manager today — organize better, work smarter."
              : "Stay productive and take control of your tasks."}
          </RNText>

          {isSignUp && (
            <>
              <View style={styles.inputWrapper}>
                <RNText style={styles.label}>First Name</RNText>
                <TextInput
                textColor="black"
                  mode="outlined"
                  placeholder="e.g. Kristin"
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholderTextColor={colors.placeholder}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputWrapper}>
                <RNText style={styles.label}>Last Name</RNText>
                <TextInput
                textColor="black"
                  mode="outlined"
                  placeholder="e.g. Cooper"
                  value={lastName}
                  onChangeText={setLastName}
                  placeholderTextColor={colors.placeholder}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputWrapper}>
                <RNText style={styles.label}>Address</RNText>
                <TextInput
                textColor="black"
                  mode="outlined"
                  placeholder="e.g. 1234 Elm Street, Springfield, IL"
                  value={address}
                  onChangeText={setAddress}
                  placeholderTextColor={colors.placeholder}
                  style={styles.input}
                />
              </View>
            </>
          )}

          <View style={styles.inputWrapper}>
            <RNText style={styles.label}>Email Address</RNText>
            <TextInput
            textColor="black"
              mode="outlined"
              keyboardType="email-address"
              placeholder="e.g. kristin.cooper@example.com"
              placeholderTextColor={colors.placeholder}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>

          <View style={styles.inputWrapper}>
            <RNText style={styles.label}>Password</RNText>
            <TextInput
            textColor="black"
              mode="outlined"
              value={password}
              placeholder="••••••••"
              placeholderTextColor={colors.placeholder}
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

          {isSignUp && (
            <View style={styles.inputWrapper}>
              <RNText style={styles.label}>Confirm Password</RNText>
              <TextInput
              textColor="black"
                mode="outlined"
                value={confirmPassword}
                placeholder="••••••••"
                placeholderTextColor={colors.placeholder}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
                right={
                  <TextInput.Icon
                    forceTextInputFocus={false}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    icon={() => (
                      <MaterialCommunityIcons
                        name={
                          showConfirmPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={22}
                        color="#6b7280"
                      />
                    )}
                  />
                }
              />
            </View>
          )}

          {isSignUp ? (
            <View style={styles.termsRow}>
              <Checkbox
                status={acceptedTerms ? "checked" : "unchecked"}
                onPress={() => setAcceptedTerms(!acceptedTerms)}
                color={colors.primary}
              />
              <RNText style={styles.termsText}>
                I agree to the Terms & Conditions
              </RNText>
            </View>
          ) : (
            <View style={styles.termsRow}>
              <Checkbox
                status={acceptedRememberMe ? "checked" : "unchecked"}
                onPress={() => setAcceptedRememberMe(!acceptedRememberMe)}
                color={colors.primary}
              />
              <RNText style={styles.termsText}>Remember me</RNText>
            </View>
          )}

          {/* OR Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <RNText style={styles.orText}>OR</RNText>
            <View style={styles.divider} />
          </View>

          {/* TOGGLE LOGIN / SIGNUP */}
          <Pressable onPress={() => setIsSignUp(!isSignUp)}>
            <RNText style={styles.loginText}>
              {isSignUp
                ? "Already have an account? "
                : "Don’t have an account? "}
              <RNText style={styles.link}>
                {isSignUp ? "Log in" : "Sign Up"}
              </RNText>
            </RNText>
          </Pressable>

          {/* BUTTON */}
          <Button
          textColor="white"
            mode="contained"
            buttonColor={colors.primary}
            loading={loading}
            disabled={loading || (isSignUp && !acceptedTerms)}
            style={styles.button}
            onPress={onSubmit}
          >
            {isSignUp ? "Continue" : "Log In"}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: 24, paddingVertical: 20 },
  title: { fontSize: 30, fontWeight: "500", marginBottom: 8 },
  subtitle: { color: "#6b7280", marginBottom: 28 },
  inputWrapper: { marginBottom: 14 },
  label: { marginBottom: 4, color: colors.text },
  input: { backgroundColor: "#F7FFEF" },
  termsRow: { flexDirection: "row", alignItems: "center", marginVertical: 12 },
  termsText: { flex: 1, fontSize: 13, color: "#374151" },
  button: { marginTop: 10, borderRadius: 10 },
  loginText: {
    textAlign: "left",
    fontSize: 14,
    paddingVertical: 10,

    color: "#374151",
  },
  link: { color: "#84cc16", fontWeight: "500" },
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
});
