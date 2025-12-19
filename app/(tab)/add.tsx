import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Loadder from "../components/ui/Loadder";
import ProfileTopBar from "../components/ui/ProfileTopBar";
import { colors } from "../lib/colors";
import { useGetTasksQuery } from "../redux/api/taskApi";

export default function AddTask() {
  const router = useRouter();
  const { refetch } = useGetTasksQuery();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const onSaveTask = async () => {
    try {
      if (!title || !description) throw Error("Fill all the fields");
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const res = await fetch("http://172.252.13.92:8052/task/create-task", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();

      if (result?.status === "Success") {
        await refetch();
        router.push("/(tab)/(home)");
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert("Add task Error", error.message);
    } finally {
      setTitle("");
      setDescription("");
      setLoading(false);
    }
  };
  if (loading) return <Loadder text="Adding Task..." />;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <ProfileTopBar heading="Add Task" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Task Title</Text>
          <TextInput
            mode="outlined"
            textColor="black"
            placeholderTextColor={colors.placeholder}
            placeholder="e.g. Design Landing Page Header"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            outlineStyle={styles.outline}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            textColor="black"
            mode="outlined"
            placeholderTextColor={colors.placeholder}
            placeholder="e.g. Include logo, navigation, and CTA button with brand color"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={[styles.input, styles.textArea]}
            outlineStyle={styles.outline}
          />

          <Button
            mode="contained"
            textColor="white"
            buttonColor="#84cc16"
            style={styles.button}
            onPress={onSaveTask}
            disabled={loading}
          >
            Save Task
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },

  form: {
    gap: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  input: {
    backgroundColor: colors.inputBackground,
  },
  outline: {
    borderRadius: 10,
    borderColor: "#e5e7eb",
  },
  textArea: {
    height: 120,
  },
  button: {
    backgroundColor: colors.primary,
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 3,
  },
});
