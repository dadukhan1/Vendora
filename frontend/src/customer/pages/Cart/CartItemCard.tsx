/** @format */

import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Divider, IconButton } from "@mui/material";
import { useAppDispatch } from "../../../Redux Toolkit/store";
import {
  deleteCartItem,
  updateCartItem,
} from "../../../Redux Toolkit/features/customer/cartSlice";

const CartItemCard = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleUpdateCartItem = (quantity) => {
    dispatch(updateCartItem({ cartItemId: item?._id, quantity }));
  };
  const handleDeleteCartItem = () => {
    dispatch(deleteCartItem(item?._id));
  };

  return (
    <div className='border border-gray-300 rounded-md relative'>
      <div className='p-5 flex gap-3'>
        <img
          className='w-[90px] rounded-md'
          src={item.product?.images[0]}
          alt=''
        />
        <div className='space-y-2 m-1'>
          <h1 className='font-semibold text-lg'>Zosh Clothing</h1>
          <p className='text-gray-600 font-medium text-sm'>
            {item?.product?.title}
          </p>
          <p className='text-gray-400 text-xs'>
            <strong>Sold by:</strong> Natural Lifestyle Products Private Limited
          </p>
          <p className='text-xs'>
            <strong>7 days replacement</strong> available
          </p>
          <p className='text-xm text-gray-500'>
            <strong>Quantity</strong> : {item?.quantity}
          </p>
        </div>
      </div>
      <Divider />
      <div className='px-5 py-2 flex justify-between items-center'>
        <div className='flex items-center gap-2 w-[140px] justify-between'>
          <Button
            disabled={item?.quantity === 1}
            onClick={() => handleUpdateCartItem(item?.quantity - 1)}
            size='small'
          >
            <Remove />
          </Button>
          <span className='px-3 font-semibold'>{item?.quantity}</span>
          <Button
            onClick={() => handleUpdateCartItem(item?.quantity + 1)}
            size='small'
          >
            <Add />
          </Button>
        </div>
        <div>
          <p className='text-gray-700 font-semibold'>
            {item?.product?.sellingPrice}
          </p>
        </div>
      </div>
      <div className='absolute top-1 right-1'>
        <IconButton onClick={() => handleDeleteCartItem()} color='primary'>
          <Close />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItemCard;
