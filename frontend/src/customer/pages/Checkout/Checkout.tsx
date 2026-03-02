/** @format */

import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
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
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../Redux Toolkit/store";
import { fetchAddresses } from "../../../Redux Toolkit/features/customer/addressSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedAddress, setSelectedAddress] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(e.target.value);
  };

  const { cart } = useAppSelector((store) => store.cart);
  const { addresses } = useAppSelector((store) => store.address);
  const { currentOrder } = useAppSelector((store) => store.order); // 👈 currentOrder lo

  const handlePayment = async () => {
    if (!selectedAddress) {
      alert("Pehle address select karo!");
      return;
    }

    // Step 1 - pehle order banao
    const orderResult = await dispatch(
      createOrder({
        address: selectedAddress,
        paymentGateway: "stripe",
      }) as any,
    );

    const order = orderResult.payload;
    console.log("Order created:", order);

    if (!order) {
      console.error("Order doesn't created!");
      return;
    }

    console.log(
      "before ------------------------------ ",
      order._id,
      order.totalSellingPrice,
    );

    console.log("starting checking out");
    // Step 2 - phir checkout session banao
    const checkoutResult = await dispatch(
      createCheckout({
        orderId: order._id,
        totalSellingPrice: order.totalSellingPrice,
      }) as any,
    );

    console.log("Checkout result:", checkoutResult.payload);

    if (checkoutResult.payload?.url) {
      window.location.href = checkoutResult.payload.url; // ✅ Stripe pe bhejo
    }
  };

  useEffect(() => {
    dispatch(fetchAddresses());
  }, []);

  return (
    <div className='pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen'>
      <div className='space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9'>
        <div className='col-span-2 space-y-5'>
          <div className='flex justify-between items-center'>
            <span className='font-semibold'>Select Delivery Address</span>
            <Button onClick={handleOpen} variant='outlined'>
              Add New Address
            </Button>
          </div>
          <div className='text-xs font-medium space-y-5'>
            <p>Saved Addresses</p>
            <div className='space-y-3'>
              {addresses?.map((address: any) => (
                <AddressCard
                  address={address}
                  selectedValue={selectedAddress}
                  handleChange={handleChange}
                  key={address._id}
                />
              ))}
            </div>
            <div className='py-4 px-5 rounded-md border border-gray-300'>
              <Button startIcon={<Add />}>Add New Address</Button>
            </div>
          </div>
        </div>
        <div className='col-span-1 text-sm space-y-3'>
          <section className='space-y-3 border p-5 rounded-lg'>
            <h1 className='text-teal-600 font-medium pb-2 text-center'>
              Choose Payment Gateway
            </h1>
            <RadioGroup defaultValue='stripe' name='stripe'>
              <FormControlLabel
                value='stripe'
                control={<Radio />}
                label='Stripe'
              />
            </RadioGroup>
          </section>
          <section className='border border-gray-300 rounded-lg'>
            <PricingCard />
            <div className='p-5'>
              <Button
                onClick={handlePayment}
                variant='contained'
                fullWidth
                sx={{ py: "12px" }}
              >
                Checkout
              </Button>
            </div>
          </section>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <AddressForm paymentGateway={"stripe"} />
        </Box>
      </Modal>
    </div>
  );
};

export default Checkout;
