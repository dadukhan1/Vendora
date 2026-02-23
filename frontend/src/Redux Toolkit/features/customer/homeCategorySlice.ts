/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

export const homeCategoryData = createAsyncThunk<any, any>(
  "home/fetchHomePageData",
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/home`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const createHomeCategory = createAsyncThunk<any, any>(
  "home/createHomeCategory",
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await api.post(`/home`, { category });
      console.log("Create home category response:", response);
      return response.data;
    } catch (error: any) {
      console.error("Error creating home category:", error);
      return rejectWithValue(error.response.data);
    }
  },
);

const homeCategorySlice = createSlice({
  name: "homeCategory",
  initialState: {
    homeCategories: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createHomeCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createHomeCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.homeCategories = action.payload;
    });
    builder.addCase(createHomeCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default homeCategorySlice.reducer;
