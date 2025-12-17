import { colors } from "@/app/lib/colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

type AlertType = "warning" | "success";

type CommonAlertProps = {
  visible: boolean;
  type: AlertType;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

export default function CommonAlert({
  visible,
  type,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText = "Cancel",
}: CommonAlertProps) {
  const isWarning = type === "warning";

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onCancel}
        style={{
          backgroundColor: "white",
          borderRadius: 6,
        }}
      >
        <View style={styles.iconContainer}>
          {type === "warning" && (
            <MaterialIcons name="warning-amber" size={60} color="#facc15" />
          )}
        </View>

        <Dialog.Title style={styles.title}>{title}</Dialog.Title>

        <Dialog.Content>
          <Text style={styles.message}>{message}</Text>
        </Dialog.Content>

        <Dialog.Actions style={styles.actions}>
          {isWarning && onCancel && (
            <Button
              onPress={onCancel}
              textColor={colors.primary}
              style={{
                borderRadius: 4,
                paddingHorizontal: 20,
                borderWidth: 1,
                borderColor: colors.primary,
              }}
            >
              {cancelText}
            </Button>
          )}

          <Button
            mode="contained"
            style={{
              borderRadius: 4,
              paddingHorizontal: 20,
            }}
            textColor="white"
            buttonColor={colors.primary}
            onPress={onConfirm}
          >
            {confirmText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    color: "black",
  },
  message: {
    textAlign: "center",
    color: "black",
  },
  actions: {
    justifyContent: "center",
    paddingBottom: 16,
    gap: 8,
  },
});
