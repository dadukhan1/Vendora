/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

const initialState = {
  deals: [],
  loading: false,
  error: null,
};

export const createDeal = createAsyncThunk<any, any>(
  "/deals/createDeal",
  async (deal, { rejectWithValue }) => {
    try {
      console.log(deal);
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/admin/deals",
        { deal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("createDeal response:", response.data);
      return response.data;
    } catch (error) {
      console.log("createDeal error:", error);
      return rejectWithValue(error);
    }
  },
);

export const getAllDeals = createAsyncThunk<any, any>(
  "/deals/getAllDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/deals", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("getAllDeals response:", response.data);
      return response.data;
    } catch (error) {
      console.log("getAllDeals error:", error);
      return rejectWithValue(error);
    }
  },
);

export const deleteDeal = createAsyncThunk<any, any>(
  "/deals/deleteDeal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/deals/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("deleteDeal response:", response.data);
      return response.data;
    } catch (error) {
      console.log("deleteDeal error:", error);
      return rejectWithValue(error);
    }
  },
);

export const updateDeal = createAsyncThunk<any, any>(
  "/deals/updateDeal",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/deals/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("updateDeal response:", response.data);
      return response.data;
    } catch (error) {
      console.log("updateDeal error:", error);
      return rejectWithValue(error);
    }
  },
);

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
        state.deals.push(action.payload);
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDeals.fulfilled, (state, action) => {
        state.deals = action.payload;
      })
      .addCase(getAllDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.deals = state.deals.filter(
          (deal) => deal.id !== action.payload.id,
        );
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeal.fulfilled, (state, action) => {
        const index = state.deals.findIndex(
          (deal) => deal.id === action.payload.id,
        );
        if (index !== -1) {
          state.deals[index] = action.payload;
        }
      })
      .addCase(updateDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dealSlice.reducer;
