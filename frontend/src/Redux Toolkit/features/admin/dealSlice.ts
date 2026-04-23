/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

export interface Deal {
  _id: string;
  title?: string;
  discount?: number;
  category: string
}

interface DealState {
  deals: Deal[];
  loading: boolean;
  error: string | null;
}

const initialState: DealState = {
  deals: [],
  loading: false,
  error: null,
};

const getToken = () => localStorage.getItem("token");

export const createDeal = createAsyncThunk<
  Deal,
  Partial<Deal>,
  { rejectValue: string }
>("/deals/createDeal", async (deal, { rejectWithValue }) => {
  try {
    const response = await api.post(
      "/admin/deals",
      { deal },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to create deal",
    );
  }
});

export const getAllDeals = createAsyncThunk<
  Deal[],
  void,
  { rejectValue: string }
>("/deals/getAllDeals", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/admin/deals", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch deals",
    );
  }
});

export const deleteDeal = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("/deals/deleteDeal", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/admin/deals/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to delete deal",
    );
  }
});

export const updateDeal = createAsyncThunk<
  Deal,
  { id: string; data: Partial<Deal> },
  { rejectValue: string }
>("/deals/updateDeal", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/admin/deals/${id}`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to update deal",
    );
  }
});

const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.deals.push(action.payload);
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create deal";
      })
      .addCase(getAllDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(getAllDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch deals";
      })
      .addCase(deleteDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.loading = false;

        state.deals = state.deals.filter((deal) => deal._id !== action.payload);
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete deal";
      })
      .addCase(updateDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeal.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.deals.findIndex((deal) => deal._id === updated._id);
        if (index !== -1) {
          state.deals[index] = updated;
        }
      })
      .addCase(updateDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update deal";
      });
  },
});

export default dealSlice.reducer;
