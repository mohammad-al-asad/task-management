import CommonAlert from "@/app/components/ui/CommonAlert";
import ProfileTopBar from "@/app/components/ui/ProfileTopBar";
import { colors } from "@/app/lib/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePassword() {
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Alert */}
      <CommonAlert
        visible={showWarning}
        type="warning"
        title="Warning"
        message="Are you sure you want to permanently delete your account? This action cannot be undone."
        cancelText="Cancel"
        confirmText="Confirm"
        onCancel={() => setShowWarning(false)}
        onConfirm={() => {
          setShowWarning(false);
          Alert.alert("Erorr", "No API provided");
        }}
      />
      {/* Header */}
      <ProfileTopBar heading="Account Setting" />

      <Pressable
        onPress={() => router.push("/profile/change-password")}
        style={styles.infoItem}
      >
        <View style={styles.infoItemContainer}>
          <EvilIcons name="lock" size={30} color={colors.primary} />
          <Text style={styles.infoText}>Change Password</Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color={colors.primary}
        />
      </Pressable>

      <Pressable
        style={styles.infoItem}
        onPress={() => {
          setShowWarning(true);
        }}
      >
        <View style={styles.infoItemContainer}>
          <Feather name="user-x" size={24} color="#FF0000" />
          <Text
            style={[
              styles.infoText,
              {
                color: "#FF0000",
              },
            ]}
          >
            Delete Account
          </Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color="#FF0000"
        />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
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
    backgroundColor: "#f7fee7",
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#84cc16",
  },
  infoItem: {
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: "white",
    padding: 12,
    paddingVertical: 18,
    fontSize: 14,
    fontWeight: 400,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#111827",
  },
  infoItemContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
});
