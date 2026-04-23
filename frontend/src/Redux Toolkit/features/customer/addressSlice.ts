/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api";
import toast from "react-hot-toast";

/* ---------------- TYPES ---------------- */

export interface Address {
  _id: string;
  city?: string;
  country?: string;
  addressLine?: string;
}

interface AddressState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

/* ---------------- INITIAL STATE ---------------- */

const initialState: AddressState = {
  addresses: [],
  loading: false,
  error: null,
};

const getToken = () => localStorage.getItem("token");

export const fetchAddresses = createAsyncThunk<
  Address[],
  void,
  { rejectValue: string }
>("address/fetchAddresses", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/address", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.addresses || [];
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch addresses",
    );
  }
});

export const addAddress = createAsyncThunk<
  Address,
  Partial<Address>,
  { rejectValue: string }
>("address/addAddress", async (addressData, { rejectWithValue }) => {
  try {
    const response = await api.post("/address", addressData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.address;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to add address",
    );
  }
});

export const deleteAddress = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("address/deleteAddress", async (addressId, { rejectWithValue }) => {
  try {
    await api.delete(`/address/${addressId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return addressId;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to delete address",
    );
  }
});

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    clearAddressError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch addresses";
      })
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
        toast.success("Address added successfully!");
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add address";
        toast.error(action.payload || "Failed to add address");
      })
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;

        state.addresses = state.addresses.filter(
          (addr) => addr._id !== action.payload,
        );
        toast.success("Address deleted successfully!");
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete address";

        toast.error(action.payload || "Failed to delete address");
      });
  },
});

export const { clearAddressError } = addressSlice.actions;
export default addressSlice.reducer;
