/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

export const fetchSellerProducts = createAsyncThunk<any, any>(
  "sellerProduct/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/seller/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log("Seller products fetched successfully:", data);
      return data;
    } catch (error) {
      console.error("Error fetching seller products:", error);
      return rejectWithValue("Failed to fetch products. Please try again.");
    }
  },
);

export const createProduct = createAsyncThunk<any, any>(
  "sellerProduct/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/seller/products`, productData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      console.log("Seller products created successfully:", data);
      return data;
    } catch (error) {
      console.error("Error creating seller products:", error);
      return rejectWithValue("Failed to create products. Please try again.");
    }
  },
);

export const updateProduct = createAsyncThunk<any, any>(
  "sellerProduct/updateProduct",
  async ({ jwt, productData, productId }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/seller/products/${productId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      const data = response.data;
      console.log("Seller products updated successfully:", data);
      return data;
    } catch (error) {
      console.error("Error updating seller products:", error);
      return rejectWithValue("Failed to update products. Please try again.");
    }
  },
);

const initialState = {
  products: [] as any[],
  loading: false,
  error: null as string | null,
};

const sellerProductsSlice = createSlice({
  name: "sellerProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id,
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerProductsSlice.reducer;
