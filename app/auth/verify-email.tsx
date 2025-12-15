import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { TextInput as RNInput, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../lib/colors";

export default function VerifyEmail() {
  const router = useRouter();
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

  const onConfirm = () => {
    router.replace("/auth/reset-password");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Verify Your Email
        </Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to your email address
        </Text>

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

        <Button
          mode="contained"
          buttonColor={colors.primary}
          style={styles.button}
          onPress={onConfirm}
        >
          Confirm
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
  button: { borderRadius: 10 },
});
