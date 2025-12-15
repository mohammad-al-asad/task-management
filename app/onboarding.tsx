import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "./lib/colors";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Manage Everything in One Place",
    description:
      "Create, categorize, and keep track of all your personal and work tasks effortlessly — right from your dashboard.",
    image: require("../assets/onboarding1.png"),
  },
  {
    id: "2",
    title: "Focus on What Matters Most",
    description:
      "Set priorities, add deadlines, and sort tasks by importance so you can tackle what truly moves you forward.",
    image: require("../assets/onboarding2.png"),
  },
  {
    id: "3",
    title: "Visualize Progress, Stay on Track",
    description:
      "Monitor completed tasks, ongoing projects, and upcoming deadlines — all in a clear, visual format.",
    image: require("../assets/onboarding3.png"),
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  const onNext = () => {
    if (index < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      router.replace("/auth" as any);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.bar}>
          <Pressable
            style={styles.skip}
            onPress={() => router.replace("/auth" as any)}
          >
            <Ionicons name="arrow-back" size={24} color="#84cc16" />
          </Pressable>
          <Pressable
            style={styles.skip}
            onPress={() => router.replace("/auth" as any)}
          >
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        </View>

        <FlatList
          ref={flatListRef}
          data={slides}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
            setIndex(newIndex);
          }}
          renderItem={({ item }) => (
            <View style={[styles.slide, { width }]}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
            </View>
          )}
        />

        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, index === i && styles.activeDot]}
            />
          ))}
        </View>

        <Pressable style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>
            {index === slides.length - 1 ? "Continue" : "Next"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  slide: { alignItems: "center", paddingHorizontal: 24 },
  image: { width: 260, height: 260, resizeMode: "contain" },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 40,
    textAlign: "center",
  },
  desc: {
    fontSize: 14,
    color: colors.secondaryText,
    textAlign: "center",
    marginTop: 12,
  },
  dots: { flexDirection: "row", justifyContent: "center", marginBottom: 200 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d1d5db",
    marginHorizontal: 4,
  },
  activeDot: { backgroundColor: "#84cc16", width: 28 },
  button: {
    backgroundColor: "#84cc16",
    margin: 24,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  skip: { zIndex: 10 },
  skipText: { color: "#84cc16", fontSize: 14 },
  bar: {
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: 30,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
