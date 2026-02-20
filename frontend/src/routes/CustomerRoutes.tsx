/** @format */

import { Route, Routes } from "react-router";
import Footer from "../customer/Footer";
import Home from "../customer/pages/Home/Home";
import Products from "../customer/pages/Products/Products";
import ProductDetails from "../customer/pages/Products/ProductDetails/ProductDetails";
import CartItemCard from "../customer/pages/Cart/CartItemCard";
import Checkout from "../customer/pages/Checkout/Checkout";
import ProfileFieldCard from "../customer/pages/Profile/ProfileFieldCard";
import Navbar from "../customer/components/Navbar/Navbar";

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
        <Route path='/cart' element={<CartItemCard />} />
        <Route path='/checkout/address' element={<Checkout />} />
        <Route path='/account/*' element={<ProfileFieldCard />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default CustomerRoutes;
