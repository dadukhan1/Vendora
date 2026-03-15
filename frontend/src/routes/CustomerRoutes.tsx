/** @format */

import { Route, Routes } from "react-router";
import Footer from "../customer/Footer";
import Home from "../customer/pages/Home/Home";
import Products from "../customer/pages/Products/Products";
import ProductDetails from "../customer/pages/Products/ProductDetails/ProductDetails";
import Checkout from "../customer/pages/Checkout/Checkout";
import Navbar from "../customer/components/Navbar/Navbar";
import Profile from "../customer/pages/Profile/Profile";
import Cart from "../customer/pages/Cart/Cart";

const CustomerRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:categoryId' element={<Products />} />
        <Route
          path='/product-details/:categoryId/:name/:productId'
          element={<ProductDetails />}
        />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout/address' element={<Checkout />} />
        <Route path='/account/*' element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default CustomerRoutes;
