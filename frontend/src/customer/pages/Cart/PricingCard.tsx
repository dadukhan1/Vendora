/** @format */

import { useAppSelector } from "../../../Redux Toolkit/store";
import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../../utils/sumCartItemPrice";

type PricingCardProps = {
  cart?: any;
};

const PricingCard = ({ cart: cartProp }: PricingCardProps) => {
  const { cart: storeCart } = useAppSelector((store) => store.cart);
  const { cart: couponData, couponApplied } = useAppSelector(
    (store) => store.coupon,
  );
  const cart = cartProp || storeCart;

  if (!cart) return null;

  const mrp = sumCartItemMrpPrice(cart?.cartItems ?? []);
  const selling = sumCartItemSellingPrice(cart?.cartItems ?? []);
  const productDiscount = mrp - selling;
  const shipping = mrp > 50 ? 0 : 5;

  const couponDiscount =
    couponApplied && typeof (couponData as any)?.discount === "number"
      ? Number((couponData as any).discount)
      : 0;
  const discountedSelling = Math.max(selling - couponDiscount, 0);
  const total = discountedSelling + shipping;

  const rows = [
    { label: "Subtotal", value: `$${mrp}`, color: "text-[#0a0a0a]" },
    {
      label: "Discount",
      value: `-$${productDiscount}`,
      color: "text-[#2d6a4f]",
    },
    ...(couponDiscount > 0
      ? [
          {
            label: "Coupon Discount",
            value: `-$${couponDiscount}`,
            color: "text-[#2d6a4f]",
          },
        ]
      : []),
    { label: "Shipping", value: shipping === 0 ? "Free" : `$${shipping}`, color: shipping === 0 ? "text-[#2d6a4f]" : "text-[#0a0a0a]" },
    { label: "Platform Fee", value: "Free", color: "text-[#2d6a4f]" },
  ];

  return (
    <div>
      {/* Rows */}
      <div className="py-2 space-y-3.5">
        {rows.map(({ label, value, color }) => (
          <div
            key={label}
            className="flex justify-between items-center text-[13px] font-[500] font-[Outfit]"
          >
            <span className="text-[#9ca3af]">{label}</span>
            <span className={`font-[700] ${color}`}>{value}</span>
          </div>
        ))}
      </div>

      <div className="my-4 border-t border-[#f0ece6] border-dashed" />

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-[14px] font-[700] font-[Outfit] text-[#0a0a0a]">Total Amount</span>
          <p className="text-[10px] text-[#c4bdb4]">Includes all taxes and platform fees</p>
        </div>
        <span className="text-[18px] font-[800] font-[Outfit] text-[#0a0a0a]">
          ${total}
        </span>
      </div>
    </div>
  );
};

export default PricingCard;
