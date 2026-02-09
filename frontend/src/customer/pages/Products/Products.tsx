/** @format */

import { useState } from "react";
import FilterSection from "./FilterSection";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ProductCard from "./ProductCard";

const product = {
  images: [
    "https://images.unsplash.com/photo-1619516388835-2b60acc4049e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  sellerDetails: {
    bussinessName: "Rana Clothing",
  },
};

const Products = () => {
  const [sort, setSort] = useState("price_low");

  const handleSort = (e: any) => {
    setSort(e.target.value);
  };

  return (
    <div className='z-10 mt-10'>
      <div>
        <h1 className='text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2'>
          womansarees
        </h1>
      </div>
      <div className='lg:flex'>
        <section className='border-r hidden lg:block w-[20%] min-h-screen border-gray-300'>
          <FilterSection />
        </section>

        <section className='lg:w-[80%] space-y-5'>
          <div className='flex justify-between items-center px-9 h-10'>
            <div></div>
            <FormControl>
              <InputLabel id='demo-simple-select-label'>Sort</InputLabel>
              <Select
                labelId='sort'
                id='sort'
                value={sort}
                label='Sort'
                onChange={handleSort}
              >
                <MenuItem value={"price_low"}>Price : Low to High</MenuItem>
                <MenuItem value={"price_high"}>Price : Hight to low</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center mt-5'>
            {[1, 1, 1, 1, 1].map((item, index) => (
              <div key={index}>
                <ProductCard item={product} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
