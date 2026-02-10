/** @format */

import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Divider, IconButton } from "@mui/material";

const CartItemCard = () => {
  return (
    <div className='border border-gray-300 rounded-md relative'>
      <div className='p-5 flex gap-3'>
        <img
          className='w-[90px] rounded-md'
          src='https://images.unsplash.com/photo-1619516388835-2b60acc4049e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
        />
        <div className='space-y-2 m-1'>
          <h1 className='font-semibold text-lg'>Zosh Clothing</h1>
          <p className='text-gray-600 font-medium text-sm'>
            Turquoise Blue Stonework Stain Designer Saree
          </p>
          <p className='text-gray-400 text-xs'>
            <strong>Sold by:</strong> Natural Lifestyle Products Private Limited
          </p>
          <p className='text-xs'>
            <strong>7 days replacement</strong> available
          </p>
          <p className='text-xm text-gray-500'>
            <strong>Quantity</strong> : 2
          </p>
        </div>
      </div>
      <Divider />
      <div className='px-5 py-2 flex justify-between items-center'>
        <div className='flex items-center gap-2 w-[140px] justify-between'>
          <Button size='small'>
            <Remove />
          </Button>
          <span className='px-3 font-semibold'>{2}</span>
          <Button size='small'>
            <Add />
          </Button>
        </div>
        <div>
          <p className='text-gray-700 font-semibold'>3999</p>
        </div>
      </div>
      <div className='absolute top-1 right-1'>
        <IconButton color='primary'>
          <Close />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItemCard;
