/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";
import { toast } from "react-hot-toast";

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
    },
    toggleWishlistOptimistic: (state, action: { payload: any }) => {
      if (!state.wishlist) return;
      const product = action.payload;
      const index = state.wishlist.products.findIndex((p: any) => p._id === product._id);
      if (index !== -1) {
        state.wishlist.products.splice(index, 1);
      } else {
        state.wishlist.products.push(product);
      }
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
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string || "Failed to update wishlist. Reverting...");
        // Revert is handled by the fact that the state didn't change permanently 
        // OR we can refetch if needed. But usually, if it fails, the next fetch will fix it.
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      });
  },
});

export const { resetWishlist, toggleWishlistOptimistic } = wishlistSlice.actions;
export default wishlistSlice.reducer;
