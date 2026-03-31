/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

const initialState = {
  coupons: [],
  cart: null,
  loading: false,
  error: null as string | null,
  couponCreate: false,
  couponApplied: false,
};

export const applyCoupon = createAsyncThunk<any, any>(
  "coupon/applyCoupon",
  async ({ couponCode, cartTotal }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/coupons/apply",
        { couponCode, cartTotal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.couponApplied = true;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.couponApplied = false;
        let errorMsg = "Failed to apply coupon";
        if (action.payload && typeof action.payload === "object" && (action.payload as any).response?.data?.message) {
          errorMsg = (action.payload as any).response.data.message;
        } else if (typeof action.payload === "string") {
          errorMsg = action.payload;
        }
        state.error = errorMsg;
      });
  },
});

export default couponSlice.reducer;
