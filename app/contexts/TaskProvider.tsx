import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Task } from "../types/task";

const taskContext = createContext<{
  tasks: Task[] | null;
  getTasks: null | (() => Promise<void>);
  refreshing: boolean;
  loading: boolean;
}>({ tasks: null, getTasks: null, refreshing: false, loading: false });

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://172.252.13.92:8052/task/get-all-task";

  const getTasks = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (result?.status === "Success") {
        setTasks(result.data.myTasks);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setTasks([]);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <taskContext.Provider value={{ tasks, getTasks, refreshing, loading }}>
      {children}
    </taskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(taskContext);
  return context;
};

export default AuthContextProvider;
