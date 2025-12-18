import { colors } from "@/app/lib/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loadder = ({ text }: { text: string }) => {
  return (
    <View style={[styles.container, styles.loadingContainer]}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loadingText}>{text}</Text>
    </View>
  );
};

export default Loadder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafbf9",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6b7280",
  },
});
