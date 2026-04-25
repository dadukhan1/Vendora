/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

export interface Category {
  _id: string;
  name: string;
  categoryId: string;
  image: string;
  parentCategory: string | { _id: string; name: string; categoryId: string } | null;
  level: number;
  isActive: boolean;
  order: number;
  showOnHomepage: boolean;
  children?: Category[]; // For hierarchy rendering
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const getToken = () => localStorage.getItem("token");

export const toggleCategoryStatus = createAsyncThunk<
  Category,
  { id: string; active: boolean },
  { rejectValue: string }
>("/category/toggleCategoryStatus", async ({ id, active }, { rejectWithValue }) => {
  try {
    const endpoint = active ? "activate" : "deactivate";
    const response = await api.put(`/admin/categories/${id}/${endpoint}`, {}, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || `Failed to ${active ? 'activate' : 'deactivate'} category`);
  }
});

export const fetchAllCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("/category/fetchAllCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/admin/categories", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
  }
});

export const createCategory = createAsyncThunk<
  Category,
  Partial<Category>,
  { rejectValue: string }
>("/category/createCategory", async (categoryData, { rejectWithValue }) => {
  try {
    const response = await api.post("/admin/categories", categoryData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to create category");
  }
});

export const updateCategory = createAsyncThunk<
  Category,
  { id: string; data: Partial<Category> },
  { rejectValue: string }
>("/category/updateCategory", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/admin/categories/${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to update category");
  }
});

export const deleteCategory = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("/category/deleteCategory", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/admin/categories/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete category");
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((cat) => cat._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(toggleCategoryStatus.fulfilled, (state, action) => {
        const index = state.categories.findIndex((cat) => cat._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat._id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
