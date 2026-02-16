/** @format */

import { Button, ThemeProvider } from "@mui/material";
import { customTheme } from "./theme/customTheme";
import Home from "./customer/pages/Home/Home";
import Products from "./customer/pages/Products/Products";
import Footer from "./customer/Footer";
import ProductDetails from "./customer/pages/Products/ProductDetails/ProductDetails";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import Navbar from "./customer/components/Navbar/Navbar";
import Profile from "./customer/pages/Order/Profile";
import { Route, Routes } from "react-router";
import SellerDashboard from "./seller/SellerDashboard/SellerDashboard";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* <Navbar /> */}
      {/*  Seller Routes */}
      <Routes>
        <Route path='/seller/*' element={<SellerDashboard />} />
      </Routes>

      {/* <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:categoryId' element={<Products />} />
        <Route
          path='/product-details/:categoryId/:name/:productId'
          element={<ProductDetails />}
        />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout/address' element={<Checkout />} />
        <Route path='/account/*' element={<Profile />} />
      </Routes> */}
      <Footer />
    </ThemeProvider>
  );
}

export default App;
