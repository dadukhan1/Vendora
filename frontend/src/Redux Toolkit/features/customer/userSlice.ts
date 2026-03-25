/** @format */
import toast from "react-hot-toast";
import api from "../../../config/api.ts";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: any | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
  updateError: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  updating: false,
  updateError: null,
};

export const profile = createAsyncThunk<any, string>(
  "/user/profile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/user/profile`,
        {}, // no body needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

export const updateProfile = createAsyncThunk<
  any,
  { fullName?: string; email?: string; mobile?: string; address?: string },
  { rejectValue: { message: string } }
>("user/updateProfile", async (userData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue({
        message: "Authentication token not found. Please login again.",
      });
    }
    const response = await api.put(`/user/update`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return rejectWithValue({
      message:
        error.response?.data?.message ||
        "An error occurred while updating profile",
    });
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.updating = false;
      state.updateError = null;
    },
    clearUpdateError: (state) => {
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    // Profile fetch cases
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

    // Profile update cases
    builder.addCase(updateProfile.pending, (state) => {
      state.updating = true;
      state.updateError = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.updating = false;
      // state.user = action.payload;
      state.updateError = null;
      toast.success("Profile updated successfully!");
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.updating = false;
      state.updateError =
        (action.payload as { message?: string })?.message ||
        "Failed to update profile";
      toast.error(action.payload as string);
    });
  },
});

export const { clearUser, clearUpdateError } = userSlice.actions;

export default userSlice.reducer;
