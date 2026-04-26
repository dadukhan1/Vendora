/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

const initialState = {
  wishlist: null as any,
  loading: false,
  error: null as string | null,
};

const getToken = () => localStorage.getItem("token");

export const getWishlist = createAsyncThunk<any, void>(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/wishlist", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch wishlist");
    }
  }
);

export const toggleWishlist = createAsyncThunk<any, string>(
  "wishlist/toggleWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/wishlist/add/${productId}`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to toggle wishlist");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlist: (state) => {
        state.wishlist = null;
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
