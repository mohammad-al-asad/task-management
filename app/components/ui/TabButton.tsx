import { colors } from "@/app/lib/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { TabTriggerSlotProps } from "expo-router/ui";
import React, { ComponentProps, Ref, useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

type Icon = ComponentProps<typeof FontAwesome5>["name"];

export type TabButtonProps = TabTriggerSlotProps & {
  icon?: Icon;
  ref?: Ref<View>;
};

export default function TabButton({
  icon,
  children,
  isFocused,
  ...props
}: TabButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isFocused ? 1.15 : 1,
        useNativeDriver: true,
        friction: 6,
      }),
      Animated.spring(translateY, {
        toValue: isFocused ? -24 : 0,
        useNativeDriver: true,
        friction: 6,
      }),
    ]).start();
  }, [isFocused]);

  return (
    <Pressable {...props} style={styles.pressable}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale }, { translateY }],
          },
          isFocused && styles.focusedContainer,
        ]}
      >
        <View
          style={[styles.iconWrapper, isFocused && styles.focusedIconWrapper]}
        >
          <FontAwesome5
            name={icon}
            size={22}
            color={isFocused ? "#fff" : "#000"}
          />
        </View>

        {!isFocused && <Text style={styles.label}>{children}</Text>}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    alignItems: "center",
  },

  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  focusedContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12, // Android shadow
  },

  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  focusedIconWrapper: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: colors.primary,
    borderColor: "white",
    borderWidth: 6,
  },

  label: {
    marginTop: 6,
    fontSize: 14,
  },
});
