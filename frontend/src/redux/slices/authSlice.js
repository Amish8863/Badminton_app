import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const tokenFromStorage = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")
  : null;

const initialState = {
  user: userFromStorage,
  accessToken: tokenFromStorage,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;

            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("accessToken", action.payload.accessToken);
        },
        logout: (state) => {
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        }

    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;