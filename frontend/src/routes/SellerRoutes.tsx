/** @format */

import { Route, Routes } from "react-router";
import Homepage from "../seller/Homepage/Homepage";
import AddProducts from "../seller/Products/AddProducts";
import Products from "../seller/Products/Products";
import Orders from "../seller/Orders/Orders";
import Account from "../seller/Account/Account";
import Payment from "../seller/Payment/Payment";
import Transaction from "../seller/Transaction/Transaction";

const SellerRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/products' element={<Products />} />
      <Route path='/add-product' element={<AddProducts />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/account' element={<Account />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='/transaction' element={<Transaction />} />
    </Routes>
  );
};

export default SellerRoutes;
