import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Foydalanuvchi interfeysi
interface User {
  username: string;
  email: string;
}

// Auth uchun dastlabki holat
interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

// sessionStorage'dan token va foydalanuvchi ma'lumotlarini olish
const token = sessionStorage.getItem("token");
const user = sessionStorage.getItem("user")
  ? JSON.parse(sessionStorage.getItem("user") as string)
  : null;

const initialState: AuthState = {
  token: token || null,
  user: user,
  isAuthenticated: !!token && !!user,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      // sessionStorage'ga token va foydalanuvchini saqlash
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      // sessionStorage'dan token va foydalanuvchini o'chirish
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
