import CommonAlert from "@/app/components/ui/CommonAlert";
import ProfileTopBar from "@/app/components/ui/ProfileTopBar";
import { colors } from "@/app/lib/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePassword() {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onConfirmUpdate = async () => {
    try {
      setLoading(true);
      setShowWarning(false);
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
      formData.append("password", newPassword);

      const response = await fetch(
        "http://172.252.13.92:8052/user/update-profile",
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Password update failed");
      }
      setShowSuccess(true);
    } catch (error: any) {
      Alert.alert("Password update Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const onUpdatePassword = async () => {
    if (oldPassword && confirmPassword && newPassword) {
      if (confirmPassword !== newPassword) {
        Alert.alert("Error", "Password didn't match");
        return;
      }
      setShowWarning(true);
    } else {
      Alert.alert("Error", "Fill all the fields");
      return;
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Alert */}
      <CommonAlert
        visible={showWarning}
        type="warning"
        title="Warning"
        message="Are you sure you want to change your password?"
        cancelText="Cancel"
        confirmText="Confirm"
        onCancel={() => setShowWarning(false)}
        onConfirm={onConfirmUpdate}
      />
      <CommonAlert
        visible={showSuccess}
        type="success"
        title="Success"
        message="Your password has been changed successfully."
        confirmText="OK"
        onConfirm={() => {
          router.replace("/profile/account-setting");
          setShowSuccess(false);
        }}
      />
      {/* Header */}
      <ProfileTopBar heading="Change Password" />

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Type Password</Text>
        <TextInput
          mode="outlined"
          value={oldPassword}
          placeholderTextColor={colors.placeholder}
          textColor="black"
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
          placeholderTextColor={colors.placeholder}
          placeholder="••••••••"
          textColor="black"
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
          placeholderTextColor={colors.placeholder}
          value={confirmPassword}
          placeholder="••••••••"
          onChangeText={setConfirmPassword}
          textColor="black"
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

        <Button
          mode="contained"
          style={styles.button}
          onPress={onUpdatePassword}
          disabled={loading}
          textColor="white"
        >
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
