/** @format */

import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import AddressCard from "./AddressCard";
import { Add } from "@mui/icons-material";
import { useState, type ChangeEvent } from "react";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Checkout = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedAddress, setSelectedAddress] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(Number(e.target.value));
  };

  return (
    <div className='pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen'>
      <div className='space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9'>
        <div className='col-span-2 space-y-5'>
          <div className='flex justify-between items-center'>
            <span className='font-semibold'>Select Delivery Address</span>
            <Button onClick={handleOpen} variant='outlined'>
              Add New Address
            </Button>
          </div>
          <div className='text-xs font-medium space-y-5'>
            <p>Saved Addresses</p>
            <div className='space-y-3'>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <AddressCard
                  value={item}
                  selectedValue={selectedAddress}
                  handleChange={handleChange}
                  key={index}
                />
              ))}
            </div>
            <div className='py-4 px-5 rounded-md border border-gray-300'>
              <Button startIcon={<Add />}>Add New Address</Button>
            </div>
          </div>
        </div>
        <div className='col-span-1 text-sm space-y-3'>
          <section className='space-y-3 border p-5 rounded-md'>
            <h1 className='text-teal-600 font-medium pb-2 text-center'>
              Choose Payment Gateway
            </h1>
            <RadioGroup defaultValue='stripe' name='stripe'>
              <FormControlLabel
                value='stripe'
                control={<Radio />}
                label='Stripe'
              />
            </RadioGroup>
          </section>
          <section className='border border-gray-300'>
            <PricingCard />
            <div className='p-5'>
              <Button variant='contained' fullWidth sx={{ py: "12px" }}>
                Checkout
              </Button>
            </div>
          </section>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <AddressForm />
        </Box>
      </Modal>
    </div>
  );
};

export default Checkout;
