/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

const initialState = {
  otpSent: false,
  jwt: null,
  loading: false,
  error: null as string | null,
};

export const sendLoginOtp = createAsyncThunk<any, any>(
  "seller/sendLoginOtp",
  async (values, { rejectWithValue }) => {
    try {
      const { email } = values;
      const response = await api.post("/auth/sent/login-signup-otp", { email });
      const data = response.data;
      console.log("OTP sent successfully:", data);
      return data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      return rejectWithValue("Failed to send OTP. Please try again.");
    }
  },
);
export const verifyLogin = createAsyncThunk<any, any>(
  "seller/verifyLoginOtp",
  async ({ email, otp  }, { rejectWithValue }) => {
    try {
      // const { email, otp } = values;
      const response = await api.post("/seller/verify/login-otp", {
        email,
        otp,
      });
      const data = response.data;
      localStorage.setItem("token", data.jwt);
      console.log("OTP sent successfully:", data);
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

      const { mobile, GSTIN, pickupAddress, bankDetails, bussinessDetails } =
        values;
        console.log('hahahahahahahah')
      const response = await api.post("/seller", {
        sellerName: bussinessDetails.sellerName,
        email: bussinessDetails.bussinessEmail,
        mobile,
        GSTIN,
        pickupAddress,
        bankDetails,
        bussinessDetails,
        password: bussinessDetails.password,
      });
      const data = response;
      console.log("Seller Signup successful:", data);
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
      .addCase(sendLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendLoginOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerAthSlice.reducer;
export const { resetSellerState } = sellerAthSlice.actions;
