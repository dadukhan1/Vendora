/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import authSlice from "./features/auth/authSlice.ts";
import userSlice from "./features/customer/userSlice.ts";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AddDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AddDispatch>();

export const useAppSelectore: TypedUseSelectorHook<RootState> = useSelector;

export default store;
