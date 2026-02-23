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
  async ({ jwt, couponCode, apply, orderValue }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/cart/apply-coupon",
        { couponCode },
        {
          params: { apply, couponCode, orderValue },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      const data = response.data;
      console.log("Apply coupon response:", data);
      return data;
    } catch (error) {
      console.error("Error applying coupon:", error);
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
        state.error = action.payload as string;
        state.couponApplied = false;
      });
  },
});

export default couponSlice.reducer;
