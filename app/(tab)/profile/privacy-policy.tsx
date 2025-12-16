import ProfileTopBar from "@/app/components/ui/ProfileTopBar";
import { colors } from "@/app/lib/colors";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ProfileTopBar heading="Terms & Condition" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Privacy Policy – Task Manager App</Text>

        <Text style={styles.paragraph}>
          Your privacy is important to us. This Privacy Policy outlines how the
          Task Manager App handles your information and protects your data.
        </Text>

        <Text style={styles.heading}>1. Information Collection</Text>
        <Text style={styles.paragraph}>
          The Task Manager App may collect limited information such as your
          name, email address, and preferences — strictly for the purpose of
          enhancing your task management experience. We do not collect sensitive
          personal information unnecessarily.
        </Text>

        <Text style={styles.heading}>2. Local Storage</Text>
        <Text style={styles.paragraph}>
          Your tasks, subtasks, and user preferences are securely stored in our
          system or locally on your device (depending on platform settings).
          This data is used solely to support features like scheduling,
          notifications, and customization.
        </Text>

        <Text style={styles.heading}>3. No Tracking</Text>
        <Text style={styles.paragraph}>
          We do not use third-party trackers or intrusive analytics tools. Any
          performance monitoring is anonymized and used internally to improve
          the app experience.
        </Text>

        <Text style={styles.heading}>4. Static Data Display</Text>
        <Text style={styles.paragraph}>
          If the app integrates with external tools (such as calendars or cloud
          storage), those services are governed by their own privacy policies.
        </Text>

        <Text style={styles.heading}>5. Third-Party Services</Text>
        <Text style={styles.paragraph}>
          We apply industry-standard security measures, including encryption,
          secure servers, and routine maintenance, to protect your data.
        </Text>

        <Text style={styles.heading}>6. Data Security</Text>
        <Text style={styles.paragraph}>
          You retain full control over your account data. You may delete or
          export your tasks and personal information at any time.
        </Text>

        <Text style={styles.heading}>7. Policy Updates</Text>
        <Text style={styles.paragraph}>
          This Privacy Policy may be updated periodically. Any changes will be
          clearly communicated within the app. Continued use after updates
          indicates your acceptance of the revised policy.
        </Text>
        <Text
          style={[
            styles.paragraph,
            {
              marginTop: 20,
            },
          ]}
        >
          If you have any questions or concerns regarding privacy, please
          contact us at support@taskmanagerapp.com.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 6,
    color: "#000000",
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.placeholder,
  },
  contact: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "500",
  },
});
