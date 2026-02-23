/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

const intialState = {
  orders: [],
  loading: false,
  error: null as string | null,
  orderItem: null,
  currentOrder: null,
  orderPayment: null,
};

const orderHistory = createAsyncThunk<any, any>(
  "order/orderHistory",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get("/order/history", {
        headers: {
          Authorization: `Bearer ${jwt}`,
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

const orderById = createAsyncThunk<any, any>(
  "order/orderById",
  async ({ jwt, orderId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
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

const createOrder = createAsyncThunk<any, any>(
  "order/createOrder",
  async ({ address, jwt, paymentGateway }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/order",
        { shippingAddress: address },
        {
          params: {
            paymentGateway,
          },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      const data = response.data;
      console.log("Create order response:", data);
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      return rejectWithValue(error);
    }
  },
);

const orderItemById = createAsyncThunk<any, any>(
  "order/orderItemById",
  async ({ jwt, orderItemId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/order/item/${orderItemId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
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

const paymentSuccess = createAsyncThunk<any, any>(
  "order/paymentSuccess",
  async ({ jwt, paymentId, paymentLinkId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/order/item/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          paymentLinkId,
        },
      });
      const data = response.data;
      console.log("Payment Success response:", data);
      return data;
    } catch (error) {
      console.error("Error fetching order payment :", error);
      return rejectWithValue(error);
    }
  },
);

const cancelOrder = createAsyncThunk<any, any>(
  "order/cancelOrder",
  async ({ orderId, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/order/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
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
      state.orders = action.payload;
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
    builder.addCase(paymentSuccess.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(paymentSuccess.fulfilled, (state, action) => {
      state.loading = false;
      state.orderPayment = action.payload;
    });
    builder.addCase(paymentSuccess.rejected, (state, action) => {
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
