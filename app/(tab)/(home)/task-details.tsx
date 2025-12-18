import Loadder from "@/app/components/ui/Loadder";
import ProfileTopBar from "@/app/components/ui/ProfileTopBar";
import { useTask } from "@/app/contexts/TaskProvider";
import { colors } from "@/app/lib/colors";
import { Task } from "@/app/types/task";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaskDetails() {
  const { title, description, _id } = useLocalSearchParams<Task>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { getTasks } = useTask();

  const onDelete = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(
        `http://172.252.13.92:8052/task/delete-task/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await res.json();

      if (result?.status === "Success") {
        await getTasks!();
        router.replace("/(tab)" as any);
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert("Add task Error", error.message);
    } finally {
      setLoading(false);
    }
  };
  const onEdit = () => {
    router.push("/edit-task");
  };

  if (loading) return <Loadder text="Deleting Task..." />;

  return (
    <SafeAreaView>
      {/* Header */}
      <ProfileTopBar heading="Tasks Details" />
      <View style={styles.card}>
        {/* Task Title */}
        <View style={styles.section}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={22}
              color={COLORS.green}
            />
            <Text style={styles.heading}>Task Title</Text>
          </View>
          <Text style={styles.value}>{title}</Text>
        </View>

        <View style={styles.divider} />

        {/* Task Description */}
        <View style={styles.section}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="text-box-outline"
              size={22}
              color={COLORS.green}
            />
            <Text style={styles.heading}>Task Description</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>

        <View style={styles.divider} />

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            disabled={loading}
            mode="outlined"
            icon="delete-outline"
            textColor={COLORS.red}
            style={[styles.button, styles.deleteBtn]}
            onPress={onDelete}
          >
            Delete Task
          </Button>

          <Button
            disabled={loading}
            mode="outlined"
            icon="pencil-outline"
            textColor={COLORS.green}
            style={[styles.button, styles.editBtn]}
            onPress={onEdit}
          >
            Edit Task
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const COLORS = {
  green: colors.primary,
  red: "#E57373",
  borderGreen: "#C5E1A5",
  borderRed: "#F5C6C6",
  textDark: "#333",
  textMuted: "#666",
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 17,
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  section: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  heading: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  value: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginLeft: 30,
  },
  description: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginLeft: 30,
    lineHeight: 20,
  },
  divider: {
    height: 0.8,
    backgroundColor: colors.primary,
    marginVertical: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 3,
  },
  button: {
    flex: 1,
    borderRadius: 10,
  },
  deleteBtn: {
    borderColor: COLORS.borderRed,
    backgroundColor: "#FEF2F2",
  },
  editBtn: {
    borderColor: COLORS.borderGreen,
    backgroundColor: colors.inputBackground,
  },
});
