/** @format */

import { Divider } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../../utils/sumCartItemPrice";
import { fetchCart } from "../../../Redux Toolkit/features/customer/cartSlice";

const PricingCard = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((store) => store.cart);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (!cart) return null;

  return (
    <div className=''>
      <div className='space-y-3 p-5'>
        <div className='flex justify-between items-center'>
          <span>Subtotal</span>
          <span>{sumCartItemMrpPrice(cart?.cartItems)}</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>Discount</span>
          <span>
            {sumCartItemMrpPrice(cart?.cartItems ?? []) -
              sumCartItemSellingPrice(cart?.cartItems ?? [])}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <span>Shipping</span>
          <span>{299}</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>Platform Fee</span>
          <span>Free</span>
        </div>
      </div>
      <Divider />
      <div className='flex justify-between items-center font-medium px-5 py-2'>
        <span>Total </span>
        <span>{sumCartItemSellingPrice(cart?.cartItems ?? []) + 299}</span>
      </div>
    </div>
  );
};

export default PricingCard;
