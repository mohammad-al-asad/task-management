import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
