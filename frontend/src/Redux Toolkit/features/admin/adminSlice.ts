/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

export const updateHomeCategory = createAsyncThunk<any, any>(
  "/homeCategory/updateHomeCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/home/${id}`, data, {});
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchHomeCategory = createAsyncThunk<any, any>(
  "/homeCategory/fetchHomeCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/home");
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchSingleHomeCategory = createAsyncThunk<any, any>(
  "/homeCategory/fetchSingleHomeCategory",
  async (id, { rejectWithValue }) => {
    try {
      console.log("state data ", id);
      const response = await api.get(`/home/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  categories: [] as any,
  selectedCategory: null as any,
  loading: false,
  error: null,
};

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
      .addCase(updateHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCategory = action.payload;
        const index = state.categories.findIndex(
          (cat) => cat.id === updatedCategory.id,
        );
        if (index !== -1) {
          state.categories[index] = updatedCategory;
        }
      })
      .addCase(updateHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
        state.error = action.payload;
      })
      .addCase(fetchSingleHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedCategory = null;
      })
      .addCase(fetchSingleHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload; // ✅ store it separately
      })
      .addCase(fetchSingleHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedCategory } = homeCategorySlice.actions;
export default homeCategorySlice.reducer;
