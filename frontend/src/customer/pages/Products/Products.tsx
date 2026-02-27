/** @format */

import { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import ProductCard from "./ProductCard";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import { getAllProducts } from "../../../Redux Toolkit/features/customer/productSlice";

const product = {
  images: [
    "https://images.unsplash.com/photo-1619516388835-2b60acc4049e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  sellerDetails: {
    bussinessName: "Rana Clothing",
  },
};

const Products = () => {
  const { products, totalPages } = useAppSelector((store) => store.products);
  const [sort, setSort] = useState("price_low");
  const { categoryId } = useParams();
  console.log("categoryid", categoryId);
  const dispatch = useAppDispatch();

  const handleSort = (e: any) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllProducts({}));
  }, []);

  return (
    <div className='z-10 mt-10'>
      <div>
        <h1 className='text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2'>
          womansarees
        </h1>
      </div>
      <div className='lg:flex'>
        <section className='hidden lg:block w-[20%] min-h-screen border-gray-300'>
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
            {products.length > 0 &&
              products.map((item, index) => (
                <div key={index}>
                  <ProductCard item={item} />
                </div>
              ))}
          </div>
          <div className='flex flex-col items-center justify-center p-5'>
            <Pagination count={totalPages} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
