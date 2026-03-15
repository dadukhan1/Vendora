/** @format */

import { Add, Close, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAppDispatch } from "../../../Redux Toolkit/store";
import {
  deleteCartItem,
  updateCartItem,
} from "../../../Redux Toolkit/features/customer/cartSlice";

const CartItemCard = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleUpdateCartItem = (quantity: number) => {
    dispatch(updateCartItem({ cartItemId: item?._id, quantity }));
  };

  const handleDeleteCartItem = () => {
    dispatch(deleteCartItem(item?._id));
  };

  return (
    <div className='bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl relative overflow-hidden'>
      {/* Delete button */}
      <div className='absolute top-2 right-2'>
        <IconButton
          onClick={handleDeleteCartItem}
          size='small'
          sx={{
            color: "#94A3B8",
            "&:hover": { color: "#FF4F00", background: "rgba(255,79,0,0.08)" },
          }}
        >
          <Close fontSize='small' />
        </IconButton>
      </div>

      {/* Main content */}
      <div className='p-4 flex gap-4 pr-10'>
        <img
          src={item.product?.images[0]}
          alt=''
          className='w-20 h-20 rounded-xl object-cover flex-shrink-0'
        />
        <div className='space-y-1 min-w-0'>
          <p className='text-xs font-bold text-[#0F52FF] uppercase tracking-wide'>
            Zosh Clothing
          </p>
          <h2 className='font-semibold text-[#0F172A] text-sm leading-snug truncate'>
            {item?.product?.title}
          </h2>
          <p className='text-[#94A3B8] text-xs truncate'>
            Sold by: Natural Lifestyle Products Pvt. Ltd.
          </p>
          <p className='text-[#64748B] text-xs'>
            <span className='font-semibold text-[#0F172A]'>7 days</span>{" "}
            replacement available
          </p>
        </div>
      </div>

      {/* Footer: qty + price */}
      <div className='border-t border-[#E2E8F0] px-4 py-3 flex items-center justify-between'>
        {/* Stepper */}
        <div className='flex items-center border border-[#E2E8F0] rounded-xl overflow-hidden bg-white'>
          <button
            disabled={item?.quantity === 1}
            onClick={() => handleUpdateCartItem(item?.quantity - 1)}
            className='px-3 py-1.5 text-[#0F52FF] disabled:text-[#E2E8F0]
              hover:bg-[#F8FAFC] transition-colors border-none bg-transparent cursor-pointer'
          >
            <Remove fontSize='small' />
          </button>
          <span className='px-3 text-sm font-bold text-[#0F172A]'>
            {item?.quantity}
          </span>
          <button
            onClick={() => handleUpdateCartItem(item?.quantity + 1)}
            className='px-3 py-1.5 text-[#0F52FF] hover:bg-[#F8FAFC]
              transition-colors border-none bg-transparent cursor-pointer'
          >
            <Add fontSize='small' />
          </button>
        </div>

        {/* Price */}
        <p className='text-base font-bold text-[#0F172A]'>
          ${item?.product?.sellingPrice}
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
