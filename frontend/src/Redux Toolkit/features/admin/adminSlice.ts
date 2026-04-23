/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

export interface Category {
  id: string;
  title?: string;
}

interface HomeCategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  loading: boolean;
  error: string | null;
}

const initialState: HomeCategoryState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

export const fetchHomeCategory = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("/homeCategory/fetchHomeCategory", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/home");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch categories");
  }
});

export const fetchSingleHomeCategory = createAsyncThunk<
  Category,
  string,
  { rejectValue: string }
>("/homeCategory/fetchSingleHomeCategory", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/home/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch category");
  }
});

export const updateHomeCategory = createAsyncThunk<
  Category,
  { id: string; data: Partial<Category> },
  { rejectValue: string }
>(
  "/homeCategory/updateHomeCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/home/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update category");
    }
  },
);

const homeCategorySlice = createSlice({
  name: "homeCategory",
  initialState,
  reducers: {
    clearSelectedCategory(state) {
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchSingleHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedCategory = null;
      })
      .addCase(fetchSingleHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchSingleHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHomeCategory.fulfilled, (state, action) => {
        state.loading = false;

        const updated = action.payload;

        const index = state.categories.findIndex(
          (cat) => cat.id === updated.id,
        );

        if (index !== -1) {
          state.categories[index] = updated;
        }

        if (
          state.selectedCategory &&
          state.selectedCategory.id === updated.id
        ) {
          state.selectedCategory = updated;
        }
      })
      .addCase(updateHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearSelectedCategory } = homeCategorySlice.actions;
export default homeCategorySlice.reducer;
