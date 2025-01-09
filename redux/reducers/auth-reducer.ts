import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout } from "../services/auth";
import { RootState } from "../app/store";

const initialState: any = {
  user: "",
  token: "",
  isAuthenticated: false,
  onBoarding: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuthenticated = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    resetAuth(state) {
      authSessionClear(state);
    },
    setOnboarding(state, action: PayloadAction<boolean>) {
      state.onBoarding = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(login.matchFulfilled, (state, action) => {
      state.token = action.payload.data.accessToken;
      state.isAuthenticated = true;
      state.user = action.payload.data.refreshToken;
      state.turmobToken = true;

    });
    builder.addMatcher(logout.matchFulfilled, (state, action) => {
      state.user = "";
      state.token = "";
      state.isAuthenticated = false;
      state.turmobToken = false;
    });
  },
});

function authSessionClear(state: any) {
  state.user = "";
  state.token = "";
  state.isAuthenticated = false;
}

export const { setAuth, setToken, setUser, resetAuth, setOnboarding } =
  authSlice.actions;

export const selectUserCredentials = (state: RootState) => state.auth;

export const selectToken = (state: RootState) => state.auth.token;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectOnBoarding = (state: RootState) => state.auth.onBoarding;

export default authSlice.reducer;
