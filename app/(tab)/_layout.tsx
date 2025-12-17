import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import React from "react";
import { StyleSheet } from "react-native";
import TabButton from "../components/ui/TabButton";

export default function RootLayout() {
  return (
    <Tabs
      options={{
        initialRouteName: "(home)",
      }}
    >
      <TabSlot />

      <TabList style={styles.tabBar}>
        {/* My Tasks */}
        <TabTrigger name="(home)" href={"/(tab)/(home)" as any} asChild>
          <TabButton icon="home">Home</TabButton>
        </TabTrigger>

        {/* Add Task */}
        <TabTrigger name="add" href="/add" asChild>
          <TabButton icon="plus">Add</TabButton>
        </TabTrigger>

        {/* Profile */}
        <TabTrigger name="profile" href="/profile" asChild>
          <TabButton icon="user">Profile</TabButton>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 84,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
});
