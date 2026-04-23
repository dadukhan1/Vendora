/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";
import toast from "react-hot-toast";

export interface Coupon {
  _id: string;
  code: string;
  validityStartDate: string;
  validityEndDate: string;
  minimumOrderValue: number;
  discountPercentage: number;
}

interface CouponState {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
}

const initialState: CouponState = {
  coupons: [],
  loading: false,
  error: null,
};

const getToken = () => localStorage.getItem("token");

export const createCoupon = createAsyncThunk<
  Coupon,
  Partial<Coupon>,
  { rejectValue: string }
>("/coupons/createCoupon", async (couponData, { rejectWithValue }) => {
  try {
    const response = await api.post("/admin/coupons", couponData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to create coupon",
    );
  }
});

export const getCoupons = createAsyncThunk<
  Coupon[],
  void,
  { rejectValue: string }
>("/coupons/getCoupons", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/admin/coupons/all", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch coupons",
    );
  }
});

export const deleteCoupon = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("/coupons/deleteCoupon", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/admin/coupons/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to delete coupon",
    );
  }
});

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
        state.loading = false;
        state.coupons.push(action.payload);

        toast.success("Coupon created successfully!");
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create coupon";

        toast.error(action.payload || "Failed to create coupon");
      })
      .addCase(getCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch coupons";

        toast.error(action.payload || "Failed to fetch coupons");
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = state.coupons.filter(
          (coupon) => coupon._id !== action.payload,
        );

        toast.success("Coupon deleted successfully!");
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete coupon";

        toast.error(action.payload || "Failed to delete coupon");
      });
  },
});

export default couponSlice.reducer;
