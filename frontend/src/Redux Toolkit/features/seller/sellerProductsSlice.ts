/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";
import toast from "react-hot-toast";

export const fetchSellerProducts = createAsyncThunk<any, void>(
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
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/seller/products/${productId}`,
        { productData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

export const deleteProduct = createAsyncThunk<string, string>(
  "sellerProduct/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.delete(`/seller/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Seller product deleted successfully:", response.data);
      return productId;
    } catch (error) {
      console.error("Error deleting seller product:", error);
      return rejectWithValue("Failed to delete product. Please try again.");
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
        toast.error(action.payload as string);
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        toast.success("Product created successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });

    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        toast.success("Product updated successfully");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => p._id !== action.payload);
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export default sellerProductsSlice.reducer;
