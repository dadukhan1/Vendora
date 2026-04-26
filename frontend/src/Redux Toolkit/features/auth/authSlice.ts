/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";
import toast from "react-hot-toast";

const API_URL = "/auth";

const initialState = {
  jwt: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  loading: false,
  error: null as string | null,
  otpSent: false,
};

export const sendSigninSignupOTP = createAsyncThunk<
  { message: string },
  { email: string },
  { rejectValue: string }
>("/auth/sendSigninSignupOTP", async ({ email }, { rejectWithValue }) => {
  try {
    const response = await api.post(`${API_URL}/sent/signin-signup-otp`, {
      email,
    });

    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Failed to send OTP";
    return rejectWithValue(message);
  }
});

export const signup = createAsyncThunk<any, any>(
  "/auth/signup",
  async (signupRequest, { rejectWithValue }) => {
    try {
      const { fullName, email, otp } = signupRequest;
      const response = await api.post(`${API_URL}/signup`, {
        fullName,
        email,
        otp,
      });
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("role", response.data.role);
      return response.data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      return rejectWithValue(error || "An error occurred while sending OTP");
    }
  },
);

export const signin = createAsyncThunk<any, any>(
  "/auth/signin",
  async (signinRequest, { rejectWithValue }) => {
    try {
      const { email, otp } = signinRequest;
      const response = await api.post(`${API_URL}/signin`, {
        email,
        otp,
      });
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("role", response.data.role);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error signing in:", error);
      return rejectWithValue(error || "An error occurred while signing in");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      state.jwt = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendSigninSignupOTP.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(sendSigninSignupOTP.fulfilled, (state) => {
      state.loading = false;
      state.otpSent = true;
      toast.success("OTP sent to your email");
    });

    builder.addCase(sendSigninSignupOTP.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error("OTP sending failed: " + state.error);
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.jwt = action.payload.jwt;
      state.role = action.payload.role;
      state.otpSent = false;
      toast.success("Signup successful");
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error("Signup failed: " + state.error);
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      state.jwt = action.payload.jwt;
      state.role = action.payload.role;
      state.otpSent = false;
      toast.success("Signin successful");
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error("Signup failed: " + state.error);
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
