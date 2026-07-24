/** @format */

import { FormControlLabel, Dialog, DialogTitle, DialogContent, Radio, RadioGroup } from "@mui/material";
import AddressCard from "./AddressCard";
import { Add } from "@mui/icons-material";
import { useEffect, useState, type ChangeEvent } from "react";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";
import { useNavigate } from "react-router";
import {
  createCheckout,
  createOrder,
} from "../../../Redux Toolkit/features/customer/orderSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import { fetchAddresses } from "../../../Redux Toolkit/features/customer/addressSlice";
import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../../utils/sumCartItemPrice";

const GOLD = "#c9993a";
const DARK = "#0a0a0a";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("POD");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(e.target.value);
  };

  const handlePaymentMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const { cart } = useAppSelector((store) => store.cart);
  const { addresses } = useAppSelector((store) => store.address);
  const { cart: couponData, couponApplied } = useAppSelector(
    (store) => store.coupon,
  );

  const mrp = sumCartItemMrpPrice(cart?.cartItems ?? []);
  const selling = sumCartItemSellingPrice(cart?.cartItems ?? []);
  const shipping = mrp > 50 ? 0 : 5;
  const couponDiscount =
    couponApplied && typeof (couponData as any)?.discount === "number"
      ? Number((couponData as any).discount)
      : 0;
  const couponId =
    couponApplied && (couponData as any)?.couponId
      ? (couponData as any).couponId
      : undefined;

  const discountedSelling = Math.max(selling - couponDiscount, 0);
  const totalPayable = discountedSelling + shipping;

  const handlePayment = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

    const orderResult = await dispatch(
      createOrder({
        address: selectedAddress,
        paymentMethod: paymentMethod,
        paymentGateway: paymentMethod === "CARD" ? "stripe" : "pod",
        couponDiscount,
        couponId,
      }) as any,
    );
    const order = orderResult.payload;
    if (!order) return;

    if (paymentMethod === "POD") {
      alert("Order placed successfully! You will pay on delivery.");
      navigate("/account/orders");
      return;
    }

    const ordersArray = Array.isArray(order) ? order : [order];
    const orderIds = ordersArray.map((o: any) => o._id).join(",");

    const checkoutResult = await dispatch(
      createCheckout({
        orderId: orderIds,
        totalSellingPrice: totalPayable,
      }) as any,
    );
    if (checkoutResult.payload?.url) {
      window.location.href = checkoutResult.payload.url;
    }
  };

  useEffect(() => {
    dispatch(fetchAddresses());
  }, []);

  return (
    <div className="min-h-screen bg-white pt-12 px-5 sm:px-10 md:px-24 lg:px-40 pb-20 font-['Outfit']">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* ── Left: Address section ── */}
        <div className='lg:col-span-2 space-y-5'>
          {/* Header row */}
          <div className='flex justify-between items-center border-b border-[#f0ece6] pb-4'>
            <div className='flex items-center gap-3'>
              <span className='inline-block w-1.5 h-6 rounded-full' style={{ background: GOLD }} />
              <h2 className='text-[22px] font-bold text-[#0a0a0a] uppercase tracking-wide'>
                Select Delivery Address
              </h2>
            </div>
            <button
              onClick={() => setOpen(true)}
              className='flex items-center gap-1.5 text-[13px] font-bold text-[#c9993a]
                border-2 border-[#c9993a] px-4 py-2 rounded-xl hover:bg-[rgba(201,153,58,0.1)]
                transition-all duration-300 uppercase tracking-widest'
            >
              <Add fontSize='small' />
              Add New
            </button>
          </div>

          {/* Saved addresses */}
          <div className='space-y-4'>
            <p className='text-[12px] font-bold text-[#9ca3af] uppercase tracking-[0.2em]'>
              Saved Addresses
            </p>
            {addresses?.map((address: any) => (
              <AddressCard
                key={address._id}
                address={address}
                selectedValue={selectedAddress}
                handleChange={handleChange}
              />
            ))}
          </div>

          {/* Add address inline CTA */}
          <button
            onClick={() => setOpen(true)}
            className='w-full flex items-center justify-center gap-2 py-4
              border-2 border-dashed border-[#e5e7eb] rounded-2xl text-[14px] font-bold
              text-[#9ca3af] hover:border-[#c9993a] hover:text-[#c9993a]
              transition-colors bg-[#fafaf8] uppercase tracking-widest'
          >
            <Add fontSize='small' />
            Add New Address
          </button>
        </div>

        {/* ── Right: Payment + Pricing ── */}
        <div className='col-span-1 space-y-4'>
          {/* ✅ Payment Method Selection */}
          <div className='bg-white border border-[#f0ece6] rounded-2xl p-5 space-y-3.5'>
            <p className='text-[12px] font-bold uppercase tracking-[0.2em] text-[#9ca3af] mb-1'>
              Payment Method
            </p>
            <RadioGroup
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              name='payment-method'
            >
              <FormControlLabel
                value='POD'
                control={
                  <Radio
                    size='small'
                    sx={{
                      color: "#d1d5db",
                      "&.Mui-checked": { color: GOLD },
                    }}
                  />
                }
                label={
                  <span className='text-[14px] font-[600] font-[Outfit] text-[#0a0a0a]'>
                    Pay on Delivery
                  </span>
                }
              />
              <FormControlLabel
                value='CARD'
                control={
                  <Radio
                    size='small'
                    sx={{
                      color: "#d1d5db",
                      "&.Mui-checked": { color: GOLD },
                    }}
                  />
                }
                label={
                  <span className='text-[14px] font-[600] font-[Outfit] text-[#0a0a0a]'>
                    Card (Stripe)
                  </span>
                }
              />
            </RadioGroup>
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-[#f0ece6] rounded-2xl overflow-hidden">
            <div className="px-5 pt-5 pb-1">
              <p className="text-[11px] font-[800] font-[Outfit] text-[#9ca3af] uppercase tracking-[0.2em] mb-4">
                Order Summary
              </p>
              <PricingCard />
            </div>
            <div className="px-5 pb-5">
              <button
                onClick={handlePayment}
                disabled={!selectedAddress}
                className="w-full py-4 bg-[#0a0a0a] hover:bg-[#c9993a] text-white text-[14px] font-[700] font-[Outfit] rounded-xl tracking-[0.02em] shadow-lg hover:shadow-[0_8px_24px_rgba(201,153,58,0.3)] active:scale-[.99] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {paymentMethod === "POD" ? "Place Order" : "Proceed to Pay"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Add Address Dialog ── */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth='sm'
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "24px",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.12)",
              fontFamily: "Outfit, sans-serif",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'none' // The AddressForm already has its own built-in header, so we hide this one
          }}
        >
          Add New Address
        </DialogTitle>
        <DialogContent sx={{ pt: 3, px: 4, pb: 4 }}>
          <AddressForm paymentGateway='stripe' onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
