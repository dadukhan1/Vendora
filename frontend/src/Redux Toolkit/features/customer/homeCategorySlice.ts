/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

/* ---------------- TYPES ---------------- */

interface CategoryItem {
  _id: string;
  name: string;
  image: string;
  categoryId: string;
}

interface HomeCategories {
  electricCategories: CategoryItem[];
  grid: CategoryItem[];
  shopByCategories: CategoryItem[];
  deals: any[];
}

interface HomeCategoryState {
  homeCategories: HomeCategories | null;
  loading: boolean;
  error: string | null;
}

const initialState: HomeCategoryState = {
  homeCategories: null,
  loading: false,
  error: null,
};

export const getHomePageCategories = createAsyncThunk<
  HomeCategories,
  void,
  { rejectValue: string }
>("home/getGroupedCategories", async (category, { rejectWithValue }) => {
  try {
    const response = await api.get("/home/grouped", {
      params: { category },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch categories",
    );
  }
});

export const homeCategoryData = createAsyncThunk<
  HomeCategories,
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

export const createHomeCategory = createAsyncThunk<
  HomeCategories,
  Partial<CategoryItem>,
  { rejectValue: string }
>("home/createHomeCategory", async (category, { rejectWithValue }) => {
  try {
    const response = await api.post("/home", category);
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
        state.error = action.payload || "Fetch failed";
      })
      .addCase(homeCategoryData.pending, (state) => {
        state.loading = true;
      })
      .addCase(homeCategoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCategories = action.payload;
      })
      .addCase(homeCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch failed";
      })
      .addCase(createHomeCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCategories = action.payload;
      })
      .addCase(createHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Create failed";
      });
  },
});

export default homeCategorySlice.reducer;
