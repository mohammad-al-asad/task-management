import ProfileTopBar from "@/app/components/ui/ProfileTopBar";
import { colors } from "@/app/lib/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePassword() {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <ProfileTopBar heading="Change Password" />

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Type Password</Text>
        <TextInput
          mode="outlined"
          value={oldPassword}
          placeholder="••••••••"
          onChangeText={setOldPassword}
          secureTextEntry={!showOld}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={showOld ? "eye-off-outline" : "eye-outline"}
                  size={20}
                />
              )}
              onPress={() => setShowOld(!showOld)}
            />
          }
        />

        <Text style={styles.label}>New Password</Text>
        <TextInput
          mode="outlined"
          value={newPassword}
          placeholder="••••••••"
          onChangeText={setNewPassword}
          secureTextEntry={!showNew}
          style={styles.input}
          right={
            <TextInput.Icon
              forceTextInputFocus={false}
              icon={() => (
                <MaterialCommunityIcons
                  name={showNew ? "eye-off-outline" : "eye-outline"}
                  size={20}
                />
              )}
              onPress={() => setShowNew(!showNew)}
            />
          }
        />

        <Text style={styles.label}>New Confirm Password</Text>
        <TextInput
          mode="outlined"
          value={confirmPassword}
          placeholder="••••••••"
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirm}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={showConfirm ? "eye-off-outline" : "eye-outline"}
                  size={20}
                />
              )}
              onPress={() => setShowConfirm(!showConfirm)}
            />
          }
        />

        <Button mode="contained" style={styles.button}>
          Update
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#374151",
  },
  input: {
    marginBottom: 16,
    backgroundColor: colors.inputBackground,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
});
