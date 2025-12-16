import ProfileTopBar from "@/app/components/ui/ProfileTopBar";
import { colors } from "@/app/lib/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePassword() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
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

      <Pressable style={styles.infoItem} onPress={() => {}}>
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
    marginHorizontal:15,
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
