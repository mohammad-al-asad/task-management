import { colors } from "@/app/lib/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ProfileTopBar = ({ heading }: { heading: string }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color="#84cc16"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{heading}</Text>
      </View>
    </View>
  );
};

export default ProfileTopBar;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15, backgroundColor: "transparent" },
  header: {
    backgroundColor: "transparent",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginVertical: 30,
  },
  backBtn: {
    position: "absolute",
    left: 0,
    top: -10,
    width: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    height: 40,
    borderRadius: "100%",
    backgroundColor: colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
});
