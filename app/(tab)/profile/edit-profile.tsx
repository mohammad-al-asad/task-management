import ProfileTopBar from "@/app/components/ui/ProfileTopBar";
import { useAuth } from "@/app/contexts/AuthContextProvider";
import { colors } from "@/app/lib/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfile() {
  const router = useRouter();
  const { refetchUser } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const updateUser = async () => {
    if (firstName || lastName || address || email) {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        const formData = new FormData();
        if (firstName) formData.append("firstName", firstName);
        if (lastName) formData.append("lastName", lastName);
        if (address) formData.append("address", address);
        if (email) formData.append("email", email);

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
          throw new Error(result?.message || "Profile update failed");
        }
        await AsyncStorage.setItem("user", JSON.stringify(result.data));
        refetchUser!();
        router.replace("/profile/my-profile");
      } catch (error: any) {
        Alert.alert("Profile update Error", error.message);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Error", "At least one field is required");
      return;
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <ProfileTopBar heading="Edit Profile" />

      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <Image
          source={require("../../../assets/images/icon.png")}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.cameraBtn}>
          <MaterialCommunityIcons
            name="camera-outline"
            size={18}
            color="#000000"
          />
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          textColor="black"
          mode="outlined"
          placeholderTextColor={colors.placeholder}
          placeholder="e.g. Kristin"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          textColor="black"
          mode="outlined"
          placeholderTextColor={colors.placeholder}
          placeholder="e.g. Cooper"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          textColor="black"
          mode="outlined"
          placeholderTextColor={colors.placeholder}
          placeholder="e.g. kristin.cooper@example.com"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          textColor="black"
          mode="outlined"
          placeholderTextColor={colors.placeholder}
          placeholder="e.g. 1234 Elm Street, Springfield, IL"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />

        <Button
        textColor="white"
          mode="contained"
          style={styles.button}
          disabled={loading}
          onPress={updateUser}
        >
          Update
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  avatarWrapper: {
    position: "relative",
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraBtn: {
    position: "absolute",
    bottom: 8,
    right: 142,
    backgroundColor: "white",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "#f7fee7",
    height: 50,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#84cc16",
  },
});
