/** @format */

import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router";

const OrderItemCard = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/account/orders/1/item/1")}
      className='text-sm bg-white border border-gray-200 p-5 space-y-4 rounded-md cursor-pointer'
    >
      <div className='flex items-center gap-3'>
        <Avatar sizes='small' sx={{ bgcolor: "#00927c" }}>
          <ElectricBolt />
        </Avatar>
      </div>
      <div>
        <h1 className='font-bold text-teal-600'>PENDING</h1>
        <p>Arriving by 12/12/2024</p>
      </div>
      <div className='p-5 bg-teal-50 flex gap-3 rounded-md'>
        <div className=''>
          <img
            className='w-17.5 '
            src='https://images.unsplash.com/photo-1770860354865-415bd1e5af6d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
          />
        </div>
        <div className='w-full space-y-2 '>
          <h1 className='font-bold'>zosh bazaar</h1>
          <p>Turqouise Blue stonework stain designer saree</p>
          <p>
            <strong>size : </strong> FREE
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
