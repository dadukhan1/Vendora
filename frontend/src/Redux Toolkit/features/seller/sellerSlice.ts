/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";
import { toast } from "react-hot-toast";

/* ---------------- TYPES ---------------- */

interface BusinessDetails {
  bussinessName: string;
  bussinessEmail: string;
  bussinessMobile: string;
  bussinessAddress: string;
  logo?: string;
  banner?: string;
}

interface BankDetails {
  accountNumber: string;
  ifscCode?: string;
  accountHolderName?: string;
}

interface Seller {
  _id: string;
  sellerName?: string;
  email?: string;
  mobile?: string;
  GSTIN?: string;
  bussinessDetails?: BusinessDetails;
  bankDetails?: BankDetails;
  accountStatus?: string;
  role?: string;
  isEmailVerified?: boolean;
}

interface SellerState {
  sellers: Seller[];
  seller: Seller | null;
  selectedSeller: Seller | null;
  profile: Seller | null;
  report: any;
  loading: boolean;
  error: string | null;
}

/* ---------------- INITIAL STATE ---------------- */

const initialState: SellerState = {
  sellers: [],
  seller: null,
  selectedSeller: null,
  profile: null,
  report: null,
  loading: false,
  error: null,
};

const getToken = () => localStorage.getItem("token");

export const fetchSellerProfile = createAsyncThunk<
  Seller,
  void,
  { rejectValue: string }
>("sellers/fetchSellerProfile", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/seller/profile", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch profile",
    );
  }
});

export const fetchSellers = createAsyncThunk<
  Seller[],
  string | undefined,
  { rejectValue: string }
>("sellers/fetchSellers", async (status, { rejectWithValue }) => {
  try {
    const res = await api.get("/seller", {
      params: { status },
    });
    return res.data;
  } catch (error: any) {
    return rejectWithValue("Failed to fetch sellers");
  }
});

export const fetchSellerReport = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("sellers/fetchSellerReport", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("seller/report", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error: any) {
    return rejectWithValue("Failed to fetch report");
  }
});

export const fetchSellerById = createAsyncThunk<
  Seller,
  string,
  { rejectValue: string }
>("sellers/fetchSellerById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get(`seller/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error: any) {
    return rejectWithValue("Failed to fetch seller");
  }
});

export const updateSellerAccountStatus = createAsyncThunk<
  Seller,
  { id: string; status: string },
  { rejectValue: string }
>(
  "sellers/updateSellerAccountStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `admin/seller/${id}/status/${status}`,
        {},
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      );

      toast.success(res.data.message);
      return res.data.seller;
    } catch (error: any) {
      return rejectWithValue("Failed to update seller status");
    }
  },
);

export const updateSellerProfile = createAsyncThunk<
  Seller,
  Partial<Seller>,
  { rejectValue: string }
>("sellers/updateSellerProfile", async (profileData, { rejectWithValue }) => {
  try {
    const res = await api.patch("/seller", profileData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error: any) {
    return rejectWithValue("Failed to update profile");
  }
});

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
        state.seller = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed";
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.report = action.payload;
      })
      .addCase(fetchSellerById.fulfilled, (state, action) => {
        state.selectedSeller = action.payload;
      })
      .addCase(updateSellerAccountStatus.fulfilled, (state, action) => {
        const updated = action.payload;

        const index = state.sellers.findIndex(
          (seller) => seller._id === updated._id,
        );
        if (index !== -1) {
          state.sellers[index] = updated;
        }
      })
      .addCase(updateSellerProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.seller = action.payload;
        toast.success("Profile updated successfully");
      });
  },
});

export default sellerSlice.reducer;
