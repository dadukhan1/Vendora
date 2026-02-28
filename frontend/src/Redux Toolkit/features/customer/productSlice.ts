/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

const initialState = {
  product: null,
  products: [],
  loading: false,
  error: null as string | null,
  searchProducts: [],
  totalElements: 0,
  totalPages: 0,
};

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${productId}`);
      const data = response.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const searchProduct = createAsyncThunk(
  "product/searchProduct",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/search`, { params: { query } });
      const data = response.data;
      console.log("Search results:", data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/products", {
        params: {
          ...params,
          pageNumber: params?.pageNumber || 1,
        },
      });
      const data = response.data;
      console.log("All products:", data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(searchProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.searchProducts = action.payload;
    });
    builder.addCase(searchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.content;
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default productSlice.reducer;
