/** @format */

import { Card, Divider } from "@mui/material";
import TransactionTable from "../Transaction/TransactionTable";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import { fetchSellerTransactions } from "../../Redux Toolkit/features/seller/transactionSlice";
import { useEffect } from "react";

const Payment = () => {
  const { totalEarnings, transactions } = useAppSelector(
    (store) => store.transaction,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSellerTransactions());
  }, [dispatch]);
  return (
    <div>
      <div className='space-y-5'>
        <Card className='p-5 rounded-md space-y-4'>
          <h1>Total Earning</h1>
          <h1 className='font-bold text-xl pb-1'>${totalEarnings}</h1>
          <Divider />
          <p className='py-2'>
            Last Payment: <strong>{transactions[0]?.amount}</strong>
          </p>
        </Card>
        <TransactionTable />
      </div>
    </div>
  );
};

export default Payment;
