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
import sellerAthSlice from "./features/seller/sellerAuth.ts";
import sellerOrderSlice from "./features/seller/sellerOrderSlice.ts";
import sellerProductsSlice from "./features/seller/sellerProductsSlice.ts";
import sellerSlice from "./features/seller/sellerSlice.ts";
import transactionSlice from "./features/seller/transactionSlice.ts";
import adminSlice from "./features/admin/adminSlice.ts";
import couponAdminSlice from "./features/admin/couponSlice.ts";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  products: productSlice,
  order: orderSlice,
  cart: cartSlice,
  coupon: couponSlice,
  homeCategory: homeCategorySlice,

  sellerAuth: sellerAthSlice,
  sellerOrder: sellerOrderSlice,
  sellerProduct: sellerProductsSlice,
  seller: sellerSlice,

  transaction: transactionSlice,

  admin: adminSlice,
  adminCoupon: couponAdminSlice,
  
});

const store = configureStore({
  reducer: rootReducer,
});

export type AddDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AddDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
