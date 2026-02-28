/** @format */

import { Divider } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../Redux Toolkit/store";
import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../../utils/sumCartItemPrice";

const PricingCard = () => {
  const { cart } = useAppSelector((store) => store.cart);
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
            {sumCartItemMrpPrice(cart?.cartItems) -
              sumCartItemSellingPrice(cart?.cartItems)}
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
        <span>{sumCartItemSellingPrice(cart?.cartItems) + 299}</span>
      </div>
    </div>
  );
};

export default PricingCard;
