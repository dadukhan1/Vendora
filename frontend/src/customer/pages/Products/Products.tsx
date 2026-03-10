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

const Products = () => {
  const { products, totalPages } = useAppSelector((store) => store.products);
  const [sort, setSort] = useState("price_low");
  const { categoryId } = useParams();
  const dispatch = useAppDispatch();

  const handleSort = (e: any) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllProducts({}));
  }, []);

  return (
    <div className='mt-10'>
      {/* Header */}
      <div className='text-center py-6 px-9'>
        <p className='text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase mb-2'>
          Collection
        </p>
        <h1 className='text-4xl font-bold text-gray-900 uppercase tracking-wide'>
          {categoryId || "Woman Sarees"}
        </h1>
        <div className='mt-3 mx-auto w-16 h-0.5 bg-gray-900 rounded-full' />
      </div>

      <div className='lg:flex'>
        {/* Filter Sidebar */}
        <section className='hidden lg:block w-[20%] min-h-screen border-r border-gray-100 px-4 pt-4'>
          <FilterSection />
        </section>

        {/* Products Section */}
        <section className='lg:w-[80%] space-y-5'>
          {/* Sort Bar */}
          <div className='flex justify-between items-center px-6 py-3 bg-gray-50 rounded-xl mx-5'>
            <p className='text-sm text-gray-500'>
              <span className='font-semibold text-gray-800'>
                {products.length}
              </span>{" "}
              products
            </p>
            <FormControl size='medium' sx={{ minWidth: 200 }}>
              <InputLabel id='sort-label'>Sort By</InputLabel>
              <Select
                labelId='sort-label'
                value={sort}
                label='Sort By'
                onChange={handleSort}
                sx={{ borderRadius: "10px", fontSize: "0.875rem" }}
              >
                <MenuItem value='price_low'>Price: Low to High</MenuItem>
                <MenuItem value='price_high'>Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Divider />

          {/* Product Grid */}
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 px-5 mt-5'>
            {products.length > 0 ? (
              products.map((item, index) => (
                <ProductCard key={index} item={item} />
              ))
            ) : (
              <div className='col-span-4 flex flex-col items-center justify-center py-24 text-gray-400'>
                <p className='text-lg font-medium'>No products found</p>
                <p className='text-sm mt-1'>Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className='flex justify-center py-10'>
            <Pagination
              count={totalPages}
              shape='rounded'
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: "8px",
                  fontWeight: 500,
                },
                "& .Mui-selected": {
                  backgroundColor: "#111 !important",
                  color: "#fff",
                },
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
