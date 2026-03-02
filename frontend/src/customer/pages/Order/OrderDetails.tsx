/** @format */

import { Payment } from "@mui/icons-material";
import { Box, Button, Divider } from "@mui/material";
import OrderStepper from "./OrderStepper";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import { useEffect } from "react";
import {
  orderById,
  orderItemById,
} from "../../../Redux Toolkit/features/customer/orderSlice";
import { useParams } from "react-router";

const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const { orderItemId, orderId } = useParams();
  const { orderItem, currentOrder } = useAppSelector((store) => store.order);

  useEffect(() => {
    dispatch(orderItemById(orderItemId));
    dispatch(orderById(orderId));
  }, []);

  return (
    <Box className='space-y-5'>
      <section className='flex flex-col gap-5 justify-center items-center'>
        <img className='w-40' src={orderItem?.product?.images[0]} alt='' />
        <div className='text-sm space-y-1 text-center'>
          <h1>{"Rana g store"}</h1>
          <p>{"Turquoise Blue Stonework Satin Designer saree"}</p>
          <p>{"Size: FREE"}</p>
        </div>
      </section>
      <section className='bordere border-gray-200'>
        <OrderStepper />
      </section>
      <section className='bordere border-gray-200'>
        <h1 className='font-bold pb-3'>Delivery Address</h1>
        <div className='text-sm space-y-2'>
          <div className='flex gap-5 font-medium'>
            {/* <p>{order?.user?.fullName}</p> */}
            <Divider flexItem orientation='vertical' />
            <p>0876786780</p>
          </div>
          <p>
            {currentOrder?.shippingAddress?.address}
            {currentOrder?.shippingAddress?.locality}
            {currentOrder?.shippingAddress?.city}
            {currentOrder?.shippingAddress?.state}
            {currentOrder?.shippingAddress?.pinCode}
          </p>
        </div>
      </section>
      <section className='border border-gray-200 space-y-4'>
        <div className='flex justify-between text-sm pt-5 px-5'>
          <div className='space-y-1'>
            <p className='font-black'>Total Item Price</p>
            <p>
              You saved{" "}
              <span className='text-green-400'>
                {currentOrder?.mrpPrice - currentOrder?.totalSellingPrice} on
                this item
              </span>
            </p>
          </div>
          <p>{currentOrder?.totalSellingPrice}</p>
        </div>
        <div className='px-5'>
          <div className='bg-teal-50 p-4 text-xs font-medium flex items-center gap-3'>
            <Payment />
            <p>Pay on Delivery</p>
          </div>
        </div>
        <div className='px-5 pt-5'>
          <p className='text-xs'>
            <strong>Sold By : </strong> Pablo Clothing
          </p>
        </div>
        <div className='p-10'>
          <Button fullWidth variant='outlined'>
            Cancel Order
          </Button>
        </div>
      </section>
    </Box>
  );
};

export default OrderDetails;
