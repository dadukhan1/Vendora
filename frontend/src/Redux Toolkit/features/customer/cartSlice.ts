/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";
import { toast } from "react-hot-toast";

const initialState = {
  cart: null as any,
  loading: false,
  error: null as string | null,
};

export const fetchCart = createAsyncThunk<any, void>(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addItemToCart = createAsyncThunk<any, any>(
  "cart/addItemToCart",
  async (request, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/cart/items", request, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteCartItem = createAsyncThunk<any, any>(
  "cart/deleteCartItem",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.delete(`/cart/items/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateCartItem = createAsyncThunk<any, any>(
  "cart/updateCartItem",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/cart/items/${cartItemId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCartOptimistic: (state, action: { payload: any }) => {
        if (!state.cart) {
            state.cart = { cartItems: [] };
        }
        const product = action.payload;
        // Check if already exists (shouldn't happen with the new toggle logic, but good for safety)
        if (state.cart.cartItems.some((item: any) => item.product?._id === product._id)) return;
        
        state.cart.cartItems.push({
            _id: `temp-${Date.now()}`,
            product: product,
            quantity: 1,
            sellingPrice: product.sellingPrice,
            mrpPrice: product.mrpPrice
        });
    },
    removeItemFromCartOptimistic: (state, action: { payload: string }) => {
        if (!state.cart) return;
        state.cart.cartItems = state.cart.cartItems.filter((item: any) => item.product?._id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch cart";
    });

    builder.addCase(addItemToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      // Removed success toast per user request
    });
    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to add item to cart";
      toast.error(state.error);
    });

    builder.addCase(deleteCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.loading = false;
      state.cart.cartItems = state.cart.cartItems.filter(
        (item: any) => item._id !== action.meta.arg,
      );
    });
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any)?.message || "Failed to delete cart item";
      toast.error(state.error);
    });

    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCartItem.fulfilled, (state, action) => {
      state.loading = false;
      // replace the single item inside cart.cartItems
      state.cart.cartItems = state.cart.cartItems.map((item: any) =>
        item._id === action.payload._id ? action.payload : item,
      );
    });
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update cart item";
    });
  },
});

export const { addItemToCartOptimistic, removeItemFromCartOptimistic } = cartSlice.actions;
export default cartSlice.reducer;
