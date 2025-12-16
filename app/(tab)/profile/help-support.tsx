import ProfileTopBar from "@/app/components/ui/ProfileTopBar";
import { colors } from "@/app/lib/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Enable animation on Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type FAQItemProps = {
  question: string;
  answer: string;
};

function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={toggle} style={styles.row}>
        <Text style={styles.question}>{question}</Text>
        {open ? (
          <FontAwesome
            name="chevron-down"
            size={15}
            style={{
              paddingHorizontal: 10,
            }}
            color="black"
          />
        ) : (
          <FontAwesome
            name="chevron-right"
            size={15}
            style={{
              paddingHorizontal: 10,
            }}
            color="black"
          />
        )}
      </TouchableOpacity>

      {open && (
        <>
          <View
            style={{
              height: 1,
              backgroundColor: "#64748B",
              marginVertical: 4,
            }}
          />
          <Text style={styles.answer}>{answer}</Text>
        </>
      )}
    </View>
  );
}

export default function FAQScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileTopBar heading="Help/Support" />
      <Text
        style={{
          paddingHorizontal: 20,
          fontWeight: 500,
          fontSize: 16,
        }}
      >
        FAQ
      </Text>
      <ScrollView contentContainerStyle={styles.content}>
        <FAQItem
          question="How do I create a new task?"
          answer='Tap the "Add Task" button on the navigation bar. Fill in the task title, due date, priority, and other details — then tap "Save".'
        />

        <FAQItem
          question="How can I view task details?"
          answer="Tap on any task from the task list to view its full details, including notes, due date, and priority."
        />

        <FAQItem
          question="Can I mark a task as favorite or important?"
          answer="Yes. You can mark tasks as favorite or important using the star or priority option inside the task details screen."
        />

        <FAQItem
          question="How do I edit or delete a task?"
          answer="Open the task details and use the Edit or Delete option available in the menu."
        />

        <FAQItem
          question="Is my data secure?"
          answer="Yes. Your data is stored securely and is never shared with third parties without your consent."
        />

        {/* Help Card */}
        <View style={styles.helpCard}>
          <Text style={styles.helpTitle}>Need More Help?</Text>

          <View style={styles.helpRow}>
            <Text style={styles.helpIcon}>💬</Text>
            <View>
              <Text style={styles.helpText}>
                Mail Us:{" "}
                <Text style={styles.helpEmail}>
                  (support@taskmanagerapp.com)
                </Text>
              </Text>

              <Text style={styles.helpDesc}>
                Our help desk is available 24/7 to support your workflow.
              </Text>
            </View>
          </View>
        </View>
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

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 12,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  question: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
    paddingHorizontal: 14,
    flex: 1,
  },

  arrow: {
    fontSize: 25,
    color: colors.primary,
    marginLeft: 10,
  },

  answer: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
    paddingHorizontal: 14,
    color: "#555",
  },

  helpCard: {
    marginTop: 20,
    backgroundColor: "#ffff",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },

  helpTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },

  helpRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  helpIcon: {
    fontSize: 24,
    marginRight: 12,
  },

  helpText: {
    fontSize: 14,
    fontWeight: "500",
  },

  helpEmail: {
    fontSize: 12,
    fontWeight: "500",
    color: "#7CB518",
    marginVertical: 2,
  },

  helpDesc: {
    marginTop:5,
    fontSize: 12,
    color: "#666",
    maxWidth: 240,
    fontWeight: "400",
  },
});
