/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

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
      console.log("Fetch cart response:", data);
      return data;
    } catch (error) {
      console.error("Error fetching cart:", error);
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
      console.log("Add item to cart response:", data);
      return data;
    } catch (error) {
      console.error("Error adding item to cart:", error);
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
      console.log("Delete cart item response:", data);
      return data;
    } catch (error) {
      console.error("Error deleting cart item:", error);
      return rejectWithValue(error);
    }
  },
);

export const updateCartItem = createAsyncThunk<any, any>(
  "cart/updateCartItem",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      console.log(cartItemId, quantity);
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
      console.log("Update cart item response:", data);
      return data;
    } catch (error) {
      console.error("Error updating cart item:", error);
      return rejectWithValue(error);
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
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
    });
    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to add item to cart";
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
      state.error = action.error.message || "Failed to delete cart item";
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

export default cartSlice.reducer;
