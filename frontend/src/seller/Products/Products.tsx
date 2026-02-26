/** @format */

import { useEffect } from "react";
import { useAppDispatch } from "../../Redux Toolkit/store";
import ProductTable from "./ProductTable";
import { fetchSellerProducts } from "../../Redux Toolkit/features/seller/sellerProductsSlice";

const Products = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, []);

  return (
    <>
      <h1 className='pb-5 font-bold text-2xl'>All Products</h1>
      <ProductTable />
    </>
  );
};

export default Products;
