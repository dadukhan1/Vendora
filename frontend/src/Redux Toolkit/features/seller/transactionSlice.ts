/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

const initialState = {
  transactions: [] as any[],
  loading: false,
  error: null as string | null,
};

export const fetchSellerTransactions = createAsyncThunk<any, any>(
  "seller/fetchSellerTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/transactions/seller`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log("Seller transactions response:", data);
      return data;
    } catch (error) {
      console.error("Error fetching seller transactions:", error);
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
      state.transactions = action.payload;
    });
    builder.addCase(fetchSellerTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export default transactionSlice.reducer;
