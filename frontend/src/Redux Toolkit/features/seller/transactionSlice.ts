/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

const initialState = {
  transactions: [] as any[],
  totalEarnings: 0,
  totalTransactions: 0,
  loading: false,
  error: null as string | null,
};

export const fetchSellerTransactions = createAsyncThunk<any, void>(
  "seller/fetchSellerTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/transactions/seller`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const transactionSlice = createSlice({
  name: "sellerTransaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSellerTransactions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSellerTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload.transactions;
      state.totalEarnings = action.payload.totalEarnings;
      state.totalTransactions = action.payload.totalTransactions;
    });
    builder.addCase(fetchSellerTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export default transactionSlice.reducer;
