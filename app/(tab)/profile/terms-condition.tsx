// app/terms-conditions.tsx
import ProfileTopBar from "@/app/components/ui/ProfileTopBar";
import { colors } from "@/app/lib/colors";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermsConditionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileTopBar heading="Terms & Conditions" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Terms & Conditions</Text>
        <Text style={styles.paragraph}>
          Welcome to the Task Manager App. By accessing or using this
          application, you agree to the following terms and conditions:
        </Text>

        <Text style={styles.heading}>1. Use of the App</Text>
        <Text style={styles.paragraph}>
          This app is designed to help users create, manage, and track tasks.
          You agree to use it responsibly and only for lawful purposes.
        </Text>

        <Text style={styles.heading}>2. Accuracy of Information</Text>
        <Text style={styles.paragraph}>
          While we strive to ensure accurate task management, the app is not
          responsible for missed deadlines, incorrect entries, or user errors.
        </Text>

        <Text style={styles.heading}>3. User Responsibility</Text>
        <Text style={styles.paragraph}>
          Users are solely responsible for managing tasks and any outcomes
          related to task completion or non-completion.
        </Text>

        <Text style={styles.heading}>4. Data Collection</Text>
        <Text style={styles.paragraph}>
          We may collect limited personal data (such as name, email, and usage
          patterns) to improve user experience. No data is shared without
          consent.
        </Text>

        <Text style={styles.heading}>5. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          We are not liable for any productivity loss, missed deadlines, or
          damages arising from app usage.
        </Text>

        <Text style={styles.heading}>6. Third-Party Links</Text>
        <Text style={styles.paragraph}>
          If the app connects to third-party services, their terms and policies
          apply. We are not responsible for their availability or practices.
        </Text>

        <Text style={styles.heading}>7. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          These Terms & Conditions may be updated at any time. Continued use of
          the app constitutes acceptance of the revised terms.
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
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  heading: {
    color:"black",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.placeholder,
  },
});
