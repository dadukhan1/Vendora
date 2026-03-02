/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api";

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      console.log("adddress", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch addresses",
      );
    }
  },
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      console.log(addressData);
      const token = localStorage.getItem("token");
      const { data } = await api.post("/address", addressData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add address",
      );
    }
  },
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      await api.delete(`/address/${addressId}`);
      return addressId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete address",
      );
    }
  },
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    loading: false,
    error: null as null | string,
  },
  reducers: {
    clearAddressError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.addresses || [];
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload.address);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.filter(
          (addr) => addr._id !== action.payload,
        );
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAddressError } = addressSlice.actions;

export default addressSlice.reducer;
