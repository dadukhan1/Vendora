/** @format */

import { Card, Divider } from "@mui/material";
import TransactionTable from "../Transaction/TransactionTable";

const Payment = () => {
  return (
    <div>
      <div className='space-y-5'>
        <Card className='p-5 rounded-md space-y-4'>
          <h1>Total Earning</h1>
          <h1 className='font-bold text-xl pb-1'>$12,345.67</h1>
          <Divider />
          <p className='py-2'>
            Last Payment: <strong>0</strong>
          </p>
        </Card>
        <TransactionTable />
      </div>
    </div>
  );
};

export default Payment;
