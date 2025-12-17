import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  TextInput as RNInput,
  Text as RNText,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../lib/colors";

export default function VerifyEmail() {
  const router = useRouter();
  const [isEnteredEmail, setIsEnteredEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<RNInput[]>([]);

  const onChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const onConfirm = async () => {
    if (isEnteredEmail) {
      const otpCode = code.join("");

      try {
        const response = await fetch(
          "http://172.252.13.92:8052/user/activate-user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              code: otpCode,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          router.replace("/auth");
        } else {
          alert(data.message || "Failed to verify user");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    } else {
      setIsEnteredEmail(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          {isEnteredEmail ? "6-digit code" : "Verify Your Email"}
        </Text>
        <Text style={styles.subtitle}>
          {isEnteredEmail
            ? `Please enter the code we've sent to ${email}`
            : "We'll send a verification code to this email to confirm your account."}
        </Text>

        {/* Email Input */}
        {!isEnteredEmail && (
          <View style={styles.inputWrapper}>
            <RNText style={styles.label}>Email Address</RNText>
            <TextInput
            textColor="black"
              placeholder="e.g. kristin.cooper@example.com"
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.placeholder}
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>
        )}
        {isEnteredEmail && (
          <View style={styles.codeContainer}>
            {code.map((value, i) => (
              <RNInput
                secureTextEntry
                key={i}
                ref={(ref) => (inputs.current[i] = ref!) as any}
                style={styles.codeInput}
                keyboardType="number-pad"
                maxLength={1}
                value={value}
                onChangeText={(text) => onChange(text, i)}
              />
            ))}
          </View>
        )}

        <Button
        textColor="white"
          mode="contained"
          buttonColor={colors.primary}
          style={styles.button}
          onPress={onConfirm}
        >
          {!isEnteredEmail ? "Send OTP" : "Confirm"}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: 24, justifyContent: "center" },
  title: { fontWeight: "600", marginBottom: 8 },
  subtitle: { color: "#6b7280", marginBottom: 28 },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  codeInput: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
  },
  button: { borderRadius: 10, paddingVertical: 3 },
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
});
