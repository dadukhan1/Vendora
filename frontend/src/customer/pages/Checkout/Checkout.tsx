/** @format */

import { FormControlLabel, Modal, Radio, RadioGroup } from "@mui/material";
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
import { sumCartItemSellingPrice } from "../../../utils/sumCartItemPrice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("POD"); // ✅ ADD

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

  const shipping = 299;
  const selling = sumCartItemSellingPrice(cart?.cartItems ?? []);
  const couponDiscount =
    couponApplied && typeof (couponData as any)?.discount === "number"
      ? Number((couponData as any).discount)
      : 0;
  const couponId =
    couponApplied && (couponData as any)?.couponId
      ? (couponData as any).couponId
      : undefined;

  const totalPayable = Math.max(selling - couponDiscount, 0) + shipping;

  const handlePayment = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

    // ✅ CREATE ORDER WITH PAYMENT METHOD
    const orderResult = await dispatch(
      createOrder({
        address: selectedAddress,
        paymentMethod: paymentMethod, // ✅ PASS PAYMENT METHOD
        paymentGateway: paymentMethod === "CARD" ? "stripe" : "pod",
        couponDiscount,
        couponId,
      }) as any,
    );
    const order = orderResult.payload;
    if (!order) return;

    // ✅ IF POD, NAVIGATE TO ORDERS PAGE
    if (paymentMethod === "POD") {
      alert("Order placed successfully! You will pay on delivery.");
      navigate("/account/orders");
      return;
    }

    // ✅ IF CARD, PROCEED TO STRIPE CHECKOUT
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
    <div className='min-h-screen bg-white pt-10 px-5 sm:px-10 md:px-24 lg:px-40 pb-20'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* ── Left: Address section ── */}
        <div className='lg:col-span-2 space-y-5'>
          {/* Header row */}
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-3'>
              <span className='inline-block w-1 h-5 rounded bg-gradient-to-b from-[#0F52FF] to-[#FF4F00]' />
              <h2 className='font-bold text-[#0F172A]'>
                Select Delivery Address
              </h2>
            </div>
            <button
              onClick={() => setOpen(true)}
              className='flex items-center gap-1.5 text-sm font-semibold text-[#0F52FF]
                border border-[#0F52FF] px-3 py-1.5 rounded-xl hover:bg-[#0F52FF]/10
                transition-colors'
            >
              <Add fontSize='small' />
              Add New
            </button>
          </div>

          {/* Saved addresses */}
          <div className='space-y-3'>
            <p className='text-xs font-semibold text-[#64748B] uppercase tracking-widest'>
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
            className='w-full flex items-center justify-center gap-2 py-3.5
              border border-dashed border-[#E2E8F0] rounded-2xl text-sm
              text-[#64748B] hover:border-[#0F52FF] hover:text-[#0F52FF]
              transition-colors bg-[#F8FAFC]'
          >
            <Add fontSize='small' />
            Add New Address
          </button>
        </div>

        {/* ── Right: Payment + Pricing ── */}
        <div className='lg:col-span-1 space-y-4'>
          {/* ✅ Payment Method Selection */}
          <div className='bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-5 py-4'>
            <p className='text-xs font-bold uppercase tracking-widest text-[#64748B] mb-3'>
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
                      color: "#94A3B8",
                      "&.Mui-checked": { color: "#0F52FF" },
                    }}
                  />
                }
                label={
                  <span className='text-sm font-medium text-[#0F172A]'>
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
                      color: "#94A3B8",
                      "&.Mui-checked": { color: "#0F52FF" },
                    }}
                  />
                }
                label={
                  <span className='text-sm font-medium text-[#0F172A]'>
                    Card (Stripe)
                  </span>
                }
              />
            </RadioGroup>
          </div>

          {/* Pricing + Checkout */}
          <div className='bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl overflow-hidden'>
            <PricingCard />
            <div className='px-5 pb-5'>
              <button
                onClick={handlePayment}
                disabled={!selectedAddress}
                className='w-full py-3.5 bg-[#0F52FF] text-white text-sm font-bold
    rounded-xl tracking-wide shadow-[0_4px_20px_rgba(15,82,255,0.28)]
    hover:opacity-90 active:scale-[.98] transition-all duration-150
    disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
    disabled:active:scale-100'
              >
                {paymentMethod === "POD" ? "Place Order" : "Proceed to Pay"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Address Form Modal ── */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[95vw] max-w-[520px] bg-white rounded-2xl shadow-2xl p-6
            outline-none max-h-[90vh] overflow-y-auto'
        >
          <AddressForm paymentGateway='stripe' onClose={() => setOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default Checkout;
