/** @format */
import api from "../../../config/api.ts";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const profile = createAsyncThunk<any, string>(
  "/user/profile",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/user/profile`,
        {}, // no body needed
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          "An error occurred while fetching profile",
      });
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(profile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(profile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(profile.rejected, (state, action) => {
      state.loading = false;
      state.error =
        (action.payload as { message?: string })?.message ||
        "Failed to fetch user profile";
    });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
