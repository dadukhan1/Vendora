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
import productSlice from "./features/customer/productSlice.ts";
import orderSlice from "./features/customer/orderSlice.ts";
import cartSlice from "./features/customer/cartSlice.ts";
import couponSlice from "./features/customer/couponSlice.ts";
import homeCategorySlice from "./features/customer/homeCategorySlice.ts";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  products: productSlice,
  order: orderSlice,
  cart: cartSlice,
  coupon: couponSlice,
  homeCategory: homeCategorySlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AddDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AddDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
