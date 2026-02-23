/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

const initialState = {
  orders: [],
  loading: false,
  error: null as string | null,
};

export const fetchSellerOrders = createAsyncThunk<any, any>(
  "sellerOrders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/seller/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sellerJwt")}`,
        },
      });
      const data = response.data;
      console.log("Seller orders fetched successfully:", data);
      return data;
    } catch (error) {
      console.error("Error fetching seller orders:", error);
      return rejectWithValue("Failed to fetch orders. Please try again.");
    }
  },
);

export const updateOrderStatus = createAsyncThunk<any, any>(
  "sellerOrders/updateOrderStatus",
  async ({ orderId, status, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/seller/orders/${orderId}/status/${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      const data = response.data;
      console.log("Seller orders updated successfully:", data);
      return data;
    } catch (error) {
      console.error("Error updating seller orders:", error);
      return rejectWithValue("Failed to update orders. Please try again.");
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
        state.orders = action.payload.orders;
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload.order;
        const index = state.orders.findIndex(
          (order) => order.id === updatedOrder.id,
        );
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerOrderSlice.reducer;
