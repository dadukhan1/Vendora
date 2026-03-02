/** @format */

import { useNavigate } from "react-router";
import OrderItemCard from "./OrderItemCard";
import { useDispatch } from "react-redux";
import { orderHistory } from "../../../Redux Toolkit/features/customer/orderSlice";
import { useEffect } from "react";
import { useAppSelector } from "../../../Redux Toolkit/store";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useAppSelector((store) => store.order);

  useEffect(() => {
    dispatch(orderHistory());
  }, [dispatch]);

  return (
    <div className='text-sm min-h-screen'>
      <div className='pb-5'>
        <h1 className='font-semibold'>All Orders</h1>
        <p>from anytime</p>
      </div>

      <div className='space-y-1'>
        {orders?.map((order, index) =>
          order?.orderItems?.map((orderItem) => (
            <OrderItemCard
              orderItem={orderItem}
              order={order}
              key={orderItem._id}
            />
          )),
        )}
      </div>
    </div>
  );
};

export default Order;
