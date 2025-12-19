import { colors } from "@/app/lib/colors";
import { RootState } from "@/app/redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const InfoItem = ({ icon, value }: { icon: any; value: string }) => (
  <View style={styles.infoItem}>
    <MaterialCommunityIcons name={icon} size={20} color={colors.primary} />
    <AntDesign
      name="line"
      size={24}
      color={colors.primary}
      style={{
        backgroundColor: colors.primary,
        height: 20,
        width: 2,
      }}
    />
    <Text style={styles.infoText}>{value}</Text>
  </View>
);

export default function MyProfile() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Profile</Text>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.push("/profile/edit-profile")}
        >
          <MaterialCommunityIcons
            name="pencil-outline"
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Avatar */}
      <View style={styles.profileSection}>
        <Image
          source={require("../../../assets/images/icon.png")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.lastName}</Text>
      </View>

      {/* Info */}
      <View style={styles.card}>
        <InfoItem
          icon="account-outline"
          value={user?.firstName + " " + user?.lastName}
        />
        <InfoItem icon="email-outline" value={user?.email!} />
        <InfoItem icon="map-marker-outline" value={user?.address!} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: "100%",
    backgroundColor: colors.inputBackground,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  card: {
    backgroundColor: colors.background,
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 10,
    gap: 14,
  },
  infoItem: {
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "white",
    padding: 12,
    paddingVertical: 18,
    fontSize: 14,
    fontWeight: 400,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#111827",
  },
});
