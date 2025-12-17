import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/user";

const authContext = createContext<{
  user: User | null;
  refetchUser: null | (() => void);
  removeUser: null | (() => void);
}>({ user: null, refetchUser: null, removeUser: null });
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedData = await JSON.parse(storedData as string);
    setUser(parsedData);
  };

  const removeUser = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <authContext.Provider value={{ user, refetchUser: getUser, removeUser }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export default AuthContextProvider;
