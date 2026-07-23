/** @format */

import { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import { Favorite, LocalOffer, ShoppingBag } from "@mui/icons-material";
import PricingCard from "./PricingCard";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import { fetchCart } from "../../../Redux Toolkit/features/customer/cartSlice";
import { applyCoupon } from "../../../Redux Toolkit/features/customer/couponSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

type CartItem = {
  _id?: string;
  quantity: number;
  product?: {
    title?: string;
    sellingPrice?: number | string;
    images?: string[];
  };
};

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((store) => store.cart);
  const couponState = useAppSelector((store) => store.coupon);

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (couponState?.couponApplied) {
      setCouponApplied(true);
      toast.success("Coupon applied!");
      dispatch(fetchCart());
    }
    if (couponState?.error) {
      toast.error(couponState?.error);
    }
  }, [couponState?.couponApplied, couponState?.error, dispatch]);

  const itemCount = cart?.cartItems?.length ?? 0;

  const cartTotal =
    typeof cart?.cartTotal === "number"
      ? cart.cartTotal
      : (cart?.cartItems?.reduce(
          (sum: number, item: CartItem) =>
            sum + Number(item?.product?.sellingPrice ?? 0) * Number(item.quantity),
          0,
        ) ?? 0);

  const handleApplyCoupon = async () => {
    if (!couponCode?.trim()) {
      toast.error("Please enter a coupon code.");
      return;
    }
    try {
      await dispatch(applyCoupon({ couponCode: couponCode.trim(), cartTotal })).unwrap();
    } catch (e: any) {
      toast.error(e.message || "Failed to apply coupon");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] pt-8 px-4 sm:px-8 lg:px-16 pb-24">
      {/* Page Heading */}
      <div className="mb-8 lg:mb-10">
        <p className="section-eyebrow mb-2">Your Selection</p>
        <h1 className="section-title text-[28px] lg:text-[38px]">Shopping Cart</h1>
        {itemCount > 0 && (
          <p className="text-[13px] text-[#9ca3af] mt-1.5 font-[Outfit]">
            {itemCount} item{itemCount > 1 ? "s" : ""} in your cart
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* ── Cart Items ── */}
        <div className="lg:col-span-2 space-y-3">
          {itemCount > 0 ? (
            cart.cartItems.map((item: CartItem, index: number) => (
              <CartItemCard key={index} item={item} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-28 bg-white border border-[#f0ece6] rounded-3xl text-center gap-5">
              <div className="w-20 h-20 rounded-full bg-[#f5f3ef] flex items-center justify-center">
                <ShoppingBag sx={{ fontSize: 36, color: "#d4c4a8" }} />
              </div>
              <div>
                <p className="text-[16px] font-[700] font-[Outfit] text-[#1a1a1a] mb-1">
                  Your cart is empty
                </p>
                <p className="text-[13px] text-[#9ca3af]">
                  Discover our curated collections and add items to get started
                </p>
              </div>
              <button
                onClick={() => navigate("/products/all")}
                className="btn-primary mt-2"
              >
                Browse Shop
              </button>
            </div>
          )}
        </div>

        {/* ── Right Sidebar ── */}
        <div className="col-span-1 space-y-4">
          {/* Coupon Card */}
          <div className="bg-white border border-[#f0ece6] rounded-2xl p-5 space-y-3.5">
            <div className="flex items-center gap-2">
              <LocalOffer sx={{ fontSize: 16, color: "#c9993a" }} />
              <span className="text-[13px] font-[700] font-[Outfit] text-[#1a1a1a]">
                Have a coupon?
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter code"
                disabled={itemCount === 0 || couponApplied}
                className="flex-1 px-4 py-2.5 bg-[#f5f3ef] border border-[#f0ece6] rounded-xl text-[13px] font-[600] font-[Outfit] text-[#0a0a0a] placeholder-[#c4bdb4] outline-none focus:border-[#c9993a] disabled:opacity-50 transition-colors"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={itemCount === 0 || couponApplied || couponState.loading || !couponCode.trim()}
                className="px-4 py-2.5 bg-[#0a0a0a] text-white text-[12px] font-[700] font-[Outfit] rounded-xl hover:bg-[#c9993a] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-250 whitespace-nowrap"
              >
                {couponState.loading ? "..." : couponApplied ? "✓ Applied" : "Apply"}
              </button>
            </div>
            {couponApplied && (
              <p className="text-[12px] text-[#2d6a4f] font-[600] font-[Outfit] flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#2d6a4f]/10 flex items-center justify-center text-[10px]">✓</span>
                Coupon applied successfully!
              </p>
            )}
            {couponState.error && (
              <p className="text-[12px] text-[#e03c54]">
                {typeof couponState.error === "string" ? couponState.error : "Invalid coupon code."}
              </p>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-[#f0ece6] rounded-2xl overflow-hidden">
            <div className="px-5 pt-5 pb-1">
              <p className="text-[11px] font-[800] font-[Outfit] text-[#9ca3af] uppercase tracking-[0.2em] mb-4">
                Order Summary
              </p>
              <PricingCard cart={cart} />
            </div>
            <div className="px-5 pb-5">
              <button
                disabled={itemCount === 0}
                onClick={() => navigate("/checkout/address")}
                className="w-full py-4 bg-[#0a0a0a] hover:bg-[#c9993a] text-white text-[14px] font-[700] font-[Outfit] rounded-xl tracking-[0.02em] shadow-lg hover:shadow-[0_8px_24px_rgba(201,153,58,0.3)] active:scale-[.99] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>

          {/* Wishlist CTA */}
          <div
            onClick={() => navigate("/wishlist")}
            className="flex justify-between items-center p-4 bg-white border border-[#f0ece6] rounded-2xl cursor-pointer hover:border-[#e03c54]/30 hover:bg-[#fff5f7] transition-all duration-250 group"
          >
            <span className="text-[13px] font-[600] font-[Outfit] text-[#1a1a1a] group-hover:text-[#e03c54] transition-colors">
              Add from Wishlist
            </span>
            <Favorite sx={{ fontSize: 18, color: "#e03c54" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
