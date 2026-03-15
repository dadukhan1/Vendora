/** @format */

import { useEffect } from "react";
import CartItemCard from "./CartItemCard";
import {
  Favorite,
  LocalOffer,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import PricingCard from "./PricingCard";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import { fetchCart } from "../../../Redux Toolkit/features/customer/cartSlice";
import { useNavigate } from "react-router";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((store) => store.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const itemCount = cart?.cartItems?.length ?? 0;

  return (
    <div className='min-h-screen pt-10 px-5 sm:px-10 md:px-20 lg:px-40 pb-20'>
      {/* Page heading */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-[#0F172A]'>Your Cart</h1>
        {itemCount > 0 && (
          <p className='text-sm text-[#64748B] mt-1'>
            {itemCount} item{itemCount > 1 ? "s" : ""} in your cart
          </p>
        )}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* ── Cart items ── */}
        <div className='lg:col-span-2 space-y-3'>
          {itemCount > 0 ? (
            cart.cartItems.map((item, index) => (
              <CartItemCard key={index} item={item} />
            ))
          ) : (
            <div
              className='flex flex-col items-center justify-center py-24 bg-white
              border border-[#E2E8F0] rounded-2xl text-center gap-4'
            >
              <ShoppingCartOutlined className='!text-[#E2E8F0] !text-[72px]' />
              <p className='text-lg font-semibold text-[#0F172A]'>
                Your cart is empty
              </p>
              <p className='text-sm text-[#64748B]'>Add items to get started</p>
            </div>
          )}
        </div>

        {/* ── Right sidebar ── */}
        <div className='col-span-1 space-y-4'>
          {/* Coupon */}
          <div className='bg-white border border-[#E2E8F0] rounded-2xl px-5 py-4 space-y-3'>
            <div className='flex items-center gap-2 text-[#0F52FF]'>
              <LocalOffer style={{ fontSize: 16 }} />
              <span className='text-sm font-semibold text-[#0F172A]'>
                Apply Coupon
              </span>
            </div>
            <div className='flex gap-2'>
              <TextField
                placeholder='Coupon code'
                size='small'
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    fontSize: 13,
                    "& fieldset": { borderColor: "#E2E8F0" },
                    "&:hover fieldset": { borderColor: "#94A3B8" },
                    "&.Mui-focused fieldset": { borderColor: "#0F52FF" },
                  },
                }}
              />
              <button
                disabled={itemCount === 0}
                className='px-4 text-sm font-semibold text-[#0F52FF] border border-[#0F52FF]
                rounded-[10px] hover:bg-[#0F52FF]/10 transition-colors whitespace-nowrap
                disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent'
              >
                Apply
              </button>
            </div>
          </div>

          {/* Pricing + Buy Now */}
          <div className='bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden'>
            <PricingCard />
            <div className='px-5 pb-5'>
              <button
                disabled={itemCount === 0}
                onClick={() => navigate("/checkout/address")}
                className='w-full py-3.5 bg-[#0F52FF] text-white text-sm font-bold
                  rounded-xl tracking-wide shadow-[0_4px_20px_rgba(15,82,255,0.30)]
                  hover:opacity-90 active:scale-[.98] transition-all duration-150
                  disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none'
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

          {/* Add from Wishlist */}
          <div
            className='bg-white border border-[#E2E8F0] rounded-2xl px-5 py-4
            flex justify-between items-center cursor-pointer hover:border-[#FF4F00]/40
            transition-colors group'
          >
            <span className='text-sm font-medium text-[#0F172A] group-hover:text-[#FF4F00] transition-colors'>
              Add from Wishlist
            </span>
            <Favorite className='!text-[#FF4F00] !text-[20px]' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
