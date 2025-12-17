import ProfileTopBar from "@/app/components/ui/ProfileTopBar";
import { colors } from "@/app/lib/colors";
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

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const onUpdateTask = () => {
    if (!title && !description) {
      Alert.alert("Empty field", "Atleast one field must be filled");
      return;
    }

    console.log("here");
    Alert.alert("No Api", "No API provided");
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <ProfileTopBar heading="Edit Task" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Task Title</Text>
          <TextInput
            textColor="black"
            mode="outlined"
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
          textColor="white"
            mode="contained"
            buttonColor={colors.primary}
            style={styles.button}
            onPress={onUpdateTask}
            disabled={loading}
          >
            Update Task
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
