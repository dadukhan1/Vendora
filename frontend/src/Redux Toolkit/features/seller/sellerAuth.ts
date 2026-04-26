/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";
import toast from "react-hot-toast";

const initialState = {
  otpSent: false,
  jwt: null,
  loading: false,
  error: null as string | null,
};

export const sendSigninOtp = createAsyncThunk<any, any>(
  "seller/sendSigninOtp",
  async (values, { rejectWithValue }) => {
    try {
      const { email } = values;
      const response = await api.post("/auth/sent/signin-signup-otp", { email });
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      return rejectWithValue("Failed to send OTP. Please try again.");
    }
  },
);
export const verifySignin = createAsyncThunk<any, any>(
  "seller/verifySigninOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      // const { email, otp } = values;
      const response = await api.post("/seller/verify/signin-otp", {
        email,
        otp,
      });
      const data = response.data;
      localStorage.setItem("token", data.jwt);
      return data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      return rejectWithValue("Failed to send OTP. Please try again.");
    }
  },
);

export const signup = createAsyncThunk<any, any>(
  "seller/signup",
  async (values, { rejectWithValue }) => {
    try {
      console.log(values);
      const {
        sellerName,
        mobile,
        GSTIN,
        pickupAddress,
        bankDetails,
        businessDetails,
        password,
      } = values;
      const response = await api.post("/seller", {
        sellerName,
        email: businessDetails.businessEmail,
        mobile,
        GSTIN,
        pickupAddress,
        bankDetails,
        businessDetails,
        password,
      });
      const data = response;
      return data;
    } catch (error) {
      console.error("Error during seller signup:", error);
      return rejectWithValue("Failed to sign up. Please try again.");
    }
  },
);

const sellerAthSlice = createSlice({
  name: "sellerAuth",
  initialState,
  reducers: {
    resetSellerState: (state) => {
      state.otpSent = false;
      state.jwt = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendSigninOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendSigninOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
        toast.success("OTP sent to your email. Please check and enter it.");
      })
      .addCase(sendSigninOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Failed to send OTP. Please try again.");
      });

    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        toast.success("Signup successful! You can now log in.");
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Failed to sign up. Please try again.");
      })
      .addCase(verifySignin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySignin.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        toast.success("Signin successful!");
      })
      .addCase(verifySignin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Failed to verify OTP. Please try again.");
      });
  },
});

export default sellerAthSlice.reducer;
export const { resetSellerState } = sellerAthSlice.actions;
