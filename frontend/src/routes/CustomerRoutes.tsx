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
import { ComingSoon } from "../customer/components/CommingSoon";
import ProtectedRoute from "./ProtectedRoute";
import NotAuthorized from "../common/NotAuthorized";

const CustomerRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/unauthorized' element={<NotAuthorized />} />
        <Route
          path='/*'
          element={
            <ProtectedRoute requiredRole='ROLE_CUSTOMER'>
              <Routes>
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout/address' element={<Checkout />} />
                <Route path='/account/*' element={<Profile />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        <Route path='/products/:categoryId' element={<Products />} />
        <Route
          path='/product-details/:categoryId/:name/:productId'
          element={<ProductDetails />}
        />
        {/* Footer informational pages */}
        <Route path='/help' element={<ComingSoon />} />
        <Route path='/returns' element={<ComingSoon />} />
        <Route path='/contact' element={<ComingSoon />} />
        <Route path='/about' element={<ComingSoon />} />
        <Route path='/privacy' element={<ComingSoon />} />
        <Route path='/terms' element={<ComingSoon />} />
        <Route path='/cookies' element={<ComingSoon />} />
        <Route path='/size-guide' element={<ComingSoon />} />
        <Route path='/sustainability' element={<ComingSoon />} />
        <Route path='/affiliates' element={<ComingSoon />} />
        <Route path='/careers' element={<ComingSoon />} />
        <Route path='/press' element={<ComingSoon />} />
        <Route path='/new-arrivals' element={<ComingSoon />} />
        <Route path='/sale' element={<ComingSoon />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default CustomerRoutes;
