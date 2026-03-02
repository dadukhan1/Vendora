/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

const initialState = {
  sellers: [],
  selectedSeller: null,
  loading: false,
  error: null as string | null,
  profile: null,
  report: null,
  profileUpdate: false,
};

export const fetchSellerProfile = createAsyncThunk<any, any>(
  "sellers/fetchSellerProfile",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`/seller/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = response.data;
      console.log("Fetching seller profile data", data);
      return data;
    } catch (error) {
      console.error("Fetch sellers profile error :", error);
      return rejectWithValue(error);
    }
  },
);

export const fetchSellers = createAsyncThunk<any, any>(
  "sellers/fetchSellers",
  async (status, { rejectWithValue }) => {
    try {
      const response = await api.get(`/seller/`, {
        params: {
          status,
        },
      });
      const data = response.data;
      console.log("Fetch all sellers", data);
      return data;
    } catch (error) {
      console.error("Error in fetching all profiles", error);
      return rejectWithValue(error);
    }
  },
);

export const fetchSellerReport = createAsyncThunk<any, any>(
  "sellers/fetchSellerReport",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`seller/report`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = response.data;
      console.log("Fetch seller report", data);
      return data;
    } catch (error) {
      console.error("Error in fetching seller report", error);
      return rejectWithValue(error);
    }
  },
);

export const fetchSellerById = createAsyncThunk<any, any>(
  "sellers/fetchSellerById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`seller/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = response.data;
      console.log("Fetch seller by id", data);
      return data;
    } catch (error) {
      console.error("Error in fetching seller by id", error);
      return rejectWithValue(error);
    }
  },
);

export const updateSellerAccountStatus = createAsyncThunk<any, any>(
  "sellers/updateSellerAccountStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`admin/seller/${id}/status/${status}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = response.data;
      console.log("Update seller account status", data);
      return data;
    } catch (error) {
      console.error("Error in updating seller account status", error);
      return rejectWithValue(error);
    }
  },
);

const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });

    builder
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
    builder
      .addCase(fetchSellerReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
    builder
      .addCase(fetchSellerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSeller = action.payload;
      })
      .addCase(fetchSellerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
    builder
      .addCase(updateSellerAccountStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerAccountStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sellers.findIndex(
          (seller) => seller.id === action.payload.id,
        );
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
      })
      .addCase(updateSellerAccountStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export default sellerSlice.reducer;
