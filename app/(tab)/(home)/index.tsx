import Loadder from "@/app/components/ui/Loadder";
import { RootState } from "@/app/redux";
import { useGetTasksQuery } from "@/app/redux/api/taskApi";
import { setUser } from "@/app/redux/slices/authSlice";
import { Task } from "@/app/types/task";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const { isLoading, refetch, isFetching, data: tasks } = useGetTasksQuery();

  useEffect(() => {
    (async () => {
      const user = (await AsyncStorage.getItem("user")) || null;
      if (user) dispatch(setUser(JSON.parse(user)));
    })();
  }, []);

  // Render task item
  const renderTaskItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={styles.taskCard}
      activeOpacity={0.7}
      onPress={() => {
        router.push({
          pathname: "/(tab)/(home)/task-details",
          params: {
            ...item,
          },
        });
      }}
    >
      <Image
        source={require("../../../assets/images/taskBG.png")}
        style={styles.taskBGImage}
        contentFit="cover"
      />

      <View style={styles.taskContent}>
        <Image
          source={require("../../../assets/images/task.png")}
          style={styles.taskImage}
        />

        <View style={styles.taskTextContainer}>
          <Text style={styles.taskTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.taskDesc}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="clipboard-text-outline"
        size={64}
        color="#ccc"
      />
      <Text style={styles.emptyTitle}>No tasks yet</Text>
      <Text style={styles.emptyText}>Add a task to get started</Text>
    </View>
  );

  if (isLoading) return <Loadder text="Loading Tasks..." />;
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/icon.png")}
          style={styles.profileImage}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.greeting}>
            Hello {user?.firstName + " " + user?.lastName}
          </Text>
          <Text style={styles.subtitle}>Welcome to Task Manager</Text>
        </View>
      </View>

      <Text style={styles.pageTitle}>My Tasks</Text>

      {/* Task List */}
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshing={isFetching}
        onRefresh={refetch}
        ListEmptyComponent={renderEmptyList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafbf9",
  },
  header: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "600",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  taskCard: {
    borderWidth: 1,
    borderColor: "white",
    position: "relative",
    borderRadius: 12,
    padding: 16,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 8,
    overflow: "hidden",
  },
  taskBGImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  taskContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    gap: 16,
    paddingHorizontal: 5,
  },
  taskTextContainer: {
    flex: 1,
    gap: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  taskDesc: {
    fontSize: 14,
    color: "#6b7280",
  },
  separator: {
    height: 8,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6b7280",
  },
  emptyText: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 6,
  },
  taskImage: {
    width: 26,
    height: 26,
  },
});
