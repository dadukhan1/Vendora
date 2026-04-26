/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

/* ---------------- TYPES ---------------- */

export interface Product {
  _id: string;
  item: string;
  title?: string;
  description: string;
  mrpPrice: number;
  sellingPrice: number;
  discount: number;
  quantity: number;
  color: string;
  images: string[];
  category: any;
  seller: any;
  isFeatured?: boolean;
  numReviews?: number;
  avgRating?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductState {
  product: Product | null;
  products: Product[];
  loading: boolean;
  error: string | null;
  searchProducts: Product[];
  totalElements: number;
  totalPages: number;
  activeProductsQueryKey: string;
  lastCategory: string;
  lastSearchTerm: string;
}

/* ---------------- INITIAL STATE ---------------- */

const initialState: ProductState = {
  product: null,
  products: [],
  loading: false,
  error: null,
  searchProducts: [],
  totalElements: 0,
  totalPages: 0,
  activeProductsQueryKey: "",
  lastCategory: "",
  lastSearchTerm: "",
};

const buildProductsQueryKey = (params: any) => {
  const p = params ?? {};
  return [
    p.category ?? "",
    p.search ?? "",
    p.sort ?? "",
    (p.pageNumber ?? 1).toString(),
    p.color ?? "",
    p.minPrice ?? "",
    p.maxPrice ?? "",
    p.minDiscount ?? "",
    p.isFeatured ?? "",
  ].join("|");
};

export const fetchProductById = createAsyncThunk<Product, string>(
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

export const searchProduct = createAsyncThunk<Product[], string>(
  "product/searchProduct",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/search`, { params: { q: query } });
      const data = response.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAllProducts = createAsyncThunk<any, any>(
  "product/getAllProducts",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await api.get("/products", {
        params: {
          ...params,
          pageNumber: params?.pageNumber || 1,
        },
      });
      const data = response.data;
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

    builder.addCase(getAllProducts.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      const args = action.meta.arg || {};
      const nextCategory = args.category ?? "";
      const nextSearchTerm = args.search ?? "";

      // If category OR search term changed, clear previous products & pagination immediately
      if (
        nextCategory !== state.lastCategory ||
        nextSearchTerm !== state.lastSearchTerm
      ) {
        state.products = [];
        state.totalElements = 0;
        state.totalPages = 0;
        state.lastCategory = nextCategory;
        state.lastSearchTerm = nextSearchTerm;
      }

      state.activeProductsQueryKey = buildProductsQueryKey(args);
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      const fulfilledKey = buildProductsQueryKey(action.meta.arg);
      if (fulfilledKey !== state.activeProductsQueryKey) return;
      state.loading = false;
      state.products = action.payload.content;
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      const rejectedKey = buildProductsQueryKey(action.meta.arg);
      if (rejectedKey !== state.activeProductsQueryKey) return;
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default productSlice.reducer;
