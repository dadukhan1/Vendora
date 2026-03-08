/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";
import toast from "react-hot-toast";

export const createCoupon = createAsyncThunk<any, any>(
  "/coupons/createCoupon",
  async (couponData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/admin/coupons", couponData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getCoupons = createAsyncThunk<any>(
  "/coupons/getCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/coupons/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteCoupon = createAsyncThunk<any, string>(
  "/coupons/deleteCoupon",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/coupons/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  coupons: [],
  loading: false,
  error: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.coupons.push(action.payload);
        state.loading = false;
        toast.success("Coupon created successfully!");
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(
          action.payload?.response?.data?.message || "Failed to create coupon",
        );
      })
      .addCase(getCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.coupons = action.payload;
        state.loading = false;
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(
          action.payload?.response?.data?.message || "Failed to fetch coupons",
        );
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter(
          (coupon) => coupon.id !== action.payload.id,
        );
        state.loading = false;
        toast.success("Coupon deleted successfully!");
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(
          action.payload?.response?.data?.message || "Failed to delete coupon",
        );
      });
  },
});

export default couponSlice.reducer;
