import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAxios } from "../axious-config";
import SetAuthToken, { makeAuthData } from "../utils/setTokent";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  error: {},
  successMessage : "",
  response: {},
  recentViews: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await authAxios.post(`/auth/member-login`, {
        email,
        password,
      });
      let data = await response.data;

      makeAuthData(data);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      first_name,
      last_name,
      email,
      primary_phone,
      country_code,
      company_name,
      type,
      primary_phone_code,
      country_id,
    },
    thunkAPI
  ) => {
    try {
      const response = await authAxios.post(`/auth/member-registration`, {
        first_name,
        last_name,
        email,
        primary_phone,
        company_name,
        type,
        country_code,
        primary_phone_code,
        country_id,
      });

      let data = await response.data;
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authData");
      state.loading = false;
      state.user = {};
      state.isAuthenticated = false;
      state.error = {};
      state.token = undefined;
      SetAuthToken(false);
      
    },
    setUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.loading = false;
      state.error = {};
      state.token = action.payload.access_token;
      state.successMessage = "Login Successfully";
    },
    setErrorSuccess(state, action) {
      state.error = {};
      state.response = {};
    },
    setResponseSuccess(state, action) {
      state.response = {};
    },
    clearErroState (state) {
      state.error = {};
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        authSlice.caseReducers.setUser(state, action);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
        state.user = {};
        state.loading = false;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.response = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser, setErrorSuccess, setResponseSuccess, clearErroState } =
  authSlice.actions;

export const userSelector = (state) => state.user;

export default authSlice.reducer;
