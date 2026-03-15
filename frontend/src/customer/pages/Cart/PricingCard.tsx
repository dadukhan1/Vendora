/** @format */

import { useEffect } from "react";
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

  const mrp = sumCartItemMrpPrice(cart?.cartItems ?? []);
  const selling = sumCartItemSellingPrice(cart?.cartItems ?? []);
  const discount = mrp - selling;
  const shipping = 299;
  const total = selling + shipping;

  const rows = [
    { label: "Subtotal",     value: `$${mrp}`,                color: "text-[#0F172A]" },
    { label: "Discount",     value: `-$${discount}`,          color: "text-green-600" },
    { label: "Shipping",     value: `$${shipping}`,           color: "text-[#0F172A]" },
    { label: "Platform Fee", value: "Free",                    color: "text-green-600" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-[#E2E8F0]">
        <p className="text-xs font-bold uppercase tracking-widest text-[#64748B]">
          Price Summary
        </p>
      </div>

      {/* Rows */}
      <div className="px-5 py-4 space-y-3">
        {rows.map(({ label, value, color }) => (
          <div key={label} className="flex justify-between items-center text-sm">
            <span className="text-[#64748B]">{label}</span>
            <span className={`font-medium ${color}`}>{value}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mx-5 mb-5 flex justify-between items-center
        bg-[#0F52FF]/5 border border-[#0F52FF]/20 rounded-xl px-4 py-3">
        <span className="text-sm font-bold text-[#0F172A]">Total</span>
        <span className="text-base font-extrabold text-[#0F52FF]">${total}</span>
      </div>
    </div>
  );
};

export default PricingCard;