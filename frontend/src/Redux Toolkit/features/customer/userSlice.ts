/** @format */
import toast from "react-hot-toast";
import api from "../../../config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* ---------------- TYPES ---------------- */

interface User {
  id?: string;
  fullName?: string;
  email?: string;
  mobile?: string;
  address?: string;
  role?: string;
}

interface ErrorPayload {
  message: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
  updateError: string | null;
}

/* ---------------- INITIAL STATE ---------------- */

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  updating: false,
  updateError: null,
};

export const profile = createAsyncThunk<
  User,
  string,
  { rejectValue: ErrorPayload }
>("user/profile", async (token, { rejectWithValue }) => {
  try {
    const response = await api.post(
      "/user/profile",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error?.response?.data?.message || "Failed to fetch profile",
    });
  }
});

export const updateProfile = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: ErrorPayload }
>("user/updateProfile", async (userData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue({
        message: "Authentication token not found",
      });
    }

    const response = await api.put("/user/update", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error?.response?.data?.message || "Failed to update profile",
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
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(profile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch profile";
      })
      .addCase(updateProfile.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.user = action.payload;
        toast.success("Profile updated successfully!");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updating = false;
        const message = action.payload?.message || "Failed to update profile";
        state.updateError = message;
        toast.error(message);
      });
  },
});

export const { clearUser, clearUpdateError } = userSlice.actions;
export default userSlice.reducer;
