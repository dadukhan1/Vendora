/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

/* ---------------- TYPES ---------------- */

interface HomeCategory {
  id?: string;
  title?: string;
}

interface HomeCategoryState {
  homeCategories: HomeCategory[];
  loading: boolean;
  error: string | null;
}

/* ---------------- INITIAL STATE ---------------- */

const initialState: HomeCategoryState = {
  homeCategories: [],
  loading: false,
  error: null,
};

export const homeCategoryData = createAsyncThunk<
  HomeCategory[],
  void,
  { rejectValue: string }
>("home/fetchHomePageData", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/home");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch home data",
    );
  }
});

export const getHomePageCategories = createAsyncThunk<
  HomeCategory[],
  string,
  { rejectValue: string }
>("home/getGroupedCategories", async (category, { rejectWithValue }) => {
  try {
    const response = await api.get("/home/grouped", {
      params: { category },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch grouped categories",
    );
  }
});

export const createHomeCategory = createAsyncThunk<
  HomeCategory[],
  Partial<HomeCategory>,
  { rejectValue: string }
>("home/createHomeCategory", async (category, { rejectWithValue }) => {
  try {
    const response = await api.post("/home", { category });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to create category",
    );
  }
});

const homeCategorySlice = createSlice({
  name: "homeCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCategories = action.payload;
      })
      .addCase(createHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Create failed";
      })
      .addCase(homeCategoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(homeCategoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCategories = action.payload;
      })
      .addCase(homeCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch failed";
      })
      .addCase(getHomePageCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomePageCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCategories = action.payload;
      })
      .addCase(getHomePageCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Grouped fetch failed";
      });
  },
});

export default homeCategorySlice.reducer;
