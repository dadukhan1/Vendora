/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

export interface Banner {
  _id: string;
  image: string;
  categoryId: string;
  productId?: string;
  title?: string;
  description?: string;
  isActive: boolean;
  type?: string;
}

interface BannerState {
  banners: Banner[];
  loading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  banners: [],
  loading: false,
  error: null,
};

export const fetchBanners = createAsyncThunk<
  Banner[],
  void,
  { rejectValue: string }
>("/banners/fetchBanners", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/banners");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch banners");
  }
});

const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export default bannerSlice.reducer;
