import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _get, _post, _put } from "../shared/api";
import { apiRoutes } from "../shared/routes";

const TOKEN_KEY = process.env.NEXT_PUBLIC_LOCAL_STORAGE_TOKEN_NAME || "uno_user_token";
const USER_KEY  = process.env.NEXT_PUBLIC_LOCAL_STORAGE_USER_NAME  || "uno_user_profile";

const loadStoredAuth = () => {
  if (typeof window === "undefined") return { user: null, token: null };
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const user  = JSON.parse(localStorage.getItem(USER_KEY) || "null");
    return { user, token };
  } catch {
    return { user: null, token: null };
  }
};

const saveAuth = (user, token) => {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (user)  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const clearAuth = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const { user: storedUser, token: storedToken } = loadStoredAuth();

export const handleLogin = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const res = await _post(apiRoutes.auth_login, credentials);
    return res.data?.data;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || "Login failed");
  }
});

export const handleRegister = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await _post(apiRoutes.auth_register, data);
    return res.data?.data;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || "Registration failed");
  }
});

export const handleGetMe = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  try {
    const res = await _get(apiRoutes.auth_me);
    return res.data?.data;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || "Failed to fetch profile");
  }
});

export const handleUpdateMe = createAsyncThunk("auth/updateMe", async (data, { rejectWithValue }) => {
  try {
    const res = await _put(apiRoutes.auth_me, data);
    return res.data?.data;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || "Update failed");
  }
});

const { user: initUser, token: initToken } = loadStoredAuth();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:    initUser,
    token:   initToken,
    loading: false,
    error:   null,
  },
  reducers: {
    setAuthFromBooking: (state, action) => {
      const { user, token } = action.payload;
      state.user  = user;
      state.token = token;
      saveAuth(user, token);
    },
    logout: (state) => {
      state.user  = null;
      state.token = null;
      state.error = null;
      clearAuth();
    },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    const handlePending   = (state) => { state.loading = true;  state.error = null; };
    const handleRejected  = (state, a) => { state.loading = false; state.error = a.payload; };
    const handleAuthFulfilled = (state, action) => {
      state.loading = false;
      const { accessToken, refreshToken, ...user } = action.payload ?? {};
      state.user  = user;
      state.token = accessToken ?? null;
      saveAuth(user, accessToken);
    };

    builder
      .addCase(handleLogin.pending,    handlePending)
      .addCase(handleLogin.fulfilled,  handleAuthFulfilled)
      .addCase(handleLogin.rejected,   handleRejected)

      .addCase(handleRegister.pending,   handlePending)
      .addCase(handleRegister.fulfilled, handleAuthFulfilled)
      .addCase(handleRegister.rejected,  handleRejected)

      .addCase(handleGetMe.fulfilled, (state, action) => {
        state.user = action.payload;
        saveAuth(action.payload, state.token);
      })

      .addCase(handleUpdateMe.pending,  handlePending)
      .addCase(handleUpdateMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        saveAuth(action.payload, state.token);
      })
      .addCase(handleUpdateMe.rejected, handleRejected);
  },
});

export const { setAuthFromBooking, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
