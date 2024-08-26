import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  // Initial State
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
  },

  // Reducers
  reducers: {
    // Login
    loginAction: (state, action) => {
      state.user = action.payload;
    },

    // Logout
    logoutAction: (state) => {
      localStorage.removeItem("userInfo");
      state.user = null;
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
