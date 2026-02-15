/** @format */

import { Payment } from "@mui/icons-material";
import { Box, Button, Divider } from "@mui/material";
import OrderStepper from "./OrderStepper";

const OrderDetails = () => {
  return (
    <Box className='space-y-5'>
      <section className='flex flex-col gap-5 justify-center items-center'>
        <img
          className='w-40'
          src='https://images.unsplash.com/photo-1610300433938-afbffd42b040?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D'
          alt=''
        />
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
            <p>Pablo Reeze </p>
            <Divider flexItem orientation='vertical' />
            <p>0876786780</p>
          </div>
          <p>Dummy address NYC new city</p>
        </div>
      </section>
      <section className='border border-gray-200 space-y-4'>
        <div className='flex justify-between text-sm pt-5 px-5'>
          <div className='space-y-1'>
            <p className='font-black'>Total Item Price</p>
            <p>
              You saved{" "}
              <span className='text-green-400'>75000 on this item</span>
            </p>
          </div>
          <p>12632</p>
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
