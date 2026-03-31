/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

const intialState = {
  orders: [] as any[],
  loading: false,
  error: null as string | null,
  orderItem: null as any,
  currentOrder: null as any,
  orderPayment: null as any,
};

export const orderHistory = createAsyncThunk<any, void>(
  "order/orderHistory",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/order/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log("Order history response:", data);
      return data;
    } catch (error) {
      console.error("Error fetching order history:", error);
      return rejectWithValue(error);
    }
  },
);

export const orderById = createAsyncThunk<any, any>(
  "order/orderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log("Order by ID response:", data);
      return data;
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      return rejectWithValue(error);
    }
  },
);

export const createOrder = createAsyncThunk<any, any>(
  "order/createOrder",
  async ({ address, paymentGateway, couponDiscount = 0, couponId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/order",
        { shippingAddress: address, couponDiscount, couponId },
        {
          params: {
            paymentGateway,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data;
      console.log("Create order response:", response);
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      return rejectWithValue(error);
    }
  },
);

export const orderItemById = createAsyncThunk<any, any>(
  "order/orderItemById",
  async (orderItemId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/order/item/${orderItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log("Order item by ID response:", data);
      return data;
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      return rejectWithValue(error);
    }
  },
);

export const createCheckout = createAsyncThunk<any, any>(
  "order/createCheckout",
  async ({ orderId, totalSellingPrice }, { rejectWithValue }) => {
    try {
      console.log("data of checkout", orderId, totalSellingPrice);
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/create-checkout",
        { orderId, totalSellingPrice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data; // { url: "stripe url" }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const cancelOrder = createAsyncThunk<any, any>(
  "order/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/order/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data;
      console.log("Cancel order by ID response:", data);
      return data;
    } catch (error) {
      console.error("Error cancelling order:", error);
      return rejectWithValue(error);
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(orderHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(orderHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
    });
    builder.addCase(orderHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(orderItemById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(orderItemById.fulfilled, (state, action) => {
      state.loading = false;
      state.orderItem = action.payload;
    });
    builder.addCase(orderItemById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(orderById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(orderById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
    });
    builder.addCase(orderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
      state.orderPayment = action.payload;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(createCheckout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCheckout.fulfilled, (state, action) => {
      state.loading = false;
      state.orderPayment = action.payload;
    });
    builder.addCase(createCheckout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(cancelOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(cancelOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
    });
    builder.addCase(cancelOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export default orderSlice.reducer;
