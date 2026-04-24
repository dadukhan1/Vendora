/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

import type { Product } from "../customer/productSlice";

/* ---------------- TYPES ---------------- */

export interface OrderItem {
  _id: string;
  product: Product;
  quantity: number;
  size: string;
  orderId: string;
}

export interface Address {
  _id?: string;
  name: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  locality: string;
}

export interface Order {
  _id: string;
  orderItems: OrderItem[];
  shippingAddress: Address;
  orderStatus: string;
  totalPrice?: number;
  orderDate?: string;
}

interface SellerOrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

/* ---------------- INITIAL STATE ---------------- */

const initialState: SellerOrderState = {
  orders: [],
  loading: false,
  error: null,
};

const getToken = () => localStorage.getItem("token");

export const fetchSellerOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("sellerOrders/fetchOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/seller/order", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data.orders || [];
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message ||
        "Failed to fetch orders. Please try again.",
    );
  }
});

export const updateOrderStatus = createAsyncThunk<
  Order,
  { orderId: string; status: string },
  { rejectValue: string }
>(
  "sellerOrders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/seller/order/${orderId}/status/${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update order",
      );
    }
  },
);

const sellerOrderSlice = createSlice({
  name: "sellerOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch orders";
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id,
        );

        if (index !== -1) {
          state.orders[index] = updatedOrder;
        } else {
          state.orders.push(updatedOrder);
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update order";
      });
  },
});

export default sellerOrderSlice.reducer;
