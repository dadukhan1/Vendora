/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";
import { toast } from "react-hot-toast";

const initialState = {
  reviews: [] as any[],
  loading: false,
  error: null as string | null,
  canReview: false,
  alreadyReviewed: false,
};

const getToken = () => localStorage.getItem("token");

export const fetchReviewsByProduct = createAsyncThunk<any, string>(
  "review/fetchReviewsByProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/reviews/product/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch reviews");
    }
  }
);

export const createReview = createAsyncThunk<any, { productId: string, reviewData: any }>(
  "review/createReview",
  async ({ productId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/reviews/product/${productId}`, reviewData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to submit review");
    }
  }
);
export const checkUserPurchase = createAsyncThunk<any, string>(
  "review/checkUserPurchase",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/reviews/product/${productId}/check-purchase`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data; // Now returns { canReview, hasPurchased, alreadyReviewed }
    } catch (error: any) {
      return rejectWithValue({ canReview: false, alreadyReviewed: false });
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsByProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsByProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.unshift(action.payload);
        toast.success("Review submitted successfully!");
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Failed to submit review");
      })
      .addCase(checkUserPurchase.fulfilled, (state, action) => {
        state.canReview = action.payload.canReview;
        state.alreadyReviewed = action.payload.alreadyReviewed;
      })
      .addCase(checkUserPurchase.rejected, (state) => {
        state.canReview = false;
        state.alreadyReviewed = false;
      });
  },
});

export default reviewSlice.reducer;
