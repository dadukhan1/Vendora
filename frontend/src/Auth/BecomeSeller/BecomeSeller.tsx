/** @format */

import { Button } from "@mui/material";
import { useState } from "react";
import SellerLogin from "./SellerLogin";
import SellerAccountForm from "./SellerAccountForm";

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className='grid md:gap-10 grid-cols-3 min-h-screen'>
      <section className='lg:col-span-1 md:col-span-2 col-span-3 shadow-lg rounded-b-md p-6'>
        {isLogin ? <SellerLogin /> : <SellerAccountForm />}

        <div className='mt-10 space-y-10'>
          <h1 className='text-center text-sm font-medium'>Have Account</h1>
          <Button
            fullWidth
            variant='outlined'
            sx={{ py: "12px" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </Button>
        </div>
      </section>
      <section className='hidden md:block md:col-span-1 lg:col-span-2'>
        <img
          src='https://images.unsplash.com/photo-1737038708291-9ab4007eadce?q=80&w=875&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='become seller'
          className='w-full h-full object-cover rounded-md'
        />
      </section>
    </div>
  );
};

export default BecomeSeller;
