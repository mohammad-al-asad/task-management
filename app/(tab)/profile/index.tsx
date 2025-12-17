import CommonAlert from "@/app/components/ui/CommonAlert";
import MenuItem from "@/app/components/ui/ProfileMenu";
import { useAuth } from "@/app/contexts/AuthContextProvider";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();
  const { removeUser } = useAuth();
  const [showWarning, setShowWarning] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Alert */}
      <CommonAlert
        visible={showWarning}
        type="warning"
        title="Warning"
        message="Are you sure you want to Log Out?"
        cancelText="Cancel"
        confirmText="Confirm"
        onCancel={() => setShowWarning(false)}
        onConfirm={() => {
          setShowWarning(false);
          removeUser!();
          router.replace("/auth");
        }}
      />

      {/* Header Background */}
      <Image
        style={styles.headerIMG}
        contentFit="contain"
        source={require("../../../assets/images/ellipse.png")}
      />

      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <Image
          source={require("../../../assets/images/icon.png")}
          style={styles.avatar}
        />
      </View>

      {/* Menu */}
      <View style={styles.card}>
        <MenuItem
          icon="account-outline"
          label="My Profile"
          onPress={() => router.push("/profile/my-profile")}
        />
        <MenuItem
          icon="cog-outline"
          label="Account Setting"
          onPress={() => router.push("/profile/account-setting")}
        />
      </View>

      <Text style={styles.sectionTitle}>More</Text>

      <View style={styles.card}>
        <MenuItem
          icon="file-document-outline"
          label="Terms & Condition"
          onPress={() => router.push("/profile/terms-condition")}
        />
        <MenuItem
          icon="shield-lock-outline"
          label="Privacy policy"
          onPress={() => router.push("/profile/privacy-policy")}
        />
        <MenuItem
          icon="help-circle-outline"
          label="Help/Support"
          onPress={() => router.push("/profile/help-support")}
        />
        <MenuItem
          icon="logout"
          label="Log Out"
          onPress={() => setShowWarning(true)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  headerIMG: {
    height: 200,
  },
  avatarWrapper: {
    alignItems: "center",
    marginTop: -50,
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 14,
    paddingVertical: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  sectionTitle: {
    marginHorizontal: 22,
    marginBottom: 10,
    color: "#6b7280",
    fontSize: 14,
    fontWeight: "500",
  },
});
